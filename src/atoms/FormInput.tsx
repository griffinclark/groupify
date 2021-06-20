import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { GREY_5 } from '../res/styles/Colors';

interface FormProps {
  onChangeText: React.Dispatch<string>;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
}
export const FormInput: React.FC<FormProps> = ({
  onChangeText,
  label,
  placeholder,
  secureTextEntry = false,
  value,
}: FormProps) => {
  return (
    <View style={styles.wrapper}>
      <Text>{label}</Text>
      <TextInput
        value={value}
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    backgroundColor: GREY_5,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});
