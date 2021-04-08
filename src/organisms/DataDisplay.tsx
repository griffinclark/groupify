import React from "react";
import UserTile from "../molecules/UserTile";
import { SafeAreaView, Text, View } from "react-native";
import EventTile from "../molecules/EventTile";
import { FlatList } from "react-native-gesture-handler";
import { Endpoint } from "./../res/dataModels";
import EndpointTile from "./../molecules/EndpointTile";

interface Props {
  data: object[];
  navigation: any;
  onSelect?: any;
  displayButton: boolean
  selectedTags?: object
}

// Adds a newline at the end of each friend in the array
const formatFriends = (friends) => {
  if (friends !== undefined) {
    return friends.map(friend => friend + "\n");
  }
}

export default function DataDisplay({ data, navigation, selectedTags, onSelect, displayButton }: Props) {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <EventTile
              uuid ={item.uuid}
              title={item.title}
              showImage={item.showImage}
              imageURL={item.imageURL}
              description={item.description}
              tagData={selectedTags}
              tags={item.tags}
              friends={formatFriends(item.friends)}
              displayButton={displayButton}
              navigation={navigation}
              date={item.date}
              time={item.time}
              location={item.location}
            />
          );
        }}
        keyExtractor={(item) => item.uuid}

      />
    </View>
  );
}
