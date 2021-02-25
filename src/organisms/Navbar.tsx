import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  navigation: any;
}
export default function Navbar({ navigation }: any) {
  return (
    <View style={styles.rootContainer}>
      <TouchableOpacity
        onPress={() => {
          console.log("pressed");
        }}
      >
        <Text>Hello world</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log("pressed");
        }}
      >
        <Text>Hello world</Text>
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
    marginRight: 20,
    marginLeft: 20 ,
    marginBottom: 10 
  },
});
