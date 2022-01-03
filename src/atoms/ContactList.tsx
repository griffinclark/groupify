/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from 'react';
import { View, Keyboard, Text } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Contact } from '../res/dataModels';
import { FlatList } from 'react-native-gesture-handler';
import { deleteImportedContactFromID, getAllImportedContacts, storeImportedContact } from '../res/storageFunctions';
import { Screen, SearchBar } from '../atoms/AtomsExports';
import { RoutePropParams } from '../res/root-navigation';
import * as Analytics from 'expo-firebase-analytics';
import { Header } from '../atoms/Header';
import { AddContactTile } from './AddContactTile';

interface Props {
  navigation: {
    navigate: (ev: string) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
}

export const ContactList = ({ navigation }: Props) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [addedContacts, setAddedContacts] = useState<Contact[]>([]);

  useEffect(() => {
    loadContacts();
    loadImportedContacts();
  }, []);

  const addSelectedContact = async (newContact: Contact) => {
    await storeImportedContact(newContact);
    loadImportedContacts();
    await Analytics.logEvent('import_contacts', {});
  };

  const removeSelectedContact = async (newContact: Contact) => {
    await deleteImportedContactFromID(newContact.id);
    loadImportedContacts();
  };

  const loadContacts = async () => {
    // TODO can be moved inside useEffect
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({});
      if (data.length > 0) {
        // TODO type
        const contacts = data.map((contact) => ({
          id: contact.id,
          name: contact.name,
          image: contact.image,
          phoneNumber: (contact.phoneNumbers && contact.phoneNumbers[0].number) || 'No phone number found',
        }));
        // TODO no any - create a type here if you have to you're referencing type.value
        contacts.sort((c1, c2): any => {
          if (c1.name && c2.name) {
            return c1.name.toLowerCase() < c2.name.toLowerCase() ? -1 : 1;
          }
        });
        contacts[0].phoneNumber && setContacts(contacts);
      }
    }
  };

  const loadImportedContacts = async () => {
    // TODO can be moved inside useEffect
    await getAllImportedContacts().then((contacts) => {
      setAddedContacts(contacts);
      if (contacts.length > 0) {
      }
    });
  };

  const searchContacts = (text: string) => {
    const trimText = text.trim();
    setFilteredContacts(
      contacts.filter((contact) => {
        let contactLowercase = '';
        try {
          contactLowercase = contact.name.toLowerCase();
        } catch {
          console.log('error filtering a contact');
        }
        const textLowercase = trimText.toLowerCase();
        return contactLowercase.indexOf(textLowercase) > -1;
      }),
    );
  };

  interface renderContactProps {
    item: Contact;
  }

  const renderContact = ({ item }: renderContactProps) => (
    <AddContactTile
      addUser={addSelectedContact}
      removeUser={removeSelectedContact}
      friend={item}
      isSelected={addedContacts.find((contact) => contact.id === item.id) === undefined ? false : true}
    />
  );

  return (
    <Screen>
      <Header navigation={navigation} title="Friends" />
      <View style={{ marginHorizontal: 8, padding: 20 }}>
        <SearchBar onInputChange={searchContacts} />
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginVertical: 5 }}>Your Friends</Text>
        <Text style={{ fontSize: 18, color: 'gray', fontWeight: '500' }}>
          You have {contacts.length} friends on Groupify
        </Text>
      </View>
      <View>
        <FlatList
          onScrollBeginDrag={Keyboard.dismiss}
          data={filteredContacts.length > 0 ? filteredContacts : contacts}
          renderItem={renderContact}
        />
      </View>
    </Screen>
  );
};
