import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ContactTile } from '../molecules/ContactTile';
import { Contact } from '../res/dataModels';

interface Props {
  contacts: Contact[];
  adjustSelectedContacts: (friends: Contact[]) => void;
}

export const ContactContainer: React.FC<Props> = ({ contacts, adjustSelectedContacts }: Props) => {
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);

  useEffect(() => {
    adjustSelectedContacts(selectedContacts);
  }, [selectedContacts]);

  const addSelectedContacts = (contact: Contact) => {
    setSelectedContacts((selectedContacts) => [...selectedContacts, contact]);
  };

  const removeSelectedContact = (contact: Contact) => {
    let index = 0;
    for (let i = 0; i < selectedContacts.length; i++) {
      if (selectedContacts[i].id === contact.id) {
        index = i;
        break;
      }
    }
    selectedContacts.splice(index, 1);
    setSelectedContacts(selectedContacts.slice(0));
  };

  const renderFriend = () => {
    const contactList = [];
    for (let i = 0; i < contacts.length; i++) {
      const item = contacts[i];
      contactList.push(
        <ContactTile key={item.id} friend={item} addUser={addSelectedContacts} removeUser={removeSelectedContact} />,
      );
    }
    return <View style={styles.friendsList}>{contactList}</View>;
  };
  return <ScrollView style={styles.container}>{renderFriend()}</ScrollView>;
};

const styles = StyleSheet.create({
  friendsList: {
    display: 'flex',
    flex: 1,
    marginTop: 20,
  },
  container: {
    overflow: 'scroll',
  },
});
