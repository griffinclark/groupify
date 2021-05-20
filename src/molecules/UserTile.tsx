import React, { useState } from 'react';
import { globalStyles } from '../res/styles/GlobalStyles';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { POST_SPACING } from '../res/styles/Colors';
import { CheckBox, CircularImageDisplay } from '../atoms/AtomsExports';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface UserTileProps {
  username: string;
  imageURL: string;
  addUser?: (username: string) => void; // if there's a list of users, add the user by username when the checkbox is checked
  removeUser?: (username: string) => void;
  createEvent?: boolean;
}

export const UserTile: React.FC<UserTileProps> = ({
  username,
  imageURL,
  addUser,
  removeUser,
  createEvent,
}: UserTileProps) => {
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.rootContainer}>
      <View style={styles.profileImageContainer}>
        <CircularImageDisplay imageURI={imageURL} />
      </View>
      <View>
        <Text style={globalStyles.title}> {username} </Text>
      </View>
      {addUser && removeUser && (
        <View style={styles.checkboxContainer}>
          <CheckBox
            isSelected={checked}
            onValueChange={() => {
              setChecked(!checked);
              if (checked == true) {
                addUser(username);
                console.log('added');
              } else {
                removeUser(username); // TODO fix
                console.log('removed');
              }
            }}
          />
        </View>
      )}
      {createEvent && (
        <TouchableOpacity
          style={styles.createEventButton}
          onPress={() => {
            console.log('Event!');
          }}
        >
          <Text>Create Event</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    height: 75,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: TEST_HIGH_CONTRAST,
    alignItems: 'center',
    marginTop: POST_SPACING,
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
  },
  profileImageContainer: {
    display: 'flex',
    height: 50,
    width: 50,
    // This isn't the best way to get the image where we need it, but...
    // position: "absolute",
    // left: 10,
  },
  checkboxContainer: {
    position: 'absolute',
    right: 10,
  },
  createEventButton: {
    alignSelf: 'flex-end',
  },
});
