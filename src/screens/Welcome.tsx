import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import NavigationButton from "../atoms/NavigationButton";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { PRIMARY } from "./../res/styles/Colors";

interface Props {
  navigation: any;
}

export default function Welcome({ navigation }: Props) {
  return (
    <SafeAreaView style={globalStyles.defaultRootContainer}>
      <Text style={styles.title}>Welcome to Meep</Text>

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
    fontSize: 50,
    color: PRIMARY,
    textAlign: 'center',
    fontWeight: "bold"
  },
});
