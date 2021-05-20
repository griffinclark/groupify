import React from 'react';
import { StyleSheet, View } from 'react-native';

interface NavbarProps {
  style?: object;
}

export const Navbar: React.FC<NavbarProps> = (props: React.PropsWithChildren<NavbarProps>) => {
  return <View style={[styles.nav, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  nav: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
