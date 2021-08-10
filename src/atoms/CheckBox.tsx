import React from 'react';
import { View, StyleSheet } from 'react-native';
import RNCheckBox from 'react-native-check-box';

interface Props {
  isSelected: boolean;
  onValueChange: () => void;
}

export const CheckBox: React.FC<Props> = ({ isSelected, onValueChange }: Props) => {
  return (
    <View>
      <RNCheckBox isChecked={isSelected} onClick={onValueChange} style={styles.checkbox} />
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    flex: 1,
    padding: 10,
  },
});
