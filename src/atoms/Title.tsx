import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface Props {
  style?: Record<string, unknown>;
  children?: string;
}

export const Title: React.FC<Props> = (props: Props) => {
  return <Text style={[styles.title, props.style]}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    margin: 15,
    color: '#32A59F',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
