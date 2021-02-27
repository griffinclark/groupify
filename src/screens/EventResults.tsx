import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import DataDisplay from "../organisms/DataDisplay";
import Navbar from './../organisms/Navbar';
import { globalStyles } from './../res/styles/GlobalStyles';

interface Props {
  navigation: any;
}

export default function EventResults({ navigation }: Props) {
  let [endpoints, setEndpoints] = useState([{}]);
  useEffect(() => {
    // TODO @David load in event results based on tags and ignoring friends
    // @David make sure results are returned in a random order so the search looks 'intelligent'
  
    let exampleEndpoint = {
        title: "Endpoint A",
        endpointUID: "Need an endpoint UID4",
        UID: "1",
        type: "endpoint"
    }
    let exampleEndpoint2 = {
        title: "Endpoint B",
        endpointUID: "Need an endpoint UID3",
        UID: "A",
        type: "endpoint"
    }
    let exampleEndpoint3 = {
        title: "Endpoint C",
        endpointUID: "Need an endpoint UID2",
        UID: "2",
        type: "endpoint"
    }
    let exampleEndpoint4 = {
        title: "Endpoint D",
        endpointUID: "Need an endpoint UID1",
        UID: "B",
        type: "endpoint"
    }

    setEndpoints([exampleEndpoint, exampleEndpoint2, exampleEndpoint3, exampleEndpoint4])
}, []);
  return (
    <SafeAreaView >
        <Navbar navigation={navigation}/>
        <Text style={globalStyles.title}>Suggested Events</Text>
        <View style={styles.feedContainer}>
        <DataDisplay data={endpoints} navigation={navigation}/>
        </View>
    </SafeAreaView>
  );
}

let styles = StyleSheet.create({
    feedContainer: {
        height: "90%"
    }
})
