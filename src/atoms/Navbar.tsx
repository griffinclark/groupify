import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

import { AppText } from './AppText';
import { BackChevronIcon } from '../../assets/Icons/BackChevron';
import { TEAL } from '../res/styles/Colors';

interface Props {
  data?: Record<string, unknown>;
  location: string;
  navigation: {
    navigate: (ev: string, {}) => void;
  };
  title: string;
}

export const Navbar: React.FC<Props> = ({ data = {}, location, navigation, title }: Props) => {
  return (
    <View style={styles.navbar}>
      <BackChevronIcon
        onPress={() => {
          navigation.navigate(location, data);
        }}
      />
      <AppText style={styles.title}>{title}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: TEAL,
    // textAlign: 'center',
    fontWeight: '400',
    flex: 1,
    marginLeft: 18,
  },
  navbar: {
    flexDirection: 'row',
    marginHorizontal: 27,
    marginBottom: 10,
    alignItems: 'center',
    top: 5,
  },
});
