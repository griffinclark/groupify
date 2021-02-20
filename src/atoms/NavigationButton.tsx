// See notes in NavigationButton
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Button } from "react-native";
import React from "react";
import { LIGHT } from './../res/styles/Colors';

interface Props {
  destination: string;
  navigation: any; // not sure what type this is supposed to be
  title: string;
}

export default function NavigationButton({ navigation, destination, title }: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      // onPress={() => navigation.navigate(destination)}
      onPress={()=>{console.log("hello world")}}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

let styles = StyleSheet.create({
  button: {
    backgroundColor: LIGHT,
    justifyContent: "center"
  },
});

// TODO style me
