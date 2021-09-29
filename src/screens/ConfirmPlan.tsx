import React, { useState } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView, FlatList } from 'react-native';
import { Screen, Title, MeepForm, MultiLineTextInput, TwoButtonAlert } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { TEAL, GREY_8, WHITE } from '../res/styles/Colors';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { RoutePropParams } from '../res/root-navigation';
import { Event, Contact } from '../res/dataModels';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API, Auth, DataStore } from 'aws-amplify';
import { Plan, Status, Invitee, User } from '../models';
import { sendPushNotification } from '../res/notifications';
import { formatDatabaseDate, formatDatabaseTime } from '../res/utilFunctions';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import uuid from 'uuid';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [planTitle] = useState('');
  const [planAddress] = useState('');
  const [planDate] = useState('');
  const [planTime] = useState('');
  const [planDescription] = useState('');
  const [message, setMessage] = useState<string>('Loading Message...');
  const [editMessage, setEditMessage] = useState<boolean | undefined>(false);
  const [error, setError] = useState<string | undefined>();
  const [updatedValues, setUpdatedValues] = useState<{
    eventName: string | undefined;
    eventDate: string | undefined;
    eventTime: string | undefined;
    eventLocation: string | undefined;
    eventDescription: string | undefined;
  }>({
    eventName: planTitle,
    eventDate: planDate,
    eventTime: planTime,
    eventLocation: planAddress,
    eventDescription: planDescription,
  });
  const inputFields: {
    title: string;
    placeholder: string;
    settings?: string;
    value?: string;
  }[] = [
    {
      title: 'Place Name *',
      placeholder: 'name',
      settings: 'default',
      value: route.params.data ? route.params.data.eventData.title : '',
    },
    {
      title: 'Date *',
      placeholder: 'MM/DD/YYYY',
      settings: 'date',
      value: route.params.data ? route.params.data.eventData.date : '',
    },
    {
      title: 'Time *',
      placeholder: 'H:MM PM',
      settings: 'time',
      value: route.params.data ? route.params.data.eventData.time : '',
    },
    {
      title: 'Location',
      placeholder: 'address',
      settings: 'default',
      value: route.params.data ? route.params.data.eventData.location : '',
    },
    {
      title: 'Description *',
      placeholder: 'description',
      settings: 'default',
      value: route.params.data ? route.params.data.eventData.description : '',
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

  const setValues = (value: { title: string; value: string | undefined }[]) => {
    const values = {
      eventName: value[0].value,
      eventDate: value[1].value,
      eventTime: value[2].value,
      eventLocation: value[3].value,
      eventDescription: value[4].value,
    };
    if (!values.eventName) {
      setError('Please add a name to your plan');
      return;
    }
    if (!values.eventLocation) {
      setError('Please add a location to your plan');
      return;
    }
    if (!values.eventDescription) {
      setError('Please add a description to your plan');
      return;
    }
    route.params.data.eventData.title = values.eventName;
    route.params.data.eventData.description = values.eventDescription;
    route.params.data.eventData.location = values.eventLocation;
    route.params.data.eventData.date = values.eventDate;
    route.params.data.eventData.time = values.eventTime;
    setUpdatedValues(values);
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
      <View key={item.id} style={styles.nameContainer}>
        <View style={styles.bubble}>
          <Icon size={30} color={'white'} name="check" type="entypo" />
        </View>
        <AppText style={styles.name}>{item.name}</AppText>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Screen style={{ backgroundColor: WHITE }}>
        <View style={styles.navbar}>
          <AntDesign name="left" type="font-awesome" size={30} onPress={() => navigation.goBack()} />
          <Title>Confirm</Title>
          <AppText style={{ color: 'white' }}>blank</AppText>
        </View>
        <ScrollView>
          <View>
            <AppText style={styles.details}>
              Almost done! Please confirm all details are correct, and that you’ve invited all you want. You can always
              come back and edit this event at a later time.
            </AppText>
            <MeepForm InputList={inputFields} updatedValues={(value) => setValues(value)}></MeepForm>
            <AppText style={styles.details}>Invitees</AppText>
            <FlatList
              data={event.contacts}
              renderItem={contactList}
              ListEmptyComponent={() => (
                <View style={styles.title}>
                  <AppText>No Contacts Invited</AppText>
                </View>
              )}
              style={event.friends.length !== 0 ? { maxHeight: '20%' } : { maxHeight: '42%' }}
            />
            <AppText style={styles.details}>Contacts invited, who will receive a text message:</AppText>
            <View style={styles.message}>
              <MultiLineTextInput enabled={editMessage} inputText={message} setText={setMessage} placeholder={''} />
            </View>
            <TouchableOpacity onPress={() => setEditMessage(!editMessage)}>
              <AppText style={styles.details}>Edit Note</AppText>
            </TouchableOpacity>

            <FlatList
              data={event.contacts}
              renderItem={contactList}
              ListEmptyComponent={() => (
                <View style={styles.title}>
                  <AppText>No Contacts Invited</AppText>
                </View>
              )}
              style={event.friends.length !== 0 ? { maxHeight: '20%' } : { maxHeight: '42%' }}
            />
          </View>
        </ScrollView>
        <TouchableOpacity onPress={createConfirmAlert}>
          <AppText style={[styles.navText, { backgroundColor: TEAL, color: WHITE }]}>Confirm and Create Event</AppText>
        </TouchableOpacity>
      </Screen>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: '100%',
  },
  sphere: {
    backgroundColor: TEAL,
    width: 40,
    height: 40,
    borderRadius: 40,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: TEAL,
    flexWrap: 'wrap',
    maxWidth: 250,
    textAlign: 'right',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  hostName: {
    fontSize: 20,
    fontWeight: '400',
  },
  descTitle: {
    fontWeight: '400',
    fontSize: 12,
    color: GREY_8,
    marginVertical: 5,
  },
  hostContainer: {
    flex: 1,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  description: {
    flex: 1,
  },
  container: {
    flex: 5,
    marginHorizontal: 25,
    marginVertical: 20,
  },
  inviteeList: {
    flex: 1,
  },
  viewAll: {
    color: TEAL,
  },
  planResponse: {
    flexDirection: 'row',
    width: '50%',
    flex: 1,
    alignItems: 'flex-end',
  },
  initial: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  details: {
    fontSize: 16,
    marginLeft: 20,
  },
  bubble: {
    width: 60,
    height: 60,
    backgroundColor: '#31A59F',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 50,
  },
  name: {
    fontSize: 15,
    marginLeft: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
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
  navText: {
    fontSize: 24,
    padding: 10,
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',
    height: 75,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
});
