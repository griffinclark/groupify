import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import * as Contacts from 'expo-contacts';
import { Contact } from '../res/dataModels';
import { FlatList } from 'react-native-gesture-handler';
import { DEFAULT_CONTACT_IMAGE, GREY_5 , BLACK} from '../res/styles/Colors';
import { deleteAllImportedContacts, getAllImportedContacts, storeImportedContact } from '../res/storageFunctions';
import { Button, Title, Screen } from '../atoms/AtomsExports';
import { FriendList } from '../organisms/OrganismsExports';
import { AndroidContactTile, Navbar ,ContactTile} from '../molecules/MoleculesExports';
import { RoutePropParams } from '../res/root-navigation';
import {getCurrentUser}from'../res/utilFunctions';


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

export const ImportContactDetails: React.FC<Props> = ({ navigation }: Props) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [query, setQuery] = useState<string>('');
  const [state, setState] = useState<State>(State.Empty);
  const [currentUser, setCurrentUser] = useState<User>();
  const [selected, setSelected] = useState<Contact[]>([]);

  useEffect(() => {
    setState(State.Loading);
    loadContacts();
    loadImportedContacts();
    const awaitUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };
  awaitUser();
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

  

  interface renderContactProps {
    item: Contact;
  }

  const renderContact = ({ item }: renderContactProps) => (
    <ContactTile
    friend={item}
    addUser={addSelectedContact}
    removeUser={removeSelectedContact}
    isSelected={loadImportedContacts}
  />
  );

  
  const createGreeting = () => {
    if (currentUser) {
      const firstName = currentUser.name.includes(' ')
        ? currentUser.name.substr(0, currentUser.name.indexOf(' '))
        : currentUser?.name;
      return `Welcome, ${firstName}! Let’s get started! The most important part of this app is to have friends on to invite to your shindigs.`;
    }
  };
  return (
      <Screen>
      <Title>Import Contacts</Title>
     
      <View style={styles.flatListContainer}>
     < Text style={{fontSize:20,paddingBottom:20}}>{createGreeting()}</Text>
     <View style={styles.listContainer}>
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
      <Text style={{ fontSize:20,marginBottom:240,paddingTop:20}}>From your contact list, please select all people you’d like to import into Groupify.*</Text>
      
      <Text style={{alignSelf: 'center' , paddingBottom:20}}>*You can always edit your contact list later. </Text>
    </View>

        <View style={styles.footer}>
        <Button
          title="Select Contacts"
          onPress={() => {navigation.navigate('ImportContacts')
          
          }}
        />
        </View>
        
        </Screen>
      
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingBottom:20,
  },
  contactContainer: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 26,
  },
  flatListContainer: {
    flexGrow: 1,
    flex: 1,
    padding: 10,
    paddingTop:10,
    paddingBottom:20,
  },
  friendContainer: {
    backgroundColor: GREY_5,
    borderRadius: 10,
    padding: 10,
  },
 
  footer: {
    bottom:0,
    textAlignVertical: 'center',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
});
