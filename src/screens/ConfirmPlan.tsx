import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView, FlatList } from 'react-native';
import { MeepForm, TwoButtonAlert, Navbar, BottomButton } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { TEAL, GREY_8 } from '../res/styles/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { RoutePropParams } from '../res/root-navigation';
import { Event, Contact } from '../res/dataModels';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API, Auth, DataStore } from 'aws-amplify';
import { Plan, Status, Invitee, User } from '../models';
import { sendPushNotification } from '../res/notifications';
import { formatDatabaseDate, formatDatabaseTime } from '../res/utilFunctions';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import Constants from 'expo-constants';
import { PlanTextMessage } from '../molecules/PlanTextMessage';

interface Props {
  navigation: {
    navigate: (ev: string, a?: { data?: { prevAction?: string } }) => void;
    push: (ev: string) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
}

export const ConfirmPlan: React.FC<Props> = ({ navigation, route }: Props) => {
  const event: Event = route.params.data.eventData;
  const currentUser: User = route.params.currentUser;
  const [, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('Loading Message...');
  const [editMessage, setEditMessage] = useState<boolean | undefined>(false);
  const [, setName] = useState<string>('');
  const [, setDate] = useState<string>('');
  const [, setTime] = useState<string>('');
  const [, setDescription] = useState<string>('');
  const [, setLocation] = useState<string>('');
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
      value: route.params.data ? route.params.data.eventData.title : '',
      func: setName,
      disabled: true,
    },
    {
      title: 'Date *',
      placeholder: 'MM/DD/YYYY',
      settings: 'default',
      value: route.params.data ? route.params.data.eventData.date : '',
      func: setDate,
      disabled: true,
    },
    {
      title: 'Time *',
      placeholder: 'H:MM PM',
      settings: 'default',
      value: route.params.data ? route.params.data.eventData.time : '',
      func: setTime,
      disabled: true,
    },
    {
      title: 'Description',
      placeholder: '',
      settings: 'default',
      value: route.params.data ? route.params.data.eventData.description : '',
      func: setDescription,
      disabled: true,
    },
    {
      title: 'Address',
      placeholder: '',
      settings: 'default',
      value: route.params.data ? route.params.data.eventData.location : '',
      func: setLocation,
      disabled: true,
    },
  ];

  useEffect(() => {
    createInitialMessage();
  }, []);
  const createInitialMessage = async (): Promise<void> => {
    const event = route.params.data.eventData;
    const initMessage = event.message;
    setMessage(initMessage);
  };

  const getUserName = async (): Promise<string> => {
    const userInfo = await Auth.currentUserInfo();
    return userInfo.attributes.name;
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

  const onPressSend = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await storeInvitees();
      if (event.contacts.length > 0) {
        await pushEvent(event.contacts, message);
      }
      navigation.push('Home');
    } catch (err: any) {
      console.log(err);
      if (err.message === 'The string supplied did not seem to be a phone number') {
        createErrorAlert(event.contacts, message);
      }
    } finally {
      setIsLoading(false);
    }
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
    <View style={{ flex: 1 }}>
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
          <Navbar location={'PlanInvite'} navigation={navigation} title={'Confirm'} />
          <AppText style={styles.titleText}>
            Almost done! Please confirm all details are correct, and that you’ve invited all you want. You can always
            come back and edit this event at a later time.
          </AppText>
          {/* <View>{loadPhoto(photo)}</View> */}
          <View style={{ flexGrow: 1 }}>
            <MeepForm inputList={inputFields}></MeepForm>
            <PlanTextMessage
              label="Contacts invited, who will receive a text message:"
              onChangeText={(e) => setMessage(e)}
              text={message}
            />
            <TouchableOpacity onPress={() => setEditMessage(!editMessage)}>
              <AppText style={styles.mapText}>Edit Note</AppText>
            </TouchableOpacity>
          </View>
          {event.contacts.length > 0 && (
            <View style={{ minHeight: 200 }}>
              <FlatList
                data={event.contacts}
                renderItem={contactList}
                ListEmptyComponent={() => (
                  <View style={styles.titleText}>
                    <AppText>No Contacts Invited</AppText>
                  </View>
                )}
                style={event.friends.length !== 0 ? { maxHeight: '20%' } : { maxHeight: '42%' }}
              />
            </View>
          )}
        </ScrollView>
        {/* </Screen> */}
      </KeyboardAvoidingView>
      <BottomButton title="Confirm and Create Event" onPress={createConfirmAlert} />
    </View>
  );
};

const styles = StyleSheet.create({
  mapText: {
    color: TEAL,
    fontSize: 16,
    margin: 20,
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
