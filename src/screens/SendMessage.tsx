/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { RoutePropParams } from '../res/root-navigation';
import { Event, Contact } from '../res/dataModels';
import { TEAL } from '../res/styles/Colors';
import { API, Auth, DataStore } from 'aws-amplify';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import { Screen, Button, TwoButtonAlert, MultiLineTextInput } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { Icon } from 'react-native-elements';
import { Plan, Status, Invitee, User } from '../models';
import { sendPushNotification } from '../res/notifications';
import { formatDatabaseDate, formatDatabaseTime } from '../res/utilFunctions';

interface Props {
  navigation: {
    navigate: (ev: string, a?: { data?: { prevAction?: string } }) => void;
    push: (ev: string) => void;
  };
  route: RoutePropParams;
}

export const SendMessage: React.FC<Props> = ({ navigation, route }: Props) => {
  const event: Event = route.params.data.eventData;
  const currentUser: User = route.params.currentUser;
  const [message, setMessage] = useState<string>('Loading Message...');
  const [editMessage, setEditMessage] = useState<boolean | undefined>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    createInitialMessage();
  }, []);

  const getUserName = async (): Promise<string> => {
    const userInfo = await Auth.currentUserInfo();
    return userInfo.attributes.name;
  };

  const createInitialMessage = async (): Promise<void> => {
    const name = await getUserName();
    setMessage(
      `Hey, ${name} is inviting you \
to '${event.title ? event.title : '[plan title not specified]'}' \
at ${event.time ? event.time : '[time not specified]'} \
on ${event.date ? event.date : '[date not specified]'} \
at ${event.location ? event.location : '[location not specified]'}. \
${event.description} \
\nHope to see you there! \
\nYou can download Groupify on the app store! \nhttps://cntr.click/14fV4hQ`,
    );
  };

  const formatPhoneNumber = (friend: Contact) => {
    const util = PhoneNumberUtil.getInstance();
    const num = util.parseAndKeepRawInput(friend.phoneNumber, 'US');
    const newNumber = util.format(num, PhoneNumberFormat.E164);
    return newNumber;
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

  const createErrorAlert = (): void => {
    TwoButtonAlert({
      title: 'Notice',
      message:
        'At least one of the friends you invited does not have a phone number. That friend will not receive a text.',
      button1Text: 'Go back',
      button2Text: 'Create Event Anyways',
      button2OnPress: onPressSend,
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

    //Decide whether or not an invitee is a user
    //if so send notification, if not send text
    const nonUsers = [];
    const pushNotificationRegex = /ExponentPushToken\[.{22}]/;
    for (let i = 0; i < inviteeList.length; i++) {
      const invitee = inviteeList[i];
      const user = await DataStore.query(User, (user) => user.phoneNumber('eq', invitee.phoneNumber));
      if (user.length > 0) {
        if(pushNotificationRegex.test(user[0].pushToken) && user[0].pushToken != currentUser.pushToken){
          console.log("This invitee gets a notificaiton: " + invitee.name);
          sendPushNotification(user[0].pushToken, `You Have Been Invited by ${name}!!!`, 'Tap to open the app', {});
        }
      } else {
        nonUsers.push(invitee);
      }
    }
    pushEvent(nonUsers, message);
    // for (const invitee of inviteeList) {
    //   if (invitee.pushToken) {
    //     sendPushNotification(invitee.pushToken, `You Have Been Invited by ${name}!!!`, 'Tap to open the app', {});
    //   }
    // }

    // console.log(newPlan);
  };

  const pushEvent = async (friends: Invitee[], message: string): Promise<void> => {
    const util = PhoneNumberUtil.getInstance();
    const attendees = friends.map((friend) => {
      const num = util.parseAndKeepRawInput(friend.phoneNumber, 'US');
      return util.format(num, PhoneNumberFormat.E164);
    });
    const obj = { attendees: attendees, content: message };
    console.log(await API.post('broadcastsApi', '/broadcasts', { body: obj }));
  };

  const onPressSend = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await storeInvitees();
      if (event.contacts.length > 0) {
        // await pushEvent(event.contacts, message);
      }
      navigation.push('Home');
    } catch (err) {
      console.log(err);
      if (err.message === 'The string supplied did not seem to be a phone number') {
        createErrorAlert();
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
      <View key={item.id} style={styles.nameContainer}>
        <View style={styles.bubble}>
          <Icon size={30} color={'white'} name="check" type="entypo" />
        </View>
        <AppText style={styles.name}>{item.name}</AppText>
      </View>
    );
  };

  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignSelf: 'flex-start', top: 10 }}>
        <Icon
          name="arrow-left"
          type="font-awesome"
          size={35}
          onPress={() => navigation.navigate('SelectFriends', {})}
          style={styles.back}
        />
      </View>
      {event.contacts.length == 0 && event.friends.length > 0 && (
        <ImageBackground
          imageStyle={{ borderRadius: 15 }}
          source={{ uri: event.imageURL }}
          style={styles.backgroundImage}
        >
          <View style={styles.overlay} />
          <AppText style={styles.titleText}>Plan Details...</AppText>
          <View style={styles.body}>
            <View style={styles.eventInfo}>
              <AppText style={styles.planInfo}>{event.title}</AppText>
              <AppText style={styles.planInfo}>{event.date}</AppText>
              <AppText style={styles.planInfo}>{event.time}</AppText>
              <AppText numberOfLines={1} style={styles.planInfo}>
                {event.location}
              </AppText>
            </View>
          </View>
        </ImageBackground>
      )}
      {event.contacts.length > 0 && (
        <>
          <AppText style={styles.text}>Message to friends</AppText>
          <View style={styles.message}>
            <MultiLineTextInput enabled={editMessage} inputText={message} setText={setMessage} placeholder={''} />
          </View>
          <Button title="Edit Note" onPress={() => setEditMessage(!editMessage)} />
          <AppText style={styles.text}>Sending text message to...</AppText>
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
        </>
      )}
      {event.friends.length > 0 && (
        <View style={{ flex: 1 }}>
          <AppText style={styles.text}>Inviting friends to plan...</AppText>
          <FlatList
            data={event.friends}
            renderItem={contactList}
            ListEmptyComponent={() => (
              <View style={styles.title}>
                <AppText>No Friends Invited</AppText>
              </View>
            )}
            style={{ maxHeight: '60%' }}
          />
        </View>
      )}
      <View style={styles.footer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={TEAL} />
        ) : (
          <Button title="Create Plan" onPress={createConfirmAlert} />
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  message: {
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 15,
    borderColor: '#BE8C2C',
    margin: 15,
    maxHeight: '40%',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  text: {
    color: 'black',
    margin: 15,
    fontSize: 24,
    fontWeight: '700',
  },
  back: {
    marginHorizontal: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
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
  friendListContainer: {
    flex: 1,
  },
  title: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  backgroundImage: {
    flex: 1,
    borderRadius: 15,
    marginHorizontal: 15,
    top: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.25,
    borderRadius: 15,
  },
  titleText: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginTop: 30,
  },
  eventInfo: {
    backgroundColor: '#D9B139',
    padding: 20,
    borderRadius: 15,
  },
  planInfo: {
    fontSize: 20,
    margin: 5,
    fontWeight: '700',
  },
  body: {
    flex: 1,
    margin: 30,
    justifyContent: 'center',
  },
});
