import React from 'react';
import { StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { TEAL_0 } from './../res/styles/Colors';

interface Props {
  style?: Record<string, unknown>;
  children?: string;
}

export const Title: React.FC<Props> = ({ style, children }: Props) => {
  return <AppText style={[styles.title, style ? style : {}]}>{children}</AppText>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    margin: 15,
    color: TEAL_0,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
