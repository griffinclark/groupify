import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { DK_PURPLE } from '../res/styles/Colors';

interface TitleProps {
  style?: Record<string, unknown>;
  children?: Record<string, unknown>;
}

export const Title: React.FC<TitleProps> = (props: TitleProps) => {
  return <Text style={[styles.title, props.style]}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    margin: 15,
    color: DK_PURPLE,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
