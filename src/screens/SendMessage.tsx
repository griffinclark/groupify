import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { Button } from "./../atoms/Button";
import { Screen } from "../atoms/Screen";
import { Title } from "../atoms/Title";
import Navbar from "../organisms/Navbar";
import { Event } from "./../res/dataModels";
import { storeUserEvent } from "./../res/storageFunctions";
import MultiLineTextInput from "./../atoms/MultiLineTextInput";
import { globalStyles } from "./../res/styles/GlobalStyles";


interface Props {
  navigation: any;
  route: any
}


export default function SendMessage({ navigation, route }: Props) {
  const event: Event = route.params.data.eventData;
  const initialMessage = 
`Hey, <user's name> is inviting you \
to "${event.title ? event.title : "[event title not specified]"}" \
at ${event.time ? event.time : "[time not specified]"} \
on ${event.date ? event.date : "[date not specified]"} \
at ${event.location ? event.location : "[location not specified]"}. \
Hope to see you there!`;
  const [message, setMessage] = useState<string>(initialMessage);

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
      <View style={globalStyles.spacer} />
      <View style={globalStyles.spacer} />

      <Text style={globalStyles.title}>Message:</Text>
      <MultiLineTextInput 
        inputText={message} 
        setText={setMessage} 
        placeholder={""}>
      </MultiLineTextInput>

      <View style={globalStyles.miniSpacer} />
      <View style={globalStyles.miniSpacer} />

      <Button
        title="Send & Create Event"
        onPress={onPressSend}
      />
    </Screen>
  );
}