// See notes in NavigationButton
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Button } from "react-native";
import React from "react";
import { DARK, LIGHT, PRIMARY, SECONDARY } from "./../res/styles/Colors";

interface Props {
  destination: string;
  navigation: any; // not sure what type this is supposed to be
  title: string;
  onNavButtonPressed ?: any; // do you want to do anything when this button is pressed before navigating?
}

export default function NavigationButton({
  navigation,
  destination,
  title,
  onNavButtonPressed,
}: Props) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        // onPress={() => onNavButtonPressed().then(navigation.navigate(destination))}
        onPress={() => {
          // if a function was passed in, run it before navigating
          if (onNavButtonPressed) {
            onNavButtonPressed();
          }

          navigation.navigate(destination);
        }}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

let styles = StyleSheet.create({
  button: {
    backgroundColor: SECONDARY,
    color: DARK,
    justifyContent: "center",
    alignItems: "center",
    flex: 1, // fill the buttonContainer
    borderRadius: 12, // ...just kinda picked a random number here
  },
  title: {
    color: DARK,
    fontSize: 20,
  },
  buttonContainer: {
    height: 40,
  },
});
