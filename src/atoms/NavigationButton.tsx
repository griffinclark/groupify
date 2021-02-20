// See notes in NavigationButton
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Button } from "react-native";
import React from "react";
import { LIGHT } from './../res/styles/Colors';

interface Props {
  destination: string;
  navigation: any; // not sure what type this is supposed to be
}

export default function NavigationButton({ navigation, destination }: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate(destination)}
    >
      <Text>{destination}</Text>
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
