import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button } from "./../atoms/Button";
import { Screen } from "../atoms/Screen";
import Navbar from "../organisms/Navbar";
import { Event } from "./../res/dataModels";
import { storeUserEvent } from "./../res/storageFunctions";
import MultiLineTextInput from "./../atoms/MultiLineTextInput";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { TwoButtonAlert } from "./../atoms/TwoButtonAlert";


interface Props {
  navigation: any;
  route: any
}


export default function SendMessage({ navigation, route }: Props) {
  const event: Event = route.params.data.eventData;
  const initialMessage = 
`Hey, <user> is inviting you \
to "${event.title ? event.title : "[event title not specified]"}" \
at ${event.time ? event.time : "[time not specified]"} \
on ${event.date ? event.date : "[date not specified]"} \
at ${event.location ? event.location : "[location not specified]"}. \
${event.description} \
\nHope to see you there!`;
  const [message, setMessage] = useState<string>(initialMessage);

  const createTwoButtonAlert = () =>
    TwoButtonAlert({
      title: "Send and Create Event",
      message: "Are you sure you want to send this message to all invited friends and create this event?",
      button1Text: "Cancel",
      button2Text: "Send & Create",
      button2OnPress: onPressSend,
    })

  const onPressSend = async () => {
    // console.log(message);
    let event: Event = route.params.data.eventData;
    await storeUserEvent(event);
    navigation.navigate("Home", {data: {prevAction: "created event" + event.uuid}});
  }

  return (
    <Screen>
      <Navbar navigation={navigation} />

      <Text style={globalStyles.superTitle}>Send Message</Text>
      <View style={{height: 150}} />

      <Text style={globalStyles.title}>Message:</Text>
      
      <MultiLineTextInput 
        inputText={message} 
        setText={setMessage} 
        placeholder={""}>
      </MultiLineTextInput>
      <Text>Tap message to edit</Text>

      <View style={globalStyles.miniSpacer} />

      <Button
        title="Send & Create Event"
        onPress={createTwoButtonAlert}
      />
    </Screen>
  );
}