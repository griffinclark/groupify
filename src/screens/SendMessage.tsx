import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { RoutePropParams } from '../res/root-navigation';
import { Event, Contact } from '../res/dataModels';
import { API, Auth, DataStore } from 'aws-amplify';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import { Screen, Button, TwoButtonAlert, MultiLineTextInput } from '../atoms/AtomsExports';
import { Icon } from 'react-native-elements';
import { Plan, Status } from '../models';
import uuid from 'uuid';

interface Props {
  navigation: {
    navigate: (ev: string, a?: { data?: { prevAction?: string } }) => void;
  };
  route: RoutePropParams;
}

export const SendMessage: React.FC<Props> = ({ navigation, route }: Props) => {
  const event: Event = route.params.data.eventData;
  const [message, setMessage] = useState<string>('Loading Message...');
  const [editMessage, setEditMessage] = useState<boolean | undefined>(false);

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
to '${event.title ? event.title : '[event title not specified]'}' \
at ${event.time ? event.time : '[time not specified]'} \
on ${event.date ? event.date : '[date not specified]'} \
at ${event.location ? event.location : '[location not specified]'}. \
${event.description} \
\nHope to see you there!`,
    );
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
      title: 'Send and Create Event',
      message: 'Are you sure you want to send this message to all invited friends and create this event?',
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
        navigation.navigate('Home', { data: { prevAction: 'created event' + event.uuid } });
        await pushEvent(friends, message);
      },
    });
  };

  const onPressSend = async (): Promise<void> => {
    try {
      const event: Event = route.params.data.eventData;
      await pushEvent(event.friends, message);
      navigation.navigate('Home', { data: { prevAction: 'created event' + event.uuid } });
    } catch (err) {
      console.log(err, event.friends);
      if (err.message === 'The string supplied did not seem to be a phone number') {
        createErrorAlert(event.friends, message);
      }
    }
    const inviteeList = [];
    for (let i = 0; i < event.friends.length; i++) {
      const friend = event.friends[i];
      inviteeList.push({
        id: uuid.v4(),
        name: friend.name,
        phoneNumber: friend.phoneNumber,
        status: Status.PENDING,
        pushToken: '',
        planID: event.uuid,
      });
    }
    console.log(inviteeList);
    const fullDate = route.params.data.eventData.fullDate;
    const date = fullDate.toISOString().substring(0, 10);
    const time = fullDate.toTimeString().substring(0, 8);
    await DataStore.save(
      new Plan({
        title: event.title,
        description: event.description,
        location: event.location,
        placeID: event.placeId,
        time: time,
        date: date,
        creatorID: route.params.currentUser.id,
        invitees: inviteeList,
      }),
    );
  };

  interface renderContactProps {
    item: Contact;
  }

  const friendList = ({ item }: renderContactProps) => {
    return (
      <View key={item.id} style={styles.nameContainer}>
        <View style={styles.bubble}>
          <Icon size={30} color={'white'} name="check" type="entypo" />
        </View>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    );
  };

  return (
    <Screen>
      <Icon
        name="arrow-left"
        type="font-awesome"
        size={35}
        onPress={() => navigation.navigate('SelectFriends', {})}
        style={styles.back}
      />
      <View style={styles.message}>
        <MultiLineTextInput enabled={editMessage} inputText={message} setText={setMessage} placeholder={''} />
      </View>
      <Button title="Edit Note" onPress={() => setEditMessage(!editMessage)} />
      <Text style={styles.text}>Sending text message to...</Text>
      <FlatList
        data={event.friends}
        renderItem={friendList}
        ListEmptyComponent={() => (
          <View style={styles.title}>
            <Text>No Friends Invited</Text>
          </View>
        )}
        style={{ maxHeight: '52%' }}
      />
      <View style={styles.footer}>
        <Button title="Confirm" onPress={createConfirmAlert} />
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
    margin: 20,
    alignSelf: 'flex-start',
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
});
