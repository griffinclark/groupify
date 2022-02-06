import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { User } from '../models';
import { WHITE, TEAL } from '../res/styles/Colors';
import { PartyIcon } from '../../assets/Icons/PartyIcon';

interface Props {
  user: User;
  navigation: {
    navigate: (ev: string, {}) => void;
  };
}

export const NoPlansCard: React.FC<Props> = ({ navigation, user }: Props) => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <PartyIcon />
        <Text style={styles.text}>No Plans to see here, yet!</Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('ActivitySelector', { currentUser: user })}
        activeOpacity={0.4}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Create a Plan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
    marginTop: 2,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 22,
    fontWeight: '400',
  },
  button: {
    backgroundColor: TEAL,
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 22,
  },
});
