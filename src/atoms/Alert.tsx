import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GREY_2, RED, WHITE } from '../res/styles/Colors';
import { AppText } from './AtomsExports';

interface Props {
  status: 'error' | 'success';
  message: string;
}
export const Alert: React.FC<Props> = ({ status, message }: Props) => {
  return (
    <View style={[styles.container, styles[status]]}>
      <AppText style={styles.text}>{message}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    backgroundColor: RED,
  },
  success: {
    backgroundColor: GREY_2,
  },
  container: {
    padding: 10,
    borderRadius: 5,
    margin: 20,
  },
  text: {
    color: WHITE,
  },
});
