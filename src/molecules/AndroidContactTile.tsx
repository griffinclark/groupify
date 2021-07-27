import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CircularImageDisplay, CheckBox } from '../atoms/AtomsExports';
import { StyleSheet } from 'react-native';
import { TEST_IMAGE_URL, GRAY_DARK } from '../res/styles/Colors';
import { Contact } from '../res/dataModels';
import { User } from '../models';

interface Props {
  contact?: Contact | User;
  firstName?: string;
  lastName?: string;
  imageURL?: string;
  addUser: (contact: Contact | User) => void;
  removeUser: (contact: Contact | User) => void;
  isChecked?: boolean;
}
export const AndroidContactTile: React.FC<Props> = ({
  contact,
  firstName,
  imageURL,
  addUser,
  removeUser,
  isChecked = false,
}: Props) => {
  const [checked, setChecked] = useState(isChecked);

  const onPress = () => {
    if (!checked && contact) {
      setChecked(true);
      addUser(contact);
    } else if (contact) {
      setChecked(false);
      removeUser(contact);
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rootContainer}>
        <View style={styles.profileImageContainer}>
          {imageURL ? <CircularImageDisplay imageURI={imageURL} /> : <CircularImageDisplay imageURI={TEST_IMAGE_URL} />}
        </View>
        <View>
          <Text style={checked ? styles.nameSelected : styles.nameNotSelected}> {firstName} </Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox isSelected={checked} onValueChange={onPress} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    margin: 5,
  },
  profileImageContainer: {
    display: 'flex',
    height: 30,
    width: 30,
    position: 'absolute',
    left: 10,
  },
  checkboxContainer: {
    position: 'absolute',
    right: 10,
  },
  nameSelected: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'mediumpurple',
  },
  nameNotSelected: {
    fontWeight: 'bold',
    fontSize: 20,
    color: GRAY_DARK,
  },
});
