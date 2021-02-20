import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import UserDisplayTile from "./src/molecules/UserDisplayTile";
import { globalStyles } from "./src/res/styles/GlobalStyles";
import Welcome from "./src/screens/Welcome";
import RootNavigation from "./src/res/root-navigation";

export default function App() {
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
