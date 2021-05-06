import Auth from "@aws-amplify/auth";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavButton } from "../atoms/NavButton";
import { StackProps } from "../res/root-navigation";
import { LT_PURPLE, TEST_HIGH_CONTRAST, WHITE } from './../res/styles/Colors';

export const Navbar: React.FC = (props) => {
  return (
    <View style={styles.nav}>
      {props.children}
    </View>
  );
}

let styles = StyleSheet.create({
  nav: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 10 
  }
});
