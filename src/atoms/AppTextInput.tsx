import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { AppText } from './AppText';
import { GOLD_0, WHITE } from '../res/styles/Colors';
import { GREY_4 } from './../res/styles/Colors';

interface Props {
  autoFocus?: boolean;
  editable?: boolean;
  inputStyle?: Record<string, unknown> | Array<Record<string, unknown>>;
  label?: string;
  maxFontSizeMultiplier?: number;
  multiline?: boolean;
  onChangeText: (e: string) => void;
  placeholder?: string | undefined;
  secureTextEntry?: boolean;
  textStyle?: Record<string, unknown>;
  value?: string | undefined;
}

export const AppTextInput: React.FC<Props> = ({
  autoFocus = false,
  editable = true,
  inputStyle,
  label,
  maxFontSizeMultiplier = 1.5,
  multiline = false,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  textStyle,
  value,
}: Props) => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <View>
      {label && <AppText style={[styles.label, textStyle ? textStyle : {}]}>{label}</AppText>}
      <TextInput
        autoFocus={autoFocus}
        maxLength={80}
        editable={editable}
        onBlur={() => setSelected(false)}
        onChangeText={onChangeText}
        onFocus={() => setSelected(true)}
        maxFontSizeMultiplier={maxFontSizeMultiplier}
        multiline={multiline}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={[styles.textInput, selected ? styles.selected : null, inputStyle]}
        testID="input"
        value={value}
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
    fontSize: 18,
    backgroundColor: WHITE,
    borderRadius: 5,
    borderColor: GREY_4,
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
  },
});
