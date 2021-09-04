import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { GOLD, GREY_5 } from '../res/styles/Colors';

interface Props {
  onChangeText: React.Dispatch<string>;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
  returnKeyNext: boolean;
  autoFocus?: boolean;
  submit?: (ev: string) => void;
}
export const FormInput: React.FC<Props> = ({
  onChangeText,
  label,
  placeholder,
  secureTextEntry = false,
  value,
  returnKeyNext,
  autoFocus,
  submit,
}: Props) => {
  const [focus, setFocus] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{label}</Text>
      <TextInput
        returnKeyType={returnKeyNext ? 'next' : 'done'}
        autoFocus={autoFocus || false}
        value={value}
        keyboardType={
          label === 'Phone Number' ? 'number-pad' : label === 'Verification Code' ? 'number-pad' : 'default'
        }
        onSubmitEditing={() => {
          if (submit && label === 'Password') {
            submit(label);
          }
        }}
        style={[styles.input, { borderColor: focus ? GOLD : GREY_5 }]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={() => setFocus(false)}
        secureTextEntry={secureTextEntry}
        onFocus={() => setFocus(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    fontWeight: '400',
    fontSize: 14,
  },
  input: {
    // backgroundColor: background,
    padding: 10,
    paddingVertical: 12,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
});
