import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { DARK } from "../res/styles/Colors";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { LIGHT } from "./../res/styles/Colors";

interface Props {
  inputText: string; // this is a reference to where the data is being stored in the parent function
  setText: any; // this is a callback to the parent function to pass back the text that typed into this field
  placeholder: string;
}

export default function MultiLineTextInput({ inputText, setText, placeholder}: Props) {
  return (
    <View>
      <TextInput
        style={styles.textInput} // style has to be build here instead of in a stylesheet so we can dynamically set the height
        placeholder={placeholder}
        multiline={true}
        onChangeText={(text) => setText(text)}
        value={inputText}
      />
    </View>
  );
}

let styles = StyleSheet.create({
    textInput: {
        backgroundColor: LIGHT,
        borderBottomWidth: 1,
        height: 100 // would love to be able to set this hight dynamically... not sure how to do that though :(
    }
})
