import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { TEST_HIGH_CONTRAST } from "./../res/styles/Colors";
import { firestore } from "../res/services/firebase";
import firebase from "firebase";

interface Props {
  navigation: any;
}

export default function Home({ navigation }: Props) {
  const [feedData, setFeedData] = useState([]);


  // Used to grab dummy data from FB
  let testFeedData = []
  useEffect(() => {
    // Grab all of the users that our logged in user is friends with, and all of the posts sent to the user
    let testEvent = {
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(), // TODO not 100% sure this works
      version: 0,
      UID: "1",
      title: "Climbing (ofc)",
      endpointUID: "no endpoint UID",
      creatorUID: "no creator UID",
      startTime: firebase.firestore.FieldValue.serverTimestamp(), // startTime == dateCreated for testing
    };

    let testUser = {
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(), // TODO not 100% sure this works
      version: 0,
      UID: "1",
      activated: true,
      email: "gclark@munchkinlabs.us",
      phoneNumber: "7608893464",
      firstName: "Griffin",
      lastName: "Clark",
      username: "gclark00",
      profileImageURL:
        "https://ih1.redbubble.net/image.775821485.6679/mwo,x1000,ipad_2_snap-pad,750x1000,f8f8f8.u3.jpg",
    };

    testFeedData = [testEvent, testUser];
  });

  return (
    <SafeAreaView>
      <View style={styles.navbarContainer}>
        <Text>Navbar!</Text>
      </View>
      <View style={styles.feedContainer}></View>
    </SafeAreaView>
  );
}

let styles = StyleSheet.create({
  navbarContainer: {
    height: 100,
    backgroundColor: TEST_HIGH_CONTRAST,
  },

  feedContainer: {
    height: 500,
    backgroundColor: "#555",
  },
});
