import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import UserDisplayTile from "./src/molecules/UserDisplayTile";
import firebase from "firebase/app";
import { globalStyles } from "./src/res/styles/GlobalStyles";
import Welcome from "./src/screens/Welcome";


export default function App() {

  return (
    <View style={globalStyles.defaultRootContainer}>
      <View style={{ alignSelf: "center", paddingTop: 100 }}>
        <Welcome navigation={null} />
      </View>
      <StatusBar style="auto" />
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
