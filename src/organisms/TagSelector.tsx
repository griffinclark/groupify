import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Tag from "../atoms/Tag";
import { globalStyles } from "./../res/styles/GlobalStyles";

interface Props {
  tags: string[];
  selectedTags: string[]
  setSelectedTags: any
}
export default function TagSelector({ tags, selectedTags, setSelectedTags }: Props) {




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
