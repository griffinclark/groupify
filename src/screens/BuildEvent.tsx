import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { globalStyles } from "./../res/styles/GlobalStyles";
import Navbar from "./../organisms/Navbar";
import TagSelector from "../organisms/TagSelector";

interface Props {
  navigation: any;
}
// TODO @David where are we storing the list of possible tags?
let testTags = ["Squirrel", "Elephant", "Hydra"];
export default function BuildEvent({ navigation }: any) {
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <View style={globalStyles.defaultRootContainer}>
      <Navbar navigation={navigation} />
      <TagSelector
        tags={testTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <Button
        title={"Continue"}
        onPress={() => {
          console.log(selectedTags);
          navigation.navigate("SelectFriends")
          // TODO @David how do we carry selected tags over?
        }}
      />
    </View>
  );
}

let styles = StyleSheet.create({});
