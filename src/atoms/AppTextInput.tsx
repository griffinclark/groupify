import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { AppText } from './AppText';
import { GOLD, WHITE } from '../res/styles/Colors';

interface Props {
  autoFocus?: boolean;
  label?: string;
  maxFontSizeMultiplier?: number;
  onChangeText: (e: string) => void;
  placeholder?: string | undefined;
  secureTextEntry?: boolean;
  value?: string | undefined;
}

export const AppTextInput: React.FC<Props> = ({
  autoFocus = false,
  label,
  maxFontSizeMultiplier = 1.5,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  value,
}: Props) => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <View>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <TextInput
        autoFocus={autoFocus}
        onBlur={() => setSelected(false)}
        onChangeText={onChangeText}
        onFocus={() => setSelected(true)}
        maxFontSizeMultiplier={maxFontSizeMultiplier}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={[styles.textInput, selected ? styles.selected : null]}
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
    borderColor: GOLD,
  },
  textInput: {
    fontSize: 18,
    backgroundColor: WHITE,
    borderRadius: 5,
    borderColor: '#C5C5C5',
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
  },
});
