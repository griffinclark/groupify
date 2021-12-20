import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TEAL } from '../res/styles/Colors';

interface Props {
  onPress: () => void;
  text: string;
  style?: Record<string, unknown> | Array<Record<string, unknown>>;
  textStyles?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const WhiteButton: React.FC<Props> = ({ onPress, text, style, textStyles }: Props) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text maxFontSizeMultiplier={1.2} style={[styles.text, textStyles]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 182,
    height: 49,
    borderWidth: 2,
    borderColor: TEAL,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    color: TEAL,
  },
});

// FIXME this has to merge with button
