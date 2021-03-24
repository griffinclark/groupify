import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import DataDisplay from "../organisms/DataDisplay";
import Navbar from "../organisms/Navbar";
import { cannedEvents } from "../res/cannedData";
import { globalStyles } from "../res/styles/GlobalStyles";

interface Props {
  navigation: any;
  selectedTags: string[];
  route: any;
}

export default function SuggestedEvents({
  navigation,
  selectedTags,
  route,
}: Props) {    
  let [endpoints, setEndpoints] = useState<Event[]>();    
  useEffect(() => {    
    
    let goodEndpoints: Event[] = [];    
    cannedEvents.forEach((endpoint) => {    
      console.log(route.params.data)    
      route.params.data.selectedTags.forEach((tag: string) => {    
        if (endpoint.tags.includes(tag)) {    
          if (!goodEndpoints.includes(endpoint)) {    
            goodEndpoints.push(endpoint);    
          }
        }
      });
    });
    setEndpoints(goodEndpoints);
  }, []);

  return (
    <SafeAreaView>
      <Navbar navigation={navigation} />
      <Text style={globalStyles.superTitle}>Select a place to go!</Text>
      <View style={styles.feedContainer}>
        <DataDisplay
          data={endpoints}
          tagData={route.params.data}
          displayButton={true}
          navigation={navigation}
          onSelect={() => {
            console.log("Boop!");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

let styles = StyleSheet.create({
  feedContainer: {
    height: "90%",
  },
});
