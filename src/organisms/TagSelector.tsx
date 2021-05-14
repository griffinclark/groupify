import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {Tag} from "../atoms/AtomsExports";
import { globalStyles } from "./../res/styles/GlobalStyles";

interface Props {
  tags: string[];
  selectedTags: string[]
  setSelectedTags: any
}
export function TagSelector({ tags, selectedTags, setSelectedTags }: Props) {




  return (
    <View>
      <View style={globalStyles.miniSpacer} />
      <Text style={globalStyles.superTitle}>Where would you like to go? Select one or more options</Text>
      <View style={globalStyles.miniSpacer} />
      <FlatList
        data={tags}
        renderItem={({ item }) => {
          return (
            <View style={styles.tagContainer}>
              <Tag title={item} setSelectedTags={setSelectedTags} selectedTags={selectedTags}/>
            </View>
          );
        }}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

let styles = StyleSheet.create({
  tagContainer: {
    padding: 5,
  },
});
