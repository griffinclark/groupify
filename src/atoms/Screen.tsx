import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WHITE } from '../res/styles/Colors';

interface ScreenProps {
  style?: Record<string, unknown>;
}

export const Screen: React.FC<ScreenProps> = (props: React.PropsWithChildren<ScreenProps>) => {
  return <SafeAreaView style={[styles.screen, props.style]}>{props.children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    height: '100%',
    width: '100%',
    backgroundColor: WHITE,
    flexDirection: 'column',
    padding: 0,
  },
});
