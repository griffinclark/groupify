import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import NavigationButton from "../atoms/NavigationButton";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { PRIMARY } from "./../res/styles/Colors";
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

      <View style={globalStyles.megaSpacer} />
      <NavigationButton
        navigation={navigation}
        title={"Log In"}
        destination={"Login"}
      />
      <View style={globalStyles.miniSpacer} />
      <NavigationButton
        navigation={navigation}
        title={"Create Account"}
        destination={"CreateAccount"}
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
