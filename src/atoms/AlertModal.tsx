import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { GREY_2, RED, WHITE } from '../res/styles/Colors';

interface Props {
  status: 'error' | 'success';
  message: string;
}
export const Alert: React.FC<Props> = ({ status, message }: Props) => {
  return (
    <View style={[styles.container, styles[status]]}>
      <Text style={styles.text}>{message}</Text>
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
