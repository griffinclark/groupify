import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, StyleSheet, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import { LT_PURPLE, WHITE } from 'res/styles/Colors';

interface NavProps {
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  title: string;
}
export const NavButton: React.FC<NavProps> = ({ onPress, title }: NavProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: LT_PURPLE,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    color: WHITE,
  },
});
