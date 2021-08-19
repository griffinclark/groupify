import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import * as Contacts from 'expo-contacts';
import { Contact } from '../res/dataModels';
import { FlatList } from 'react-native-gesture-handler';
import { DEFAULT_CONTACT_IMAGE, GREY_5 } from '../res/styles/Colors';
import { deleteAllImportedContacts, getAllImportedContacts, storeImportedContact } from '../res/storageFunctions';
import { Button, Title, Screen } from '../atoms/AtomsExports';
import { FriendList } from '../organisms/OrganismsExports';
import { AndroidContactTile, Navbar } from '../molecules/MoleculesExports';
import { RoutePropParams } from '../res/root-navigation';

interface Props {
  navigation: {
    navigate: (ev: string) => void;
  };
  route: RoutePropParams;
}

enum State {
  Empty,
  Loading,
  Done,
}

export const ImportContacts: React.FC<Props> = ({ navigation }: Props) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [query, setQuery] = useState<string>('');
  const [state, setState] = useState<State>(State.Empty);

  useEffect(() => {
    setState(State.Loading);
    loadContacts();
    loadImportedContacts();
  }, []);

  const addSelectedContact = (contact: Contact) => {
    setSelectedContacts((selectedContacts) => [...selectedContacts, contact]);
  };

  const removeSelectedContact = (contact: Contact) => {
    const index = selectedContacts.findIndex((c) => c.id == contact.id);
    selectedContacts.splice(index, 1);
    setSelectedContacts(selectedContacts.slice());
  };

  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({});
      if (data.length > 0) {
        const contacts = data.map((contact) => ({
          id: contact.id,
          name: contact.name,
          image: contact.image,
          phoneNumber: (contact.phoneNumbers && contact.phoneNumbers[0].number) || 'No phone number found',
        }));
        contacts.sort((c1, c2) => (c1.name.toLowerCase() < c2.name.toLowerCase() ? -1 : 1));
        contacts[0].phoneNumber && setContacts(contacts);
      }
    }
    setState(State.Done);
  };

  const loadImportedContacts = async () => {
    const importedContacts = await getAllImportedContacts();
    setSelectedContacts(importedContacts);
  };

  const searchContacts = (text: string) => {
    const trimText = text.trim();
    setQuery(text);
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
    <AndroidContactTile
      contact={item}
      firstName={item.name}
      imageURL={item.image ? item.image.uri : DEFAULT_CONTACT_IMAGE}
      addUser={addSelectedContact}
      removeUser={removeSelectedContact}
      isChecked={isContactSelected(item.id)}
    />
  );

  const storeSelectedContacts = async () => {
    for (const contact of selectedContacts) {
      await storeImportedContact(contact);
    }
  };

  const isContactSelected = (id: string) => {
    for (const contact of selectedContacts) {
      if (contact.id === id) {
        return true;
      }
    }
    return false;
  };

  return (
    <Screen>
      <Navbar>
        <Icon name="arrow-left" type="font-awesome" size={30} onPress={() => navigation.navigate('Home')} />
      </Navbar>
      <Title>Edit Contact List</Title>
      <SearchBar
        lightTheme="true"
        placeholder="Search for contacts"
        onChangeText={searchContacts}
        value={query}
        platform="default"
      />
      <View style={styles.flatListContainer}>
        {state === State.Loading ? (
          <View>
            <ActivityIndicator size="large" color="#bad555" />
          </View>
        ) : null}
        <FlatList
          data={filteredContacts.length > 0 ? filteredContacts : contacts}
          renderItem={renderContact}
          ListEmptyComponent={() => (
            <View style={styles.listContainer}>
              <Text>No Contacts Found</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.footer}>
        <FriendList style={styles.friendContainer} title="Contact List" friends={selectedContacts} />
        <Button
          title="Save Contacts"
          onPress={async () => {
            await deleteAllImportedContacts();
            await storeSelectedContacts();
            navigation.navigate('Home');
          }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  contactContainer: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 26,
  },
  flatListContainer: {
    flexGrow: 1,
    flex: 1,
  },
  friendContainer: {
    backgroundColor: GREY_5,
    borderRadius: 10,
    padding: 10,
  },
  footer: {
    flex: 0.5,
    height: '25%',
    display: 'flex',
    justifyContent: 'space-between',
  },
});
