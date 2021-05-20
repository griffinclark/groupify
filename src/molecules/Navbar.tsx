import React from "react";
import { StyleSheet, View } from "react-native";

export const Navbar: React.FC = (props) => {
  return <View style={styles.nav}>{props.children}</View>;
};

const styles = StyleSheet.create({
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
