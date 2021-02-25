import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { View, StyleSheet,Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Tag from "../atoms/Tag";

interface Props {
  tags: string[];
}
export default function TagSelector({ tags }: Props) {
  const [selectedTags, setSelectedTags] = useState([]);

  const addTag = (tag: string) => {
    setSelectedTags((tag) => [...selectedTags, tag]);
  };

  const tagList = (titles: string[]) => {
    let tags: any[] = [];
    titles.forEach((title: string) => {
      tags.push(<Tag title={title} setSelectedTags={setSelectedTags} />);
    });
    return tags;
  };

  // TODO @David where are we storing the list of possible tags?
  let titles = ["Squirrel", "Elephant", "Hydra"];
  tagList(titles);

  return (
    <View>
      <FlatList
        data={titles}
        renderItem={({ item }) => {
          return (
            <View style={styles.tagContainer}>
              <Tag title={item} setSelectedTags={setSelectedTags} />
            </View>
          );
        }}
        keyExtractor={(item) => item}
      />
      <Button title={"Continer"} />
    </View>
  );
}

let styles = StyleSheet.create({
    tagContainer: {
        padding: 5
    }
})