import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Contact } from '../res/dataModels';
import { AppText } from '../atoms/AppText';
import { GRAY_MEDIUM } from '../res/styles/Colors';
import { Checkbox } from 'react-native-paper';

interface Props {
  isSelected?: boolean;
  friend: Contact;
  lastInList?: boolean;
  addUser: (friend: Contact) => void;
  removeUser: (friend: Contact) => void;
}

export const ContactTile: React.FC<Props> = ({
  friend,
  addUser,
  removeUser,
  isSelected = false,
  lastInList = false,
}: Props) => {
  const [selected, setSelected] = useState(false);

  const handlePress = () => {
    if (!selected) {
      setSelected(true);
      addUser(friend);
    }
    if (selected) {
      setSelected(false);
      removeUser(friend);
    }
  };

  useEffect(() => {
    if (isSelected) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, []);

  return (
    <View style={[styles.container, lastInList ? styles.lastItem : null]}>
      <View style={styles.nameContainer}>
        <View style={{ marginRight: 5 }}>
          <Checkbox.Android
            status={selected ? 'checked' : 'unchecked'}
            onPress={handlePress}
            color="#3F8A8D"
            uncheckedColor="#3F8A8D"
          />
        </View>
        <View>
          <AppText style={styles.name}>{friend.name}</AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: GRAY_MEDIUM,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  name: {
    fontSize: 18,
    flexWrap: 'wrap',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
