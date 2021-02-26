import React from "react";
import UserTile from "../molecules/UserTile";
import { SafeAreaView, Text, View } from "react-native";
import EventTile from "../molecules/EventTile";
import { FlatList } from "react-native-gesture-handler";
import { Endpoint } from "./../res/dataModels";
import EndpointTile from "./../molecules/EndpointTile";

interface Props {
  data: object[];
}

export default function DataDisplay({ data }: Props) {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (item.type == "event") {
            return (
              <EventTile
                dateCreated={item.dateCreated}
                UID={item.UID}
                title={item.title}
                endpointUID={item.endpointUID}
                creatorUID={item.creatorUID}
                startTime={item.startTime}
                onPress={() => {
                  console.log("TODO write onPress function");
                }}
              />
            );
          } else if (item.type == "endpoint") {
            return (
              <EndpointTile
                title={item.title}
                endpointUID={item.endpointUID}
                UID={item.UID}
                onPress={() => {
                  console.log("TODO write onPress function");
                }}
              />
            );
          } else if (item.type == "user") {
            return (
              <UserTile
                username={item.username}
                imageURL={item.profileImageURL}
                createEvent={true}
              />
            );
          } else return <Text>Error tile type not defined properly</Text>;
        }}
        keyExtractor={(item) => item.UID}
      />
    </View>
  );
}
