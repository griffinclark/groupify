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
}

export default function DataDisplay({ data, navigation, onSelect, displayButton }: Props) {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <EventTile
              title={item.title}
              imageURL={item.imageURL}
              description={item.description}
              tags={item.tags}
              onSelect={() => {
                onSelect();
              }}
              displayButton={displayButton}
              navigation={navigation}
            />
          );
        }}
        keyExtractor={(item) => item.title}

      />
    </View>
  );
}
