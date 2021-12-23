import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Linking, Platform, Keyboard } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Contact } from '../res/dataModels';
import { FlatList } from 'react-native-gesture-handler';
import { WHITE, TEAL_0 } from '../res/styles/Colors';
import { deleteImportedContactFromID, getAllImportedContacts, storeImportedContact } from '../res/storageFunctions';
import { Button, Screen, SearchBar, AlertModal } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { ContactTile } from '../molecules/MoleculesExports';
import { RoutePropParams } from '../res/root-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BackChevronIcon } from '../../assets/Icons/BackChevron';
import * as Analytics from 'expo-firebase-analytics';
import { copy } from '../res/groupifyCopy';

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

export const ImportContacts: React.FC<Props> = ({ navigation, route }: Props) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [addedContacts, setAddedContacts] = useState<Contact[]>([]);
  const [currentSessionChanges, setCurrentSessionChanges] = useState(false);
  const [state, setState] = useState<State>(State.Empty);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setState(State.Loading);
    loadContacts();
    loadImportedContacts();
  }, []);

  const addSelectedContact = async (newContact: Contact) => {
    await storeImportedContact(newContact);
    loadImportedContacts();
    await Analytics.logEvent('import_contacts', {});
    setCurrentSessionChanges(true);
  };

  const removeSelectedContact = async (newContact: Contact) => {
    await deleteImportedContactFromID(newContact.id);
    loadImportedContacts();
    setCurrentSessionChanges(true);
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
        contacts.sort((contact1, contact2): number => {
          if (contact1.name && contact2.name) {
            return contact1.name.toLowerCase() < contact2.name.toLowerCase() ? -1 : 1;
          } else return 0;
        });
        contacts[0].phoneNumber && setContacts(contacts);
      }
    }
    setState(State.Done);
  };

  const loadImportedContacts = async () => {
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
    <ContactTile
      addUser={addSelectedContact}
      removeUser={removeSelectedContact}
      friend={item}
      isSelected={addedContacts.find((contact) => contact.id === item.id) === undefined ? false : true}
    />
  );

  return (
    <Screen style={{ backgroundColor: WHITE }}>
      <View style={{ flex: 1, paddingHorizontal: 20, justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <View style={styles.navbar}>
            <BackChevronIcon onPress={() => navigation.navigate(route.params.last)} />
            <AppText style={{ fontWeight: '300', fontSize: 30, color: TEAL_0, marginLeft: 15 }}>
              {copy.selectContactsTitle}
            </AppText>
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
                    <AppText style={{ fontSize: 20, textAlign: 'center' }}>{copy.askForContactsPrompt}</AppText>
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
        <View style={styles.planResponse}>
          <TouchableOpacity onPress={() => setOpenModal(true)}>
            <AppText style={styles.skipStyle}>{copy.skipSelectContactsButton}</AppText>
          </TouchableOpacity>
          <Button
            buttonStyle={{ width: 210 }}
            title={copy.importContactsButton}
            onPress={async () => {
              navigation.navigate('Home');
            }}
            disabled={currentSessionChanges ? false : true}
          />
        </View>
      </View>
      {openModal && (
        <AlertModal
          button1Text="Yes"
          button2Text="Close"
          message2={copy.noContactsImported}
          onButton1Press={() => navigation.navigate('Home')}
          onButton2Press={() => setOpenModal(false)}
          message={copy.confirmNoContactsImport}
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
    marginHorizontal: 60,
  },
  flatListContainer: {
    flexGrow: 1,
    flex: 1,
    marginVertical: 15,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  planResponse: {
    marginHorizontal: '5%',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipStyle: {
    color: TEAL_0,
    fontWeight: '900',
    fontSize: 20,
  },
});
