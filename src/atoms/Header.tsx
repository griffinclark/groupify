/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { GroupifyLogo } from '../../assets/Icons/GroupifyLogo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppText } from './AppText';
export interface Props {
  title?: string | undefined;
  home?: boolean;
  // TODO why is navigation optional?
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
}
export const Header = ({ title, home, navigation }: Props) => {
  return (
    <View>
      {home ? (
        <View style={styles.homeContainer}>
          <View style={[styles.titleContainer, { marginLeft: 130 }]}>
            <GroupifyLogo />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', {})}>
            <Ionicons
              style={{ alignSelf: 'flex-end', marginHorizontal: 10 }}
              name="md-settings-outline"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Entypo
            style={{ paddingLeft: 15 }}
            onPress={() => navigation.goBack()}
            name="chevron-thin-left"
            size={24}
            color="black"
          />
          <View style={[styles.titleContainer, { marginRight: 135 }]}>
            {title ? <AppText>{title}</AppText> : <GroupifyLogo />}
          </View>
          {/* <Ionicons name="md-settings-outline" size={30} color="black" /> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    height: 45,
    marginBottom: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: '500',
  },
  homeContainer: {
    backgroundColor: '#fff',
    padding: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 45,
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  titleContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'green',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
