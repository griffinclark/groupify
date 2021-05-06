import React, { useEffect, useState } from "react";
// import { Button, SafeAreaView } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { TEST_HIGH_CONTRAST } from "../res/styles/Colors";
// import { firestore } from "../res/services/firebase";
// import firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";
import DataDisplay from "../organisms/DataDisplay";
import { Navbar } from "../organisms/Navbar";
import { cannedEvents } from "../res/cannedData";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { Event } from "../res/dataModels";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllUserEvents, getAllImportedContacts } from "./../res/storageFunctions";
import { Button } from "../atoms/Button";
import { Screen } from '../atoms/Screen';
import { NavButton } from "../atoms/NavButton";
import { Auth } from "aws-amplify";

interface Props {
  navigation: any;
  route: any
}


export default function Home({ navigation, route }: Props) {
  const [feedData, setFeedData] = useState<Event[]>([]);

  useEffect(() => {
    getUserEvents();
  }, [route.params]); // only runs when route.params changes, need to change this in the future

  const getUserEvents = async () => {
    // console.log(await getAllUserEvents());
    const events = await getAllUserEvents();
    setFeedData(events);
  }


  return (
    <Screen>
      <View style={styles.navbar}>
        <Navbar>
          <NavButton
            onPress={async () => {
              try {
                await Auth.signOut();
                console.log('successfully signed out');
                navigation.navigate("Welcome");
              } catch (err) {
                console.log('error signing out...', err);
              }
            }}
            title='Log Out'
          />
          <NavButton
            onPress={() => {
              navigation.navigate("ImportContacts")
            }}
            title='Edit Contacts'
          />
        </Navbar>
      </View>
      <View style={styles.feedContainer}>
        {feedData.length > 0 ? (
          <DataDisplay
            data={feedData}
            navigation={navigation}
            displayButton={false}
          />
        ) : (
          <View style={styles.title}>
            {/* <View style={globalStyles.megaSpacer} /> */}
            <Text style={globalStyles.superTitle}>
              When you create an event, it will show up here
            </Text>
          </View>
        )}
      </View>
      {/* <View style={globalStyles.miniSpacer} /> */}
      <View style={styles.button}>
        <Button
          title="Create event"
          onPress={() => {
            navigation.navigate("CreateCustomEvent"); 
          }}
        />
      </View>
    </Screen>
  );
}

let styles = StyleSheet.create({
  navbar: {
    flex: 1.5,
    justifyContent: 'center'
  },
  feedContainer: {
    flex: 10
  },
  title: {
    flex: 1,
    justifyContent: 'center'

  },
  button: {
    flex: 1.5,
    justifyContent: 'center'
  }
});
