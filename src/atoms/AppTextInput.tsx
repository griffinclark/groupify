import React, { useState } from 'react';
import { TextInputProps, StyleSheet, TextInput, View } from 'react-native';

import { AppText } from './AppText';
import { GOLD_0, WHITE, GREY_4, GREY_3 } from '../res/styles/Colors';
import { JOST } from './../res/styles/Fonts';

type InputProps = TextInputProps & {
  label?: string;
  inputStyle?: Record<string, unknown> | Array<Record<string, unknown>>;
  textStyle?: Record<string, unknown>;
};

export const AppTextInput: React.FC<InputProps> = ({ inputStyle, label, textStyle, ...props }: InputProps) => {
  return (
    <View>
      {label && <AppText style={[styles.label, textStyle ? textStyle : {}]}>{label}</AppText>}
      <TextInput
        maxLength={80}
        style={[styles.textInput, inputStyle]}
        placeholderTextColor={GREY_3}
        underlineColorAndroid="transparent"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginTop: 10,
    fontSize: 16,
  },
  selected: {
    borderColor: GOLD_0,
  },
  textInput: {
    fontSize: 16,
    backgroundColor: WHITE,
    borderRadius: 5,
    borderColor: GREY_4,
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
    paddingVertical: 9,
    paddingHorizontal: 10,
    fontFamily: JOST[400],
  },
});
