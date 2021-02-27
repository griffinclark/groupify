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
  // @Griffin: you'll get a cloud function to retrieve an endpoint by UID, and one to retrieve a user by UID
  const getImage = (endpointUID: string) => {
    // TODO @David return the image for an endpoint given its UID
    return TEST_IMAGE_URL;
  };

  const getName = (UID: string) => {
    // TODO @David return a user's name given their UID
    return "David help!!!";
  };

  return (
    <View style={styles.rootContainer}>
      {/* <Text>Tile rendered</Text> */}
      <View style={styles.rowConatiner}>
        <View style={styles.profileImageContainer}>
          <SquareImageDisplay imageURI={getImage(endpointUID)} />
        </View>
      </View>
      <View style={globalStyles.miniSpacer} />
      <View style={styles.rowConatiner}>
        <View style={globalStyles.defaultColumnContainer}>
          <Text style={globalStyles.title}> {title} </Text>
          <View>
            <Text>
              Creator /*TODO @David get name by ID*/: {getName(creatorUID)}
            </Text>
            <Text>Start time: {"@David display start time"}</Text>
            {/* TODO @David can't get a server timestamp from Firebase (Event start time) */}
            <View style={globalStyles.miniSpacer} />
          </View>

          <Button
            title={"More Details"}
            onPress={() => {
              // TODO @Griffin replace this with a navigation to endpoint display
          
              console.log("@Griffin fix")
            }}
          ></Button>
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
