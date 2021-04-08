import React, { useState, useEffect } from "react";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { View, Text, Button, TouchableOpacity } from "react-native";
import CircularImageDisplay from "../atoms/CircularImageDisplay";
import { StyleSheet } from "react-native";
import {
  POST_SPACING,
  TEST_HIGH_CONTRAST,
  TEST_IMAGE_URL,
} from "../res/styles/Colors";
import CheckBox from "../atoms/CheckBox";
import SquareImageDisplay from "./../atoms/SquareImageDisplay";
import { template } from "@babel/core";

interface Props {
  uuid: string;
  title: string;
  showImage: boolean;
  imageURL: string;
  description: string;
  tags: string[];
  createdBy?: string;
  date: string;
  time: string;
  location: string;
  displayButton: boolean,
  navigation: any
  tagData: object
  friends: string[]
}

export default function EventTile({
  uuid,
  title,
  showImage = true,
  imageURL,
  tagData,
  description,
  tags,
  createdBy,
  date,
  time,
  location,
  displayButton,
  friends,
  navigation
}: Props) {


  return (
    <TouchableOpacity onPress={() => {
      console.log("pressed");
      navigation.navigate("EventDetails", {data: {eventUUID: uuid}});
      }}>
      <View style={styles.rootContainer}>
        <Text style={globalStyles.title}> {title} </Text>
        {showImage === true &&
        <View style={styles.rowConatiner}>
          <View style={styles.profileImageContainer}>
            <SquareImageDisplay imageURI={imageURL} />
          </View>
        </View>
        }
        <View style={globalStyles.miniSpacer} />
        <View style={styles.rowConatiner}>
          <View style={globalStyles.defaultColumnContainer}>
            <View>
              <Text><Text style={{fontWeight: "bold"}}>Description/Notes: </Text>{description}</Text>
              <View style={globalStyles.miniSpacer} />
              <Text><Text style={{fontWeight: "bold"}}>Date: </Text>{date}</Text>
              <Text><Text style={{fontWeight: "bold"}}>Time: </Text>{time}</Text>
              <Text><Text style={{fontWeight: "bold"}}>Location: </Text>{location}</Text>
              <View style={globalStyles.miniSpacer} />
              {friends != null && (<Text style={{fontWeight: "bold"}}>Invited Friends: </Text>)}
              <Text>{friends}</Text>
              {displayButton == true && (<Button title={"select"} onPress={()=>{navigation.navigate("SelectFriends", {data: {tagData: tagData, eventData: {
                title: title,
                imageURL: imageURL,
                description: description,
                tags: tags
              }}})}} />)}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

let styles = StyleSheet.create({
  rootContainer: {
    // height: 500,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
    // backgroundColor: "green",
    marginTop: POST_SPACING,
  },
  profileImageContainer: {
    height: 200,
    width: 300,
    alignSelf: "flex-start",
  },
  rowConatiner: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    // backgroundColor: TEST_HIGH_CONTRAST,
    margin: 15,
  },
});
