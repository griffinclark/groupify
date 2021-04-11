import React from "react";
import { Text, View, StyleSheet, SafeAreaView, Button } from "react-native";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { PRIMARY } from "../res/styles/Colors";
// import UserTile from "../molecules/UserTile";
// import CircularImageDisplay from "../atoms/CircularImageDisplay";
import { Auth } from "aws-amplify"

interface Props {
  navigation: any;
}

export default function Welcome({ navigation }: Props) {
  return (
    <SafeAreaView style={globalStyles.defaultRootContainer}>
      <Text style={styles.title}>Welcome to Meep</Text>
      <Button
        title={"Default login"}
        onPress={() => Auth.federatedSignIn()}
      />
      <Button
        onPress={()=>{navigation.navigate("CreateAccount")}}
        title={"Create Account"}
      />
      <Button
        onPress={()=>{
          navigation.navigate("Login")}}
        title={"Log In"}
      />

    </SafeAreaView>
  );
}

let styles = StyleSheet.create({
  title: {
    fontSize: 45,
    color: PRIMARY,
    textAlign: 'center',
    fontWeight: "bold"
  },
});
