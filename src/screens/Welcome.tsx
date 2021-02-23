import React from "react";
import { Text, View, StyleSheet, SafeAreaView, Button } from "react-native";
import NavigationButton from "../atoms/NavigationButton";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { PRIMARY } from "./../res/styles/Colors";
import UserTile from "../molecules/UserTile";
import CircularImageDisplay from "../atoms/CircularImageDisplay";
import { auth, importZombies } from "../res/services/firebase";

interface Props {
  navigation: any;
}

export default function Welcome({ navigation }: Props) {
  return (
    <SafeAreaView style={globalStyles.defaultRootContainer}>
      <View style={globalStyles.spacer} />
      <Text style={styles.title}>Are You Ready To Get Meeped?</Text>

      <View style={globalStyles.megaSpacer} />
      <Button
        onPress={()=>{
          navigation.navigate("Login")}}
        title={"Log In"}
      />
      <View style={globalStyles.miniSpacer} />
      <Button
        onPress={()=>{
          navigation.navigate("Home")}}
        title={"Create Account"}
      />
      <View style={globalStyles.miniSpacer} />
      <Button title="Click me, father" onPress={async () => {
        console.log("Hello!");
        try {
          console.log(await importZombies({
            zombies: [{
              id: 7604507125,
              name: "David Detweiler"
            }, {
              id: 1234567890,
              name: "Griffin Clark"
            }]
          }));

          console.log("Success!");
        }
        catch (err) {
          console.log("Error!");
          console.log(err);
        }
      }}>
      </Button>
      <View style={globalStyles.miniSpacer} />
      <Button title="Sign Out" onPress={async () => await auth.signOut()} />
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
