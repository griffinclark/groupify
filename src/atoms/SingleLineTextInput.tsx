import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { LIGHT } from '../res/styles/Colors';

interface Props {
  inputText: string; // this is a reference to where the data is being stored in the parent function
  setText: (ev: string) => void; // this is a callback to the parent function to pass back the text that typed into this field
  placeholder: string;
}

export const SingleLineTextInput: React.FC<Props> = ({ inputText, setText, placeholder }: Props) => {
  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        onChangeText={(text) => setText(text)}
        value={inputText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: LIGHT,
    borderBottomWidth: 1,
  },
});
