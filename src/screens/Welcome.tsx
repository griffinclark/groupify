import React from "react";
import { Text, View, StyleSheet, SafeAreaView, Button } from "react-native";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { PRIMARY } from "../res/styles/Colors";
import UserTile from "../molecules/UserTile";
import CircularImageDisplay from "../atoms/CircularImageDisplay";

interface Props {
  navigation: any;
}

export default function Welcome({ navigation }: Props) {
  return (
    <SafeAreaView style={globalStyles.defaultRootContainer}>
      <View style={globalStyles.spacer} />
      <Text style={styles.title}>Are You Ready To Get Meeped?</Text>
      <View style={globalStyles.miniSpacer} />
      <Button
        onPress={()=>{
          navigation.navigate("Login")}}
        title={"Log In"}
      />
      <View style={globalStyles.miniSpacer} />
      <Button
        onPress={()=>{navigation.navigate("Home")}}
        title={"Home"}
      />
      <View style={globalStyles.miniSpacer} />
      <Button
        onPress={()=>{navigation.navigate("CreateAccount")}}
        title={"Create Account"}
      />
      <View style={globalStyles.miniSpacer} />
      <Button
        onPress={()=>{navigation.navigate("MyProfile")}}
        title={"My Profile"}
      />
      <View style={globalStyles.miniSpacer} />
      <View style={globalStyles.miniSpacer} />
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
