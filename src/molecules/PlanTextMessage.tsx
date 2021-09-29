import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppTextInput } from '../atoms/AtomsExports';

interface Props {
  label: string;
  onChangeText: (e: string) => void;
  style?: Record<string, unknown>;
  text: string;
}

export const PlanTextMessage: React.FC<Props> = ({ label, onChangeText, style, text }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <AppTextInput
        label={label}
        inputStyle={styles.input}
        multiline={true}
        onChangeText={onChangeText}
        textStyle={styles.text}
        value={text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  input: {
    borderRadius: 10,
    marginBottom: 0,
    marginTop: 10,
    paddingTop: 21,
    padding: 21,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    marginTop: 20,
  },
});
