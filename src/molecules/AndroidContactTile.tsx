import React, { useState } from "react";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { View, Text, TouchableOpacity } from "react-native";
import CircularImageDisplay from "../atoms/CircularImageDisplay";
import { StyleSheet } from "react-native";
import { TEST_HIGH_CONTRAST, TEST_IMAGE_URL, GRAY_DARK } from "../res/styles/Colors";
import CheckBox from "../atoms/CheckBox";
import { Contact } from "../res/dataModels";

interface Props {
  contact?: Contact;
  firstName?: string;
  lastName ?: string;
  imageURL?: string;
  addUser?: any; // if there's a list of users, add the user by username when the checkbox is checked
  removeUser?: any;
  isChecked? : boolean;
}
export default function AndroidContactTile({
  // TODO: add id parameter and add by id instead of by firstName
  contact,
  firstName,
  imageURL,
  addUser,
  removeUser,
  isChecked = false,
}: Props) {

  const [checked, setChecked] = useState(isChecked);

  const onPress = () => {
    if (!checked) {
      setChecked(true);
      addUser(contact);
      // console.log("add");
    }
    else {
      setChecked(false);
      removeUser(contact);
      // console.log("remove");
    }
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rootContainer}>
        <View style={styles.profileImageContainer}>
          {imageURL ? (
            <CircularImageDisplay imageURI={imageURL} />
          ) : (
            <CircularImageDisplay imageURI={TEST_IMAGE_URL} />
          )}
        </View>
        <View>
          <Text style={ checked ? styles.nameSelected : styles.nameNotSelected}> {firstName} </Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            isSelected={checked}
            onValueChange={onPress}
          />
        </View>
      </View>
    </TouchableOpacity>
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
  nameSelected: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "mediumpurple",
  },
  nameNotSelected: {
    fontWeight: 'bold',
    fontSize: 20,
    color: GRAY_DARK,
  },
});
