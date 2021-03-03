import React, { useEffect, useState } from "react";
import { Button, SafeAreaView } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { TEST_HIGH_CONTRAST } from "../res/styles/Colors";
import { firestore } from "../res/services/firebase";
import firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";
import DataDisplay from "../organisms/DataDisplay";
import Navbar from "../organisms/Navbar";
import { cannedEvents } from "../res/cannedData";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { Event } from "../res/dataModels";

interface Props {
  navigation: any;
  route: any
}



export default function Home({ navigation, route }: Props) {
  const [feedData, setFeedData] = useState<Event[]>([]);

  // FIXME figure out how to call this when the form is submitted
  const addEvent = ()=>{
    let createdEvent: Event = route.params.data.eventData
    const newData: Event = {
      title: createdEvent.title,
      description: createdEvent.description,
      tags: createdEvent.tags,
      imageURL: createdEvent.imageURL
    }
    setFeedData((feedData: Event[]) =>[...feedData, newData])
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
            <Text style={globalStyles.title}>
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
          navigation.navigate("BuildEvent", {setFeedData: setFeedData}); // setFeedData is set here for convenience
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
