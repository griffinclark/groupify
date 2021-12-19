import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RED, TEAL, WHITE } from '../res/styles/Colors';
import { AppText } from './AppText';

// TODO Error buttons need to have a (x) on them

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
    backgroundColor: TEAL,
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
