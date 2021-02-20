import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CheckBox from "./src/atoms/CheckBox";
import MultiLineTextInput from "./src/atoms/MultiLineTextInput";
import SingleLineTextInput from "./src/atoms/SingleLineTextInput";
import Tag from "./src/atoms/Tag";
import { globalStyles } from "./src/res/styles/GlobalStyles";

import firebase from "firebase/app";

function initFirebase() {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCAnV-1BdHUGv3VwSZf-AoTVKsnZuaZK1w",
    authDomain: "octopus-63e06.firebaseapp.com",
    databaseURL: "https://octopus-63e06-default-rtdb.firebaseio.com",
    projectId: "octopus-63e06",
    storageBucket: "octopus-63e06.appspot.com",
    messagingSenderId: "912650001024",
    appId: "1:912650001024:web:dc1830879645063302e465",
    measurementId: "G-2TD3DXEJ4W"
  };

  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  initFirebase();

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
