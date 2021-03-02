import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import DataDisplay from "../organisms/DataDisplay";
import Navbar from '../organisms/Navbar';
import { cannedEvents } from "../res/cannedData";
import { globalStyles } from '../res/styles/GlobalStyles';

interface Props {
  navigation: any;
}

export default function SuggestedEvents({ navigation }: Props) {
  let [endpoints, setEndpoints] = useState([{}]);
  useEffect(() => {

    setEndpoints(cannedEvents)
}, []);
  return (
    <SafeAreaView >
        <Navbar navigation={navigation}/>
        <Text style={globalStyles.title}>Suggested Events</Text>
        <View style={styles.feedContainer}>
        <DataDisplay data={endpoints} displayButton={true} navigation={navigation} onSelect={()=>{console.log("Boop!")}}/>
        </View>
    </SafeAreaView>
  );
}

let styles = StyleSheet.create({
    feedContainer: {
        height: "90%"
    }
})
