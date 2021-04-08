import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import EventTile from "./../molecules/EventTile";
import { Event } from "./../res/dataModels";
// import { getUserEventFromUUID } from "./../res/storageFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalStyles } from "./../res/styles/GlobalStyles";


interface Props {
  navigation: any;
  route: any;
}

// Adds a newline at the end of each friend in the array
const formatFriends = (friends) => {
  if (friends !== undefined) {
    return friends.map(friend => friend + "\n");
  }
}

export default function EventDetails({ navigation, route }: Props) {
  const [event, setEvent] = useState<Event>();

  useEffect(() => {
    // console.log(route.params.data.eventUUID);
    getUserEventFromUUID(route.params.data.eventUUID);
  }, [route.params.data.eventUUID])

  const getUserEventFromUUID = async (uuid: string) => {
    try {
      console.log(uuid);
      let userEventsString = await AsyncStorage.getItem("user_events");
      let userEvents: Event[] = userEventsString !== null ? JSON.parse(userEventsString) : [];
      for (let e of userEvents) {
        if (e.uuid === uuid) {
          setEvent(e);
          return;
        }
      }
      console.log("there is no event with this uuid");
    }
    catch (e) {
      console.log("Error getting an event");
    }
  }

  return (
    <SafeAreaView>
      <View style={globalStyles.spacer} />
      {console.log(event)}
      {event ? (
      <EventTile
        uuid ={event.uuid}
        title={event.title}
        showImage={event.showImage}
        imageURL={event.imageURL}
        description={event.description}
        tags={event.tags}
        friends={formatFriends(event.friends)}
        displayButton={false}
        navigation={navigation}
        date={event.date}
        time={event.time}
        location={event.location}
      />) : (<Text>Loading</Text>)
    }
    </SafeAreaView>
    
  );
}