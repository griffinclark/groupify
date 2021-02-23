import React from "react";
import UserTile from "../molecules/UserTile";
import { SafeAreaView, Text, View } from "react-native";
import EventTile from "./../molecules/EventTile";
import { FlatList } from "react-native-gesture-handler";

interface Props {
  data: object[];
}

export default function HomescreenDisplay({ data }: Props){
    return(
        <View>
            <FlatList
            data={data}
            renderItem={({item}) => {
                if (item.type == "event") {
                    return(
                        <EventTile 
                        dateCreated={item.dateCreated}
                        UID = {item.UID}
                        title = {item.title}
                        endpointUID = {item.endpointUID}
                        creatorUID = {item.creatorUID}
                        startTime = {item.startTime}
                        />
                    )
                }
                else if (item.type == "user" ){
                    return (
                        <UserTile
                        username = {item.username}
                        imageURL = {item.profileImageURL}
                        createEvent = {true}
                        />
                    )
                }
            }}
            keyExtractor={(item)=> item.UID}
            />
        </View>
    )
}
