import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "./../atoms/Button";
import { Screen } from "../atoms/Screen";
import { Navbar } from "../organisms/Navbar";
import { NavButton } from "../atoms/NavButton";
import { Event, Contact } from "./../res/dataModels";
import { storeUserEvent } from "./../res/storageFunctions";
import { MultiLineTextInput } from "./../atoms/MultiLineTextInput";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { TwoButtonAlert } from "./../atoms/TwoButtonAlert";
import { API, formSection } from "aws-amplify";
import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber";
import { Auth } from "aws-amplify";
import { DK_PURPLE } from "../res/styles/Colors";
import { FriendList } from "../molecules/FriendList";
import { Title } from "../atoms/Title";

interface Props {
  navigation: any;
  route: any
}

export default function SendMessage({ navigation, route }: Props) {
  const event: Event = route.params.data.eventData;
  const [message, setMessage] = useState<string>("Loading Message...");

  useEffect(() => {
    createInitialMessage();
  }, []);
  
  const getUserName = async () => {
    let userInfo = await Auth.currentUserInfo();
    return userInfo.attributes.name;
  }

  const createInitialMessage = async () => {
    let name = await getUserName();
    setMessage(
`Hey, ${name} is inviting you \
to "${event.title ? event.title : "[event title not specified]"}" \
at ${event.time ? event.time : "[time not specified]"} \
on ${event.date ? event.date : "[date not specified]"} \
at ${event.location ? event.location : "[location not specified]"}. \
${event.description} \
\nHope to see you there!`
    );
  }

  async function pushEvent(friends: Contact[], message: string): Promise<void> {
    const util = PhoneNumberUtil.getInstance();
    const attendees = friends.map((friend, index, array) => {
      // NOTE: it's a justifiable assumption that we're dealing with US numbers here
      const num = util.parseAndKeepRawInput(friend.phoneNumber, 'US');
      return util.format(num, PhoneNumberFormat.E164);
    });
  
    const obj = {attendees: attendees, content: message};
    console.log(await API.post('broadcastsApi', '/broadcasts', {body: obj}));
  }

  const createConfirmAlert = () => {
    getUserName();
    TwoButtonAlert({
      title: "Send and Create Event",
      message: "Are you sure you want to send this message to all invited friends and create this event?",
      button1Text: "Cancel",
      button2Text: "Send & Create",
      button2OnPress: onPressSend,
    });
  }
    
  const createErrorAlert = () => {
    TwoButtonAlert({
      title: "Notice",
      message: "At least one of the friends you invited does not have a phone number. That friend won't receive a text.",
      button1Text: "Go back",
      button2Text: "Create Event Anyways",
      button2OnPress: async () => {
        await storeUserEvent(event);
        navigation.navigate("Home", {data: {prevAction: "created event" + event.uuid}});
      },
    });
  }

  // FIXME: sane way of dealing with an exception in this function? in any function?
  const onPressSend = async () => {
    // console.log(message);
    try {
      let event: Event = route.params.data.eventData;
      await pushEvent(event.friends, message);
      await storeUserEvent(event);
      navigation.navigate("Home", {data: {prevAction: "created event" + event.uuid}});
    } catch (err) {
      console.log(err, event.friends);
      if (err.message === "The string supplied did not seem to be a phone number") {
        createErrorAlert();
      }
    }
  }

  return (
    <Screen>
      <Navbar>
        <NavButton
            onPress={() => navigation.navigate("SelectFriends")}
            title='Back'
          />
      </Navbar>
      <Title>Send Message</Title>
      <FriendList friends={event.friends}/>
      <View style={styles.message}>
        <MultiLineTextInput 
          inputText={message} 
          setText={setMessage} 
          placeholder={""}
          style={styles.text}
        />
      
      <Text style={{textAlign: "center"}}>Tap message to edit</Text>
      </View>

    <View style={styles.footer}>
      <Button
        title="Send & Create Event"
        onPress={createConfirmAlert}
      />
    </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  message: {
    flex: 4,
    // borderWidth: 1,
  },
  footer: {
    flex: 2
  },
  text: {
    backgroundColor: DK_PURPLE,
    fontWeight: "bold",
    color: "white",
  }
})