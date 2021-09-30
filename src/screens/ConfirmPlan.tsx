import React, { useEffect, useState } from 'react';
import { AppText, BottomButton, MeepForm, TwoButtonAlert, Navbar, MultiLineTextInput } from '../atoms/AtomsExports';
import { KeyboardAvoidingView, Platform, StyleSheet, View, FlatList } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { GREY_8, TEAL } from '../res/styles/Colors';
import { RoutePropParams } from '../res/root-navigation';
import { Contact } from 'expo-contacts';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import { API, Auth, DataStore } from 'aws-amplify';
import { formatDatabaseDate, formatDatabaseTime } from '../res/utilFunctions';
import { Plan, Status, Invitee, User } from '../models';
import { sendPushNotification } from '../res/notifications';

interface Props {
  navigation: {
    navigate: (ev: string, a?: { data?: { prevAction?: string } }) => void;
    push: (ev: string) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
  friend: Contact;
}

export const ConfirmPlan: React.FC<Props> = ({ navigation, route }: Props) => {
  const event = route.params.data.eventData;
  const currentUser: User = route.params.currentUser;
  const [name, setName] = useState<string>('');
  const [, setDate] = useState<string>('');
  const [, setTime] = useState<string>('');
  const [, setDescription] = useState<string>('');
  const [, setLocation] = useState<string>('');
  const [, setPhoto] = useState<string>('');
  const [, setDisabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [editMessage, setEditMessage] = useState<boolean | undefined>(false);
  const [, setIsLoading] = useState<boolean>(false);

  // Check if required fields are full
  useEffect(() => {
    checkDisabled();
  }, [name]);

  // Update location or photo
  useEffect(() => {
    if (route.params.data && route.params.data.eventData.location) {
      setLocation(route.params.data.eventData.location);
    }
    if (route.params.data && route.params.data.eventData.imageURL) {
      setPhoto(route.params.data.eventData.imageURL);
    }
  }, [route.params.data]);

  const checkDisabled = () => {
    if (name) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const inputFields: {
    title: string;
    placeholder: string;
    settings: string;
    value: string;
    func: React.Dispatch<React.SetStateAction<string>>;
    disabled: boolean;
  }[] = [
    {
      title: 'Plan Name *',
      placeholder: '',
      settings: 'default',
      value: event.title,
      func: setName,
      disabled: true,
    },
    {
      title: 'Date *',
      placeholder: 'MM/DD/YYYY',
      settings: 'default',
      value: event.date,
      func: setDate,
      disabled: true,
    },
    {
      title: 'Time *',
      placeholder: 'H:MM PM',
      settings: 'default',
      value: event.time,
      func: setTime,
      disabled: true,
    },
    {
      title: 'Description',
      placeholder: '',
      settings: 'default',
      value: event.description,
      func: setDescription,
      disabled: true,
    },
    {
      title: 'Address',
      placeholder: '',
      settings: 'default',
      value: event.location,
      func: setLocation,
      disabled: true,
    },
  ];
  const getUserName = async (): Promise<string> => {
    const userInfo = await Auth.currentUserInfo();
    return userInfo.attributes.name;
  };

  const onPressSend = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await storeInvitees();
      if (event.contacts.length > 0) {
        await pushEvent(event.contacts, message);
      }
      navigation.push('Home');
    } catch (err) {
      console.log(err);
      if (err.message === 'The string supplied did not seem to be a phone number') {
        createErrorAlert(event.contacts, message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const createConfirmAlert = (): void => {
    getUserName();
    TwoButtonAlert({
      title: 'Send and Create Plan',
      message: 'Are you sure you want to send this message to all invited friends and create this plan?',
      button1Text: 'Cancel',
      button2Text: 'Send & Create',
      button2OnPress: onPressSend,
    });
  };

  const createErrorAlert = (friends: Contact[], message: string): void => {
    TwoButtonAlert({
      title: 'Notice',
      message:
        'At least one of the friends you invited does not have a phone number. That friend will not receive a text.',
      button1Text: 'Go back',
      button2Text: 'Create Event Anyways',
      button2OnPress: async () => {
        navigation.push('Home');
        await pushEvent(friends, message);
      },
    });
  };

  const formatPhoneNumber = (friend: Contact) => {
    const util = PhoneNumberUtil.getInstance();
    const num = util.parseAndKeepRawInput(friend.phoneNumber, 'US');
    const newNumber = util.format(num, PhoneNumberFormat.E164);
    return newNumber;
  };

  const pushEvent = async (friends: Contact[], message: string): Promise<void> => {
    const util = PhoneNumberUtil.getInstance();
    const attendees = friends.map((friend) => {
      const num = util.parseAndKeepRawInput(friend.phoneNumber, 'US');
      return util.format(num, PhoneNumberFormat.E164);
    });
    const obj = { attendees: attendees, content: message };
    console.log(await API.post('broadcastsApi', '/broadcasts', { body: obj }));
  };

  const storeInvitees = async () => {
    const date = route.params.data.eventData.date;
    const time = route.params.data.eventData.time;
    const newPlan = await DataStore.save(
      new Plan({
        title: event.title,
        description: event.description,
        location: event.location,
        placeID: event.placeId,
        date: formatDatabaseDate(date),
        time: formatDatabaseTime(time),
        creatorID: route.params.currentUser.id,
      }),
    );

    const inviteeList: Invitee[] = [];
    for (const contact of event.contacts) {
      if (contact.phoneNumber !== 'No phone number found') {
        const invitee = await DataStore.save(
          new Invitee({
            name: contact.name,
            phoneNumber: formatPhoneNumber(contact),
            status: Status.PENDING,
            pushToken: '',
            plan: newPlan,
          }),
        );
        inviteeList.push(invitee);
      }
    }

    for (const friend of event.friends) {
      if (friend.phoneNumber !== 'No phone number found') {
        const invitee = await DataStore.save(
          new Invitee({
            name: friend.name,
            phoneNumber: friend.phoneNumber,
            status: Status.PENDING,
            pushToken: friend.pushToken,
            plan: newPlan,
          }),
        );
        inviteeList.push(invitee);
      }
    }

    const userInvitee = await DataStore.save(
      new Invitee({
        name: currentUser.name,
        phoneNumber: currentUser.phoneNumber,
        status: Status.ACCEPTED,
        pushToken: currentUser.pushToken,
        plan: newPlan,
      }),
    );
    inviteeList.push(userInvitee);

    //FIXME: plan invitee not being updated properly
    await DataStore.save(
      Plan.copyOf(newPlan, (item) => {
        item.invitees = inviteeList;
      }),
    );

    const name = await getUserName();
    for (const invitee of inviteeList) {
      if (invitee.pushToken) {
        sendPushNotification(invitee.pushToken, `You Have Been Invited by ${name}!!!`, 'Tap to open the app', {});
      }
    }

    console.log(newPlan);
  };

  interface renderContactProps {
    item: Contact;
  }
  const contactList = ({ item }: renderContactProps) => {
    return (
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <View style={styles.bubble}>
            <AppText style={{ fontSize: 20 }}>{item.name.slice(0, 1)}</AppText>
          </View>
          <View>
            <AppText style={styles.name}>{item.name}</AppText>
          </View>
        </View>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* <Screen> */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          flexDirection: 'column',
          paddingTop: Constants.statusBarHeight,
        }}
      >
        <Navbar location={'PlanCreate'} navigation={navigation} title={'Confirm'} />
        <AppText style={styles.titleText}>
          Almost done! Please confirm all details are correct, and that you’ve invited all you want. You can always come
          back and edit this event at a later time.
        </AppText>
        {/* <View>{loadPhoto(photo)}</View> */}
        <View style={{ flexGrow: 1 }}>
          <MeepForm inputList={inputFields}></MeepForm>
          <AppText style={styles.details}>Invitees</AppText>

          <View style={styles.contactsContainer}>
            <FlatList data={event.contacts} renderItem={contactList} />
          </View>

          <AppText style={styles.details}>Contacts invited, who will receive a text message:</AppText>
          <View style={styles.message}>
            <MultiLineTextInput enabled={editMessage} inputText={event.message} setText={setMessage} placeholder={''} />
          </View>
          <TouchableOpacity onPress={() => setEditMessage(!editMessage)}>
            <AppText style={styles.mapText}>Edit Note</AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.contactsContainer}>
          <FlatList data={event.contacts} renderItem={contactList} />
        </View>

        <BottomButton title="Confirm and Create Event" onPress={createConfirmAlert} />
      </ScrollView>
      {/* </Screen> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mapText: {
    color: TEAL,
    fontSize: 16,
    marginLeft: 10,
  },
  details: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    margin: 20,
  },
  titleText: {
    fontSize: 20,
    lineHeight: 23,
    textAlign: 'center',
    margin: 20,
  },
  contactsContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 15,
    marginLeft: 10,
    flexWrap: 'wrap',
    maxWidth: 220,
  },
  phone: {
    fontSize: 12,
    marginLeft: 10,
    color: GREY_8,
  },
  bubble: {
    width: 60,
    height: 60,
    backgroundColor: '#C4C4C4',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 50,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 15,
    borderColor: '#BE8C2C',
    margin: 15,
    maxHeight: '40%',
  },
});
