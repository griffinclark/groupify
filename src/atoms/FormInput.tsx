import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TextInputProps } from 'react-native';
import { GREY_3, GREY_5, GREY_9 } from '../res/styles/Colors';
import { AppText } from './AppText';
import { JOST } from '../res/styles/Fonts';

interface Props {
  onChangeText: React.Dispatch<string>;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
  returnKeyNext: boolean;
  autoFocus?: boolean;
  submit?: (ev: string) => void;
  maxFontSizeMultiplier?: number;
  textProps?: TextInputProps;
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
  textProps,
  maxFontSizeMultiplier = 1.5,
}: Props) => {
  const [focus, setFocus] = useState(false);

  return (
    <View style={styles.wrapper}>
      <AppText style={styles.title}>{label}</AppText>
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
        style={[styles.input, { borderColor: focus ? GREY_5 : GREY_9 }]}
        placeholder={placeholder}
        placeholderTextColor={GREY_3}
        onChangeText={onChangeText}
        onBlur={() => setFocus(false)}
        secureTextEntry={secureTextEntry}
        onFocus={() => setFocus(true)}
        maxFontSizeMultiplier={maxFontSizeMultiplier}
        {...textProps}
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
    fontFamily: JOST['500'],
    fontSize: 16,
  },
  input: {
    // backgroundColor: background,
    padding: 10,
    paddingVertical: 12,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 20,
  },
});
