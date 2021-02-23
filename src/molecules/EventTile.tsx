import React, { useState } from "react";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { View, Text, Button } from "react-native";
import CircularImageDisplay from "../atoms/CircularImageDisplay";
import { StyleSheet } from "react-native";
import { POST_SPACING, TEST_HIGH_CONTRAST, TEST_IMAGE_URL } from "../res/styles/Colors";
import CheckBox from "../atoms/CheckBox";
import SquareImageDisplay from "./../atoms/SquareImageDisplay";

interface Props {
  dateCreated: string;
  UID: string;
  title: string;
  endpointUID: string;
  creatorUID: string;
  startTime: string;
}
export default function EventTile({
  dateCreated,
  UID,
  title,
  endpointUID,
  creatorUID,
  startTime,
}: Props) {
  console.log(startTime)
  return (
    <View style={styles.rootContainer}>
      <View style={styles.rowConatiner}>
        <View style={styles.profileImageContainer}>
          <SquareImageDisplay imageURI={TEST_IMAGE_URL} />
        </View>
      </View>
      <View style={globalStyles.miniSpacer} />
      <View style={styles.rowConatiner}>
        <View style={globalStyles.defaultColumnContainer}>
        <Text style={globalStyles.title}> {title} </Text>
          <Text>Creator /*TODO get name by ID*/: {creatorUID}</Text>
          <Text>Start time: {startTime.Bf}</Text>
          <View style={globalStyles.miniSpacer} />
          <Button title={"Event Details"}></Button>

        </View>

      </View>

    </View>
  );
}

let styles = StyleSheet.create({
  rootContainer: {
    height: 400,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
    backgroundColor: "green",
    marginTop: POST_SPACING

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
