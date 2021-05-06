import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { DARK, WHITE } from "../res/styles/Colors";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { LIGHT } from "../res/styles/Colors";

interface Props {
  inputText: string; // this is a reference to where the data is being stored in the parent function
  setText: any; // this is a callback to the parent function to pass back the text that typed into this field
  placeholder: string;
  style?: object
}

export const MultiLineTextInput: React.FC<Props> = ({ inputText, setText, placeholder, style}) => {
  return (
    <View>
      <TextInput
        style={[styles.textInput, style]} // style has to be build here instead of in a stylesheet so we can dynamically set the height
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
        backgroundColor: WHITE,
        borderRadius: 5,
        padding: 20,
        margin: 10,
        fontSize: 16,
    }
})
