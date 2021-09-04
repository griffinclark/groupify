import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Contacts from 'expo-contacts';
import { Contact } from '../res/dataModels';
import { FlatList } from 'react-native-gesture-handler';
import { GREY_5 } from '../res/styles/Colors';
import { deleteAllImportedContacts, getAllImportedContacts, storeImportedContact } from '../res/storageFunctions';
import { Button, Title, Screen, SearchBar, TwoButtonAlert } from '../atoms/AtomsExports';
import { ContactTile } from '../molecules/MoleculesExports';
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
        contacts.sort((c1, c2) => {
          if (c1.name && c2.name) {
            return c1.name.toLowerCase() < c2.name.toLowerCase() ? -1 : 1;
          }
        });
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
    <ContactTile
      addUser={addSelectedContact}
      removeUser={removeSelectedContact}
      friend={item}
      isSelected={selectedContacts}
    />
  );

  const storeSelectedContacts = async () => {
    for (const contact of selectedContacts) {
      await storeImportedContact(contact);
    }
  };

  const contactsAlert = (): void => {
    TwoButtonAlert({
      title: ' ',
      message: 'Are you sure you don\'t want to import contacts?',
      button1Text: 'Yes',
      button2Text: 'Back',
      button1OnPress: async () => {
        navigation.navigate('Home');
        Alert.alert(
          ' ',
          'You have no Contacts. Groupify works best when you invite friends! Go to settings to import contacts',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Home');
              },
            },
          ],
        );
      },
      button2OnPress: async () => {
        navigation.navigate('ImportContacts');
      },
    });
  };

  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <View style={styles.navbar}>
            <Icon name="arrow-left" type="font-awesome" size={30} onPress={() => navigation.navigate('Home')} />
            <Title>Contacts</Title>
            <Text style={{ color: 'white' }}>blank</Text>
          </View>
          <SearchBar onInputChange={searchContacts} />
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
        </View>
        {selectedContacts.length > 0 ? (
          <View>
            <Button
              title="Save Contacts"
              onPress={async () => {
                await deleteAllImportedContacts();
                await storeSelectedContacts();
                navigation.navigate('Home');
              }}
            />
          </View>
        ) : (
          <View>
            <Button title="Skip" onPress={contactsAlert} />
          </View>
        )}
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
    marginVertical: 15,
  },
  friendContainer: {
    backgroundColor: GREY_5,
    borderRadius: 10,
    padding: 10,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
});
