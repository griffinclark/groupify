import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { WHITE } from '../res/styles/Colors';

interface Props {
  inputText: string;
  setText: (ev: string) => void;
  placeholder: string;
}

export const MultiLineTextInput: React.FC<Props> = ({ inputText, setText, placeholder }: Props) => {
  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        multiline={true}
        onChangeText={(text) => setText(text)}
        value={inputText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: WHITE,
    borderRadius: 5,
    padding: 20,
    margin: 10,
    fontSize: 16,
  },
});
