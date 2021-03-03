import React, { useState } from "react";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { View, Text, Button } from "react-native";
import CircularImageDisplay from "../atoms/CircularImageDisplay";
import { StyleSheet } from "react-native";
import {
  POST_SPACING,
  TEST_HIGH_CONTRAST,
  TEST_IMAGE_URL,
} from "../res/styles/Colors";
import CheckBox from "../atoms/CheckBox";
import SquareImageDisplay from "./../atoms/SquareImageDisplay";

interface Props {
  title: string;
  imageURL: string;
  description: string;
  tags: string[];
  createdBy?: string;
  startTime?: string;
  displayButton: boolean,
  navigation: any
  tagData: object
}

export default function EventTile({
  title,
  imageURL,
  tagData,
  description,
  tags,
  createdBy,
  startTime,
  displayButton,
  navigation
}: Props) {
  return (
    <View style={styles.rootContainer}>
      <Text style={globalStyles.title}> {title} </Text>
      <View style={styles.rowConatiner}>
        <View style={styles.profileImageContainer}>
          <SquareImageDisplay imageURI={imageURL} />
        </View>
      </View>
      <View style={globalStyles.miniSpacer} />
      <View style={styles.rowConatiner}>
        <View style={globalStyles.defaultColumnContainer}>
          <View>
            <Text>{description}</Text>
            <View style={globalStyles.miniSpacer} />
            <Text>Created by: </Text>
            <Text>Start time:</Text>
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
  );
}

let styles = StyleSheet.create({
  rootContainer: {
    height: 500,
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
