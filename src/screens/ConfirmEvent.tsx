import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import EventTile from "../molecules/EventTile";
import { Event } from "../res/dataModels";
import { globalStyles } from "./../res/styles/GlobalStyles";

interface Props {
  navigation: any;
  eventUID: string;
}

export default function ConfirmEvent({ navigation, eventUID }: Props) {
  const [event, setEvent] = useState<Event>(); 
  const [date, setDate] = useState();

  useEffect(() => {
    // TODO @David pull the newly created event based on eventUID
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Text style={globalStyles.title}>Confirm Plans</Text>
      </View>
      <ScrollView>
        <EventTile 
        dateCreated={"todo"}
        UID={"event.uid"}
        title={"test event"}
        endpointUID={"nope"}
        creatorUID={"my UID"}
        startTime={"now"}
        />
        {/* // TODO @Griffin build a horizontal friends display */}
        <Button
          title={"Change friends"}
          onPress={() => {
              navigation.navigate("ChangeInvitedFriends", {eventUID: "event.uid"})
          }}
        />
        <Button
          title={"Confirm & Send"}
          onPress={() => {
            console.log("TODO update event then send event");
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

let styles = StyleSheet.create({
  titleContainer: {
    marginTop: 50,
    alignSelf: "center",
  },
});
