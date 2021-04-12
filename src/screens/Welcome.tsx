import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { PRIMARY } from "../res/styles/Colors";
// import UserTile from "../molecules/UserTile";
// import CircularImageDisplay from "../atoms/CircularImageDisplay";
import { Auth } from "aws-amplify"
import { Button } from "../atoms/Button";

interface Props {
  navigation: any;
}

export default function Welcome({ navigation }: Props) {
  return (
    <SafeAreaView style={globalStyles.defaultRootContainer}>
      <Text style={styles.title}>Welcome to Meep</Text>
      <Button
        onPress={()=>{navigation.navigate("CreateAccount")}}
        title={"Create Account"}
      />
      <Button
        onPress={()=>{
          navigation.navigate("Login")}}
        title={"Log In"}
      />
      <Button
        onPress={() => {
          console.log("opps pressed");
        }}
        title={"unpressable"}
        disabled={true}
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
