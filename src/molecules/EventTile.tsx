import React, { useState, useEffect } from "react";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { View, Text, Button, TouchableOpacity } from "react-native";
import CircularImageDisplay from "../atoms/CircularImageDisplay";
import { StyleSheet } from "react-native";
import {
  DK_PURPLE,
  GREY_3,
  GREY_5,
  POST_SPACING,
  TEST_HIGH_CONTRAST,
  TEST_IMAGE_URL,
  WHITE,
} from "../res/styles/Colors";
import CheckBox from "../atoms/CheckBox";
import SquareImageDisplay from "./../atoms/SquareImageDisplay";
import { template } from "@babel/core";
import { Contact, Event } from "./../res/dataModels";
// import { styles } from "../atoms/Screen";
import { Title } from "../atoms/Title";
import { FriendList } from "../organisms/FriendList";


interface EventTileProps {
  event: Event,
  displayButton: boolean,
  navigation: any
}

export default function EventTile({
  event,
  displayButton,
  navigation
}: EventTileProps) {

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>{event.title}</Text>
      <Text>{event.description}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
        <Text style={styles.label}>When</Text>
        <Text>{event.date}</Text>
        <Text>{event.time}</Text>
        </View>
        <View style={styles.infoItem}>
        <Text style={styles.label}>Where</Text>
        <Text>{event.location}</Text>
        </View>
      </View>
      <FriendList title="Invited Friends" friends={event.friends}/>
    </View>
  );
}

let styles = StyleSheet.create({
  rootContainer: {
    // height: 500,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GREY_5,
    borderRadius: 10,
    marginTop: POST_SPACING,
    marginHorizontal: POST_SPACING,
    padding: 15,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  infoItem: {
    margin: 5
  },
  title: {
    fontSize: 25,
    color: DK_PURPLE,
    fontWeight: 'bold',
    marginVertical: 10
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 3,
    fontSize: 16,
    color: DK_PURPLE,
  },
});
