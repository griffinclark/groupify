import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import { WHITE } from '../res/styles/Colors';
import { AppText } from './AppText';

interface Props {
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  title: string;
}
export const NavButton: React.FC<Props> = ({ onPress, title }: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress}>
      <AppText style={styles.text}>{title}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#32A59F',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    color: WHITE,
  },
});
