import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {EventTile} from "./../molecules/MoleculesExports";
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

export function DataDisplay({ data, navigation, displayButton }: Props) {
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
