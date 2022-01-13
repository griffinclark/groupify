import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Contact } from '../res/dataModels';
import { AppText } from '../atoms/AppText';
import { GRAY_MEDIUM, GRAY_DARK } from '../res/styles/Colors';
import { WhiteButton } from '../atoms/AtomsExports';

interface Props {
  isSelected?: boolean;
  friend: Contact;
  addUser: (friend: Contact) => void;
  removeUser: (friend: Contact) => void;
}

export const ContactTile: React.FC<Props> = ({ friend, addUser, removeUser, isSelected = false }: Props) => {
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
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View>
          <AppText style={styles.name}>{friend.name}</AppText>
        </View>
      </View>
      <TouchableOpacity onPress={handlePress} testID="ContactTile">
        <WhiteButton
          onPress={handlePress}
          text={selected ? 'Invited' : 'Invite'}
          style={selected ? { borderColor: GRAY_DARK } : {}}
          textStyles={selected ? { color: GRAY_DARK } : {}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    // height: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: GRAY_MEDIUM,
  },
  name: {
    fontSize: 16,
    flexWrap: 'wrap',
  },
  nameContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
});
