import React, { useEffect, useState } from "react";
import { Button, SafeAreaView } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { TEST_HIGH_CONTRAST } from "../res/styles/Colors";
// import { firestore } from "../res/services/firebase";
// import firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";
import DataDisplay from "../organisms/DataDisplay";
import Navbar from "../organisms/Navbar";
import { cannedEvents } from "../res/cannedData";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { Event } from "../res/dataModels";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllUserEvents, getAllImportedContacts } from "./../res/storageFunctions";

interface Props {
  navigation: any;
  route: any
}


export default function Home({ navigation, route }: Props) {
  const [feedData, setFeedData] = useState<Event[]>([]);

  useEffect(() => {
    getUserEvents();
  }, [route.params]); // TODO: only runs when route.params changes, need to change this in the future

  const getUserEvents = async () => {
    let events = (await getAllUserEvents())!;
    setFeedData(events);
  }


  return (
    <View>
      <Navbar navigation={navigation} />
      <View style={styles.feedContainer}>
        {feedData.length > 0 ? (
          <DataDisplay
            data={feedData}
            navigation={navigation}
            displayButton={false}
          />
        ) : (
          <View>
            <View style={globalStyles.megaSpacer} />
            <Text style={globalStyles.superTitle}>
              When you create an event, it will show up here
            </Text>
          </View>
        )}
      </View>
      <View style={globalStyles.miniSpacer} />
      <Button
        title={"Create event"}
        color="green"
        onPress={() => {
          navigation.navigate("CreateCustomEvent"); 
        }}
      />
    </View>
  );
}

let styles = StyleSheet.create({
  navbarContainer: {
    height: "10%",
    backgroundColor: TEST_HIGH_CONTRAST,
  },

  feedContainer: {
    height: "82%",
  },
});
