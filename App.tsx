import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CheckBox from "./src/atoms/CheckBox";
import MultiLineTextInput from "./src/atoms/MultiLineTextInput";
import SingleLineTextInput from "./src/atoms/SingleLineTextInput";
import Tag from "./src/atoms/Tag";
import { globalStyles } from "./src/res/styles/GlobalStyles";

export default function App() {
  return (
    <View style={globalStyles.defaultRootContainer}>
      <View style={{ alignSelf: "center", paddingTop: 100 }}>
        <Text>It worked!</Text>
        <Tag title="hello world" onPress = {()=>(console.log("app"))}/>
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
