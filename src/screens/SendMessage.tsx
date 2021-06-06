import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackParamList, RoutePropParams } from '../res/root-navigation';
import { Event, Friend } from '../res/dataModels';
import { storeUserEvent } from '../res/storageFunctions';
import { API } from 'aws-amplify';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import { Auth } from 'aws-amplify';
import { DK_PURPLE } from '../res/styles/Colors';
import { Navbar } from '../molecules/MoleculesExports';
import { FriendList } from '../organisms/OrganismsExports';
import { Title, NavButton, Screen, Button, TwoButtonAlert, MultiLineTextInput } from '../atoms/AtomsExports';

interface Props {
  navigation: RootStackParamList;
  route: RoutePropParams;
}

export const SendMessage: React.FC<Props> = ({ navigation, route }: Props) => {
  const event: Event = route.params.data.eventData;
  const [message, setMessage] = useState<string>('Loading Message...');

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

  const pushEvent = async (friends: Friend[], message: string): Promise<void> => {
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

  const createErrorAlert = (): void => {
    TwoButtonAlert({
      title: 'Notice',
      message:
        'At least one of the friends you invited does not have a phone number. That friend will not receive a text.',
      button1Text: 'Go back',
      button2Text: 'Create Event Anyways',
      button2OnPress: async () => {
        await storeUserEvent(event);
        navigation.navigate('Home', { data: { prevAction: 'created event' + event.uuid } });
      },
    });
  };

  const onPressSend = async (): Promise<void> => {
    try {
      const event: Event = route.params.data.eventData;
      await pushEvent(event.friends, message);
      await storeUserEvent(event);
      navigation.navigate('Home', { data: { prevAction: 'created event' + event.uuid } });
    } catch (err) {
      console.log(err, event.friends);
      if (err.message === 'The string supplied did not seem to be a phone number') {
        createErrorAlert();
      }
    }
  };

  return (
    <Screen>
      <Navbar>
        <NavButton onPress={() => navigation.navigate('SelectFriends')} title="Back" />
      </Navbar>
      <Title>Send Message</Title>
      <FriendList friends={event.friends} />
      <View style={styles.message}>
        <MultiLineTextInput inputText={message} setText={setMessage} placeholder={''} />
        <Text style={{ textAlign: 'center' }}>Tap message to edit</Text>
      </View>
      <View style={styles.footer}>
        <Button title="Send & Create Event" onPress={createConfirmAlert} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  message: {
    flex: 4,
  },
  footer: {
    flex: 2,
  },
  text: {
    backgroundColor: DK_PURPLE,
    fontWeight: 'bold',
    color: 'white',
  },
});
