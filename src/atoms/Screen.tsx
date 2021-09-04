import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

interface Props {
  style?: Record<string, unknown>;
  children: ReactNode;
}

export const Screen: React.FC<Props> = ({ style, children }: Props) => {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    paddingTop: 15,
  },
});
