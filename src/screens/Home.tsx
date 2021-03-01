import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { TEST_HIGH_CONTRAST } from "../res/styles/Colors";
import { firestore } from "../res/services/firebase";
import firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";
import DataDisplay from "../organisms/DataDisplay";
import Navbar from "../organisms/Navbar";
import { cannedEvents } from "../res/cannedData";

interface Props {
  navigation: any;
}

export default function Home({ navigation }: Props) {
  const [feedData, setFeedData] = useState([]);
  const [testData, setTestData] = useState([{}]);

  // Used to grab dummy data from FB
  useEffect(() => {
    // // Grab all of the users that our logged in user is friends with, and all of the posts sent to the user
    // let testEvent = {
    //   dateCreated: firebase.firestore.FieldValue.serverTimestamp(), // TODO not 100% sure this works
    //   version: 0,
    //   UID: "1",
    //   title: "Climbing (ofc)",
    //   endpointUID: "no endpoint UID",
    //   creatorUID: "no creator UID",
    //   type: "event", // TODO there should be a better way to figure out what type something is, but I don't know it off the top of my head
    //   startTime: firebase.firestore.FieldValue.serverTimestamp(), // startTime == dateCreated for testing
    // };

    // let testEvent2 = {
    //   dateCreated: firebase.firestore.FieldValue.serverTimestamp(), // TODO not 100% sure this works
    //   version: 0,
    //   UID: "2",
    //   title: "Climbing (ofc)",
    //   endpointUID: "no endpoint UID",
    //   creatorUID: "no creator UID",
    //   type: "event", // TODO there should be a better way to figure out what type something is, but I don't know it off the top of my head
    //   startTime: firebase.firestore.FieldValue.serverTimestamp(), // startTime == dateCreated for testing
    // };

    // let testUser = {
    //   dateCreated: firebase.firestore.FieldValue.serverTimestamp(), // TODO not 100% sure this works
    //   version: 0,
    //   type: "user",
    //   UID: "0",
    //   activated: true,
    //   email: "gclark@munchkinlabs.us",
    //   phoneNumber: "7608893464",
    //   firstName: "Griffin",
    //   lastName: "Clark",
    //   username: "gclark00",
    //   profileImageURL:
    //     "https://ih1.redbubble.net/image.775821485.6679/mwo,x1000,ipad_2_snap-pad,750x1000,f8f8f8.u3.jpg",
    // };

    // setTestData([testEvent, testUser, testEvent2]);
    setTestData(cannedEvents)
  }, []);

  return (
    <View>
      <Navbar navigation={navigation}/>
      <View style={styles.feedContainer}>
        {/* TODO when data is passed in we have to note what type it is */}
        <DataDisplay data={testData} />
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  navbarContainer: {
    height: "10%",
    backgroundColor: TEST_HIGH_CONTRAST,
  },

  feedContainer: {
    height: "90%",
    backgroundColor: "#555",
  },
});
