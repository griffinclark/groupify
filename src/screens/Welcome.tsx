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
      <Text style={styles.title}>Welcome to Meep</Text>

      <View style={globalStyles.megaSpacer} />
      <UserTile username="joe nobody" imageURL="https://static01.nyt.com/images/2019/04/02/science/28SCI-ZIMMER1/28SCI-ZIMMER1-superJumbo.jpg"/>
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
