import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import * as Contacts from 'expo-contacts';
import { Contact } from '../res/dataModels';
import { FlatList } from 'react-native-gesture-handler';
import { DEFAULT_CONTACT_IMAGE, GREY_5 } from '../res/styles/Colors';
import { deleteAllImportedContacts, getAllImportedContacts, storeImportedContact } from '../res/storageFunctions';
import { Button, Title, NavButton, Screen } from '../atoms/AtomsExports';
import { FriendList } from '../organisms/OrganismsExports';
import { AndroidContactTile, Navbar } from '../molecules/MoleculesExports';
import { RootStackParamList, RoutePropParams } from '../res/root-navigation';

interface Props {
  navigation: RootStackParamList;
  route: RoutePropParams;
}

enum State {
  Empty,
  Loading,
  Done,
}

export const ContactsImport: React.FC<Props> = ({ navigation }: Props) => {
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

  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({});
      const contacts = data.map((contact) => ({
        id: contact.id,
        name: contact.name,
        image: contact.image,
        phoneNumber: contact.phoneNumbers ? contact.phoneNumbers[0].number : null,
      }));
      contacts.sort((c1, c2) => (c1.name < c2.name ? -1 : 1));
      setContacts(contacts);
    }
    setState(State.Done);
  };

  const loadImportedContacts = async () => {
    const importedContacts = await getAllImportedContacts();
    setSelectedContacts(importedContacts);
  };

  const searchContacts = (text: string) => {
    setQuery(text);
    setFilteredContacts(
      contacts.filter((contact) => {
        let contactLowercase = '';
        try {
          contactLowercase = contact.name.toLowerCase();
        } catch {
          console.log('error filtering a contact');
        }
        const textLowercase = text.toLowerCase();
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
        <NavButton onPress={() => navigation.navigate('Home')} title="Back" />
      </Navbar>
      <Title>Edit Contact List</Title>
      <SearchBar placeholder="Search for contacts" onChangeText={searchContacts} value={query} lightTheme={true} />
      <View style={styles.flatListContainer}>
        {state === State.Loading ? (
          <View>
            <ActivityIndicator size="large" color="#bad555" />
          </View>
        ) : null}
        <FlatList
          data={filteredContacts}
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
