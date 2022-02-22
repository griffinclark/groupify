import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
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
        onChangeText={onChangeText}
        onBlur={() => setFocus(false)}
        secureTextEntry={secureTextEntry}
        onFocus={() => setFocus(true)}
        maxFontSizeMultiplier={maxFontSizeMultiplier}
        placeholderTextColor={GREY_3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // marginHorizontal: 20,
    marginVertical: 9,
  },
  title: {
    fontFamily: JOST['500'],
    fontSize: 16,
    lineHeight: 23
  },
  input: {
    // backgroundColor: background,
    padding: 10,
    paddingVertical: 12,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    fontFamily: JOST['400'],
    fontSize: 20,
  },
});
