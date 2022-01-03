import { FileParseCallback } from '@babel/core';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { User } from '../models';
import { AppText } from './AppText';

interface Props {
  friend: User;
  addUser: (friend: User) => void;
  removeUser: (friend: User) => void;
  selectedFriends: User[];
  isContact: Boolean
}

export const FriendButton: React.FC<Props> = ({ friend, addUser, removeUser, selectedFriends, isContact }: Props) => {
  const [selected, setSelected] = useState(false);
  const handlePress = () => {
    setSelected(!selected);
  };

  useEffect(() => {
    selectedFriends.map((selected) => {
      if (selected.name === friend.name) {
        setSelected(true);
      }
    });
  }, []);

  useEffect(() => {
    selected && addUser(friend);
    !selected && removeUser(friend);
  }, [selected]);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <AppText>{friend.name}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 70,
    margin: 15,
  },
  sphere: {
    backgroundColor: '#BE8C2C',
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  sphereSelected: {
    backgroundColor: '#32A59F',
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  firstInitial: {
    textAlign: 'center',
    width: 70,
    height: 70,
    paddingVertical: 17,
    fontSize: 30,
    fontWeight: '700',
  },
  firstName: {
    marginTop: 5,
    textAlign: 'center',
  },
});
