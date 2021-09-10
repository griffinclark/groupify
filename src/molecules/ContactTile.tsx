import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Contact } from '../res/dataModels';
import { AppText } from '../atoms/AtomsExports';

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

  const firstInitial = friend.name.slice(0, 1);
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={styles.bubble}>
          <AppText style={{ fontSize: 20 }}>{firstInitial}</AppText>
        </View>
        <AppText style={styles.name}>{friend.name}</AppText>
      </View>
      <TouchableOpacity style={selected ? styles.buttonSelected : styles.button} onPress={handlePress}>
        {selected && <Icon size={32} containerStyle={styles.icon} color={'white'} name="check" type="entypo" />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  name: {
    fontSize: 15,
    marginLeft: 10,
  },
  bubble: {
    width: 60,
    height: 60,
    backgroundColor: '#C4C4C4',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 50,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: '#BE8C2C',
    borderRadius: 25,
  },
  buttonSelected: {
    width: 40,
    height: 40,
    backgroundColor: '#47A9A5',
    borderRadius: 25,
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
  },
});
