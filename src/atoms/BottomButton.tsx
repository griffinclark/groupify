import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GREY_4, TEAL, WHITE } from '../res/styles/Colors';
import { AppText } from './AppText';

interface Props {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}

export const BottomButton: React.FC<Props> = ({ onPress, title, disabled = false }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.button, disabled ? styles.disabled : '']}>
      <AppText style={styles.text}>{title}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: TEAL,
    height: 55,
    justifyContent: 'center',
    width: '100%',
  },
  disabled: {
    backgroundColor: GREY_4,
  },
  text: {
    color: WHITE,
    fontSize: 20,
    fontWeight: '700',
  },
});
