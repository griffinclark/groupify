import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
}

export const Navbar: React.FC = (props: React.PropsWithChildren<Props>) => {
  return <View style={styles.nav}>{props.children}</View>;
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
