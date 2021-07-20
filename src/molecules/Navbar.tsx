import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface NavbarProps {
  style?: Record<string, unknown>;
  children?: ReactNode;
}

export const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
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
    marginTop: 20,
    paddingBottom: 10,
  },
});
