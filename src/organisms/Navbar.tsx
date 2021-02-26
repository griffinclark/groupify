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
      <TouchableOpacity
        onPress={() => {
          navigation.goBack()
        }}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home")
        }}
      >
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AddFriends")
        }}
      >
        <Text>Add Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("BuildEvent");
        }}
      >
        <Text>Build Event</Text>
      </TouchableOpacity>
    </View>
  );
}

let styles = StyleSheet.create({
  rootContainer: {
    height: 75,
    backgroundColor: TEST_HIGH_CONTRAST,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingRight: 20,
    paddingLeft: 20 ,
    paddingBottom: 10 
  },
});
