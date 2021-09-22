import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';

import { AppText } from './AppText';
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
      <Icon
        name="chevron-left"
        type="font-awesome"
        size={30}
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
    textAlign: 'center',
    fontWeight: '400',
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    marginHorizontal: 27,
    marginBottom: 10,
    alignItems: 'center',
    top: 10,
  },
});
