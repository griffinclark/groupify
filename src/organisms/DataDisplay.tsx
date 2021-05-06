import React from "react";
import UserTile from "../molecules/UserTile";
import { SafeAreaView, Text, View } from "react-native";
import EventTile from "../molecules/EventTile";
import { FlatList } from "react-native-gesture-handler";
import { Endpoint } from "./../res/dataModels";
import EndpointTile from "./../molecules/EndpointTile";
import { Contact, Event } from "./../res/dataModels";

interface Props {
  data: Event[];
  navigation: any;
  onSelect?: any;
  displayButton: boolean
  selectedTags?: object
}

// Adds a newline at the end of each friend in the array
const formatFriends = (friends: Contact[]) => {
  if (friends !== undefined) {
    return friends.map(friend => friend + "\n");
  }
}

export default function DataDisplay({ data, navigation, displayButton }: Props) {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <EventTile
              event={item}
              displayButton={displayButton}
              navigation={navigation}
            />
          );
        }}
        keyExtractor={(item) => item.uuid}

      />
    </View>
  );
}
