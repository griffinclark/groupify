/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Octicons, Ionicons, Entypo } from '@expo/vector-icons';

export interface Props {
  title?: string | undefined;
  home?: boolean;
  navigation?: {
    goBack: () => void;
  };
}
export const Header = ({ title, home, navigation }: Props) => {
  return (
    <View>
      {home ? (
        <View style={styles.homeContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Groupify</Text>
            <Octicons style={{ marginLeft: 8 }} name="megaphone" size={33} color="green" />
          </View>
          <Ionicons name="md-settings-outline" size={33} color="black" />
        </View>
      ) : (
        <View style={styles.container}>
          <Entypo onPress={() => navigation.goBack()} name="chevron-thin-left" size={28} color="black" />
          <Text style={styles.text}>{title}</Text>
          <Ionicons name="md-settings-outline" size={33} color="black" />
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
    padding: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: '500',
  },
  homeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 120,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'green',
  },
});
