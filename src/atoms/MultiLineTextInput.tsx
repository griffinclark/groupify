import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { WHITE } from '../res/styles/Colors';

interface Props {
  inputText: string;
  setText: (ev: string) => void;
  placeholder: string;
  style?: Record<string, unknown>;
  enabled?: boolean;
}

export const MultiLineTextInput: React.FC<Props> = ({ inputText, setText, placeholder, style, enabled }: Props) => {
  const [isEnabled, setIsEnabled] = useState<boolean | undefined>(true);

  useEffect(() => {
    setIsEnabled(enabled);
  }, [enabled]);

  return (
    <View>
      <TextInput
        style={[styles.textInput, style]}
        placeholder={placeholder}
        multiline={true}
        onChangeText={(text) => setText(text)}
        value={inputText}
        editable={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: WHITE,
    borderRadius: 5,
    margin: 10,
    fontSize: 16,
  },
});
