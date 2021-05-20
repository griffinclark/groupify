import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { DK_PURPLE } from '../res/styles/Colors';

interface TitleProps {
  style?: Record<string, unknown>;
}

export const Title: React.FC<TitleProps> = (props: React.PropsWithChildren<TitleProps>) => {
  return <Text style={[styles.title, props.style]}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    margin: 15,
    // fontSize: 45,
    // margin: 40,
    color: DK_PURPLE,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
