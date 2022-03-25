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
import { TopNavBar } from '../molecules/TopNavBar';
import { AddContactTile } from './AddContactTile';
import { HomeNavBar } from '../molecules/HomeNavBar';
import { JOST } from '../res/styles/Fonts';

interface Props {
  navigation: {
    navigate: (ev: string) => void;
    push: (ev: string) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
}

export const ContactList = ({ navigation, route }: Props) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [addedContacts, setAddedContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const loadContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({});
        if (data.length > 0) {
          const contacts: Contact[] = data.map((contact) => ({
            id: contact.id,
            name: contact.name,
            image: contact.image,
            phoneNumber: (contact.phoneNumbers && contact.phoneNumbers[0].number) || 'No phone number found',
          }));

          contacts.sort((c1, c2): number => {
            if (c1.name && c2.name) {
              return c1.name.toLowerCase() < c2.name.toLowerCase() ? -1 : 1;
            } else {
              return 0;
            }
          });
          return contacts[0].phoneNumber && setContacts(contacts);
        }
      } else {
        console.error('Permission to contacts denied');
      }
    };
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

  const loadImportedContacts = async () => {
    // TODO can be moved inside useEffect? no, we use this particular function elsewhere
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
          return;
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
      <TopNavBar
        stickyHeader={false}
        navigation={navigation}
        displayGroupify={false}
        title={'Friends'}
        displayBackButton={false}
        displaySettings={true}
        route={route}
        targetScreen={'SelectorMenu'}
      />
      <View style={{ marginLeft: 10, marginVertical: 25 }}>
        <Text style={{ fontSize: 16, fontFamily: JOST['500'], marginVertical: 5 }}>Your Friends</Text>
        <Text style={{ fontSize: 16, color: 'gray', fontFamily: JOST['400'], lineHeight: 23.12 }}>
          You have {contacts.length} friends you can add to Groupify
        </Text>
      </View>
      <View style={{ marginHorizontal: 8 }}>
        <SearchBar style={{}} placeholder="Search For Friends On Groupify" onChangeText={searchContacts} testID={''} />
      </View>
      <FlatList
        onScrollBeginDrag={Keyboard.dismiss}
        data={filteredContacts.length > 0 ? filteredContacts : contacts}
        renderItem={renderContact}
      />
      <View style={{ height: 70 }} />

      <HomeNavBar
        route={route}
        user={route.params.currentUser}
        navigation={navigation}
        userLocation={route.params.userLocation}
      />
    </Screen>
  );
};
