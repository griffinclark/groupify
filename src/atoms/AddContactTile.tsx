/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Contact } from '../res/dataModels';
import { WHITE } from '../res/styles/Colors';
import { JOST } from '../res/styles/Fonts';
interface Props {
  isSelected: boolean;
  friend: Contact;
  addUser: (friend: Contact) => void;
  removeUser: (friend: Contact) => void;
}

export const AddContactTile = ({ isSelected, friend, addUser, removeUser }: Props) => {
  const [Selected, setSelected] = useState(false);

  const handleChange = () => {
    if (Selected) {
      setSelected(false);
      removeUser(friend);
    }

    if (!Selected) {
      setSelected(true);
      addUser(friend);
    }
  };

  // we need to check if the user is already selected previously
  useEffect(() => {
    if (isSelected) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{friend.name}</Text>
      </View>
      <TouchableOpacity
        onPress={handleChange}
        activeOpacity={0.7}
        style={[
          styles.button,
          { borderColor: !Selected ? '#31A59F' : 'transparent', backgroundColor: !Selected ? '#fff' : '#31A59F' },
        ]}
      >
        <Text style={[styles.buttonText, { color: !Selected ? '#31A59F' : WHITE }]}>
          {Selected ? 'Unfollow' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  buttonText: {
    fontSize: 13,
    fontFamily: JOST['500'],
  },
  text: {
    fontSize: 16,
    fontFamily: JOST['400'],
  },
});
