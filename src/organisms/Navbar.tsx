import Auth from "@aws-amplify/auth";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TEST_HIGH_CONTRAST } from './../res/styles/Colors';

interface Props {
  navigation: any;
}
export default function Navbar({ navigation }: any) {
  return (
    <View style={styles.rootContainer}>
      {/* <TouchableOpacity
        onPress={() => {
          navigation.goBack()
        }}
      >
        <Text>Go Back</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={async () => {
          try {
            await Auth.signOut();
            console.log('successfully signed out');
            navigation.navigate("Welcome");
          } catch (err) {
            console.log('error signing out...', err);
          }
        }}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ImportContacts")
        }}
      >
        <Text>Import Contacts</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate("CreateCustomEvent");
        }}
      >
        <Text>Create Event</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

let styles = StyleSheet.create({
  rootContainer: {
    height: 75,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingRight: 20,
    paddingLeft: 20 ,
    paddingBottom: 10 
  },
});
