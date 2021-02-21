import React, { useState } from "react";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { View, Text } from "react-native";
import CircularImageDisplay from "../atoms/CircularImageDisplay";
import { StyleSheet } from "react-native";
import { TEST_HIGH_CONTRAST } from "./../res/styles/Colors";
import CheckBox from "../atoms/CheckBox";

interface Props {
  username: string;
  imageURL: string;
  addUser?: any; // if there's a list of users, add the user by username when the checkbox is checked
  removeUser?: any;
}
export default function UserTile({
  username,
  imageURL,
  addUser,
  removeUser,
}: Props) {
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.rootContainer}>
      <View style={styles.profileImageContainer}>
        <CircularImageDisplay imageURI={imageURL} />
      </View>
      <View>
        <Text style={globalStyles.title}> {username} </Text>
      </View>
      {addUser ? (
        <View style={styles.checkboxContainer}>
          <CheckBox
            isSelected={checked}
            onValueChange={() => {
              setChecked(!checked);

              if (checked == true) {
                addUser(username);
                console.log("added")
              } else {
                removeUser(checked); // TODO fix
                console.log("removed")
              }
            }}
          />
        </View>
      ) : (
        <Text> </Text> // not sure what I'm supposed to put here
      )}
    </View>
  );
}

let styles = StyleSheet.create({
  rootContainer: {
    height: 75,
    flexDirection: "row",
    backgroundColor: TEST_HIGH_CONTRAST,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageContainer: {
    display: "flex",
    height: 50,
    width: 50,
    // This isn't the best way to get the image where we need it, but...
    position: "absolute",
    left: 10,
  },
  checkboxContainer: {
    position: "absolute",
    right: 10,
  },
});
