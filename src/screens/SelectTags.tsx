import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { globalStyles } from "../res/styles/GlobalStyles";
import Navbar from "../organisms/Navbar";
import TagSelector from "../organisms/TagSelector";
import { tagList } from './../res/cannedData';

interface Props {
  navigation: any;
}
export default function SelectTags({ navigation }: any) {
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <View style={globalStyles.defaultRootContainer}>
      <Navbar navigation={navigation} />
      <TagSelector
        tags={tagList}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      {selectedTags.length > 0 && <Button
        title={"Continue"}
        onPress={() => {
          let item = "a"
          navigation.navigate("SuggestedEvents", {data: {selectedTags: selectedTags}})
        }}
      />}
    </View>
  );
}

let styles = StyleSheet.create({});