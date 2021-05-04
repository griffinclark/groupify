import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { PRIMARY } from "../res/styles/Colors";
// import UserTile from "../molecules/UserTile";
// import CircularImageDisplay from "../atoms/CircularImageDisplay";
import { Auth } from "aws-amplify"
import { Button } from "../atoms/Button";
import { Screen } from "../atoms/Screen";
import { Title } from "../atoms/Title";

interface Props {
  navigation: any;
}

export default function Welcome({ navigation }: Props) {
  return (
    <Screen>
      <Title style={{fontSize: 45, margin: 40}}>Welcome to Meep</Title>
      <Button
        onPress={()=>{navigation.navigate("CreateAccount", {step: 'create'})}}
        title={"Create Account"}
      />
      <Button
        onPress={()=>{
          navigation.navigate("Login")}}
        title={"Log In"}
      />
    </Screen>
  );
}
