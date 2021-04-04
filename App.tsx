import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "./src/res/styles/GlobalStyles";
import Welcome from "./src/screens/Welcome";
import RootNavigation from "./src/res/root-navigation";
import awsconfig from "./src/aws-exports";
import Amplify, { Auth } from "aws-amplify";

Amplify.configure(awsconfig);

export default function App() {
  LogBox.ignoreLogs(['source.uri should not be an empty string']); // This error pops up because of how we create the image view, but it isn't a big deal
  LogBox.ignoreLogs(['Setting a timer']); // No it doesn't...

  return (
    <View style={globalStyles.defaultRootContainer}>
      <RootNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00ffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
