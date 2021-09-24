import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Linking, Platform, Keyboard } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Contact } from '../res/dataModels';
import { FlatList } from 'react-native-gesture-handler';
import { WHITE, GREY_5, TEAL } from '../res/styles/Colors';
import {
  deleteAllImportedContacts,
  deleteImportedContactFromID,
  getAllImportedContacts,
  storeImportedContact,
} from '../res/storageFunctions';
import { Button, Title, Screen, SearchBar, AlertModal } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { ContactTile } from '../molecules/MoleculesExports';
import { RoutePropParams } from '../res/root-navigation';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  navigation: {
    navigate: (ev: string) => void;
    goBack: () => void;
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
  const [addedContacts, setAddedContacts] = useState<Contact[]>([]);
  const [removedContacts, setRemovedContacts] = useState<Contact[]>([]);
  const [state, setState] = useState<State>(State.Empty);
  const [openModal, setOpenModal] = useState(false);
  const [showRespondOptions, setShowRespondOptions] = useState(false);

  useEffect(() => {
    setState(State.Loading);
    loadContacts();
    loadImportedContacts();
  }, []);

  const addSelectedContact = (newContact: Contact) => {
    const id = addedContacts.find((contact) => contact.id === newContact.id);
    if (id) {
      return;
    }
    setAddedContacts((addedContacts) => [...addedContacts, newContact]);
  };

  const removeSelectedContact = (newContact: Contact) => {
    setRemovedContacts((removedContacts) => [...removedContacts, newContact]);
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
    await getAllImportedContacts().then((contacts) => {
      setAddedContacts(contacts);
      setShowRespondOptions(true);
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
    <ContactTile
      addUser={addSelectedContact}
      removeUser={removeSelectedContact}
      friend={item}
      isSelected={addedContacts.find((contact) => contact.id === item.id)}
    />
  );

  const storeSelectedContacts = async () => {
    console.log(addedContacts, 'removed', removedContacts);
    for (const contact of addedContacts) {
      await storeImportedContact(contact);
    }
    for (const contact of removedContacts) {
      await deleteImportedContactFromID(contact.id);
    }
  };

  return (
    <Screen style={{ backgroundColor: WHITE }}>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <View style={styles.navbar}>
            <AntDesign name="left" type="font-awesome" size={30} onPress={() => navigation.goBack()} />
            <Title>Contacts</Title>
            <AppText style={{ color: 'white' }}>blank</AppText>
          </View>
          <SearchBar onInputChange={searchContacts} />
          <View style={styles.flatListContainer}>
            <FlatList
              onScrollBeginDrag={Keyboard.dismiss}
              data={filteredContacts.length > 0 ? filteredContacts : contacts}
              renderItem={renderContact}
              ListEmptyComponent={() =>
                state === State.Loading ? (
                  <View style={{ marginTop: '60%' }}>
                    <ActivityIndicator size="large" color="#bad555" />
                  </View>
                ) : (
                  <View style={styles.listContainer}>
                    <AppText style={{ fontSize: 20, textAlign: 'center' }}>
                      Add friends from your contact list to make plans!
                    </AppText>
                    <Button
                      onPress={() => {
                        if (Platform.OS === 'ios') {
                          Linking.openURL('app-settings:');
                        }
                      }}
                      title={'Allow Access'}
                    />
                  </View>
                )
              }
            />
          </View>
        </View>
        {showRespondOptions ? (
          <View style={styles.planResponse}>
            <TouchableOpacity onPress={() => setOpenModal(true)}>
              <AppText style={styles.skipStyle}>Skip</AppText>
            </TouchableOpacity>
            {addedContacts.length > 0 ? (
              <Button
                title={'Import Contacts'}
                onPress={async () => {
                  await deleteAllImportedContacts();
                  await storeSelectedContacts();
                  navigation.navigate('Home');
                }}
                disabled={addedContacts.length < 0}
              />
            ) : (
              <Button
                title={'Import Contacts'}
                onPress={async () => {
                  await deleteAllImportedContacts();
                  await storeSelectedContacts();
                  navigation.navigate('Home');
                }}
                disabled={true}
              />
            )}
          </View>
        ) : (
          <View></View>
        )}
        {/*
        {addedContacts.length > 0 ? (
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
            <Button title="Skip" onPress={() => setOpenModal(true)} />
          </View>
        )}*/}
      </View>
      {openModal && (
        <AlertModal
          onConfirm={() => navigation.navigate('Home')}
          onReject={() => setOpenModal(false)}
          message="Are you sure you don't want to import contacts? You must have contacts to make plans with, or to find plans being created. You can always edit your contact list later "
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
    marginHorizontal: 80,
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
  planResponse: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
  },
  skipStyle: {
    paddingHorizontal: 15,
    marginHorizontal: 50,
    color: TEAL,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
