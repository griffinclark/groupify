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
  UID: string;
  title: string;
  endpointUID: string;
  onPress: any;
}
export default function EndpointTile({
  UID,
  title,
  endpointUID,
  onPress: pressFunction,
}: Props) {
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
          <View style={globalStyles.miniSpacer} />

          <Text style={globalStyles.title}> {title} </Text>
          <Button
            title={"Create This Event"}
            onPress={() => {
              pressFunction({ endpointUID });
            }}
          ></Button>
        </View>
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  rootContainer: {
    height: 350,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
    // backgroundColor: "green",
    marginTop: 5,
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
