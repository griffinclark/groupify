import React from 'react';
import { View, StyleSheet } from 'react-native';

interface HomeNavBarProps {
  style?: Record<string, unknown>;
}

export const HomeNavBar: React.FC<HomeNavBarProps> = (props: HomeNavBarProps) => {
  return (
    <View style={[styles.nav, props.style]}>
      
    </View>
    );
};

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    color: 'yellow',
    // paddingHorizontal: 10,
    // marginTop: 20,
    // paddingBottom: 10,
    // marginTop: 20,
  },
});
