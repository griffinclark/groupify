import React, {useState} from "react";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { View, Text } from "react-native";
import CircularImageDisplay from "../atoms/CircularImageDisplay";
import { StyleSheet } from "react-native";
import { TEST_HIGH_CONTRAST } from './../res/styles/Colors';
import CheckBox from "../atoms/CheckBox";

interface Props {
  username: string;
  imageURL: string;
}

export default function UserTile({ username, imageURL }: Props) {

    const [checked, setChecked] = useState(false)
  return (
    <View style={styles.rootContainer}>
      <View style={styles.profileImageContainer}>
          <CircularImageDisplay imageURI={imageURL} />
      </View>
      <View style={styles.textContainer}>
        <Text style= {globalStyles.title}> {username} </Text>
      </View>
      <View >
          <CheckBox isSelected={checked} onValueChange={()=>{setChecked(!checked)}}/>
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  rootContainer: {
    height: 75,
    flexDirection: "row",
    backgroundColor: TEST_HIGH_CONTRAST,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImageContainer: {
    display: "flex",
    height: 50,
    width: 50,
    // This isn't the best way to get the image where we need it, but...
    position: 'absolute',
    left: 10,
  },
  textContainer: {
      
  }
});
