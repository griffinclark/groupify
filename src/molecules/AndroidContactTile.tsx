import React, { useState } from "react";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { View, Text } from "react-native";
import CircularImageDisplay from "../atoms/CircularImageDisplay";
import { StyleSheet } from "react-native";
import { TEST_HIGH_CONTRAST, TEST_IMAGE_URL } from "../res/styles/Colors";
import CheckBox from "../atoms/CheckBox";

interface Props {
  firstName: string;
  lastName ?: string;
  imageURL?: string;
  addUser?: any; // if there's a list of users, add the user by username when the checkbox is checked
  removeUser?: any;
}
export default function AndroidContactTile({
  firstName,
  imageURL,
  addUser,
  removeUser,
}: Props) {
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.rootContainer}>
      <View style={styles.profileImageContainer}>
        {imageURL ? (
          <CircularImageDisplay imageURI={imageURL} />
        ) : (
          <CircularImageDisplay imageURI={TEST_IMAGE_URL} />
        )}
      </View>
      <View>
        <Text style={globalStyles.title}> {firstName } </Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          isSelected={checked}
          onValueChange={() => {
            setChecked(!checked);

            if (checked != true) { // IK its backwards!!!! Don't come whining to me about it. It works so it's a good solution
              try{
                addUser(firstName);
              } catch (e) {
                console.log(e)
              } 
              console.log("added");
            } else {
              try{
                removeUser(firstName);
              } catch (e) {
                console.log(e)
              } 
              console.log("removed");
            }
          }}
        />
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  rootContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
    // borderTopWidth: 1,
    // borderRightWidth: 1,
    // borderLeftWidth: 1,
    margin: 5,
  },
  profileImageContainer: {
    display: "flex",
    height: 30,
    width: 30,
    // This isn't the best way to get the image where we need it, but...
    position: "absolute",
    left: 10,
  },
  checkboxContainer: {
    position: "absolute",
    right: 10,
  },
});
