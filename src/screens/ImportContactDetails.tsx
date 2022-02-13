/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Linking, Platform, Keyboard, Text } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Contact, NavigationProps } from '../res/dataModels';
import { FlatList } from 'react-native-gesture-handler';
import { WHITE } from '../res/styles/Colors';
import { deleteImportedContactFromID, getAllImportedContacts, storeImportedContact } from '../res/storageFunctions';
import { Button, Screen, SearchBar, AlertModal } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { ContactTile } from '../molecules/MoleculesExports';
import { RoutePropParams } from '../res/root-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Analytics from 'expo-firebase-analytics';
import { User } from '../models';
import { getCurrentUser } from '../res/utilFunctions';
import { TopNavBar } from '../molecules/TopNavBar';

interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
}

enum State {
  Empty,
  Loading,
  Done,
}

export const ImportContactDetails: React.FC<Props> = ({ navigation, route }: Props) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [addedContacts, setAddedContacts] = useState<Contact[]>([]);
  const [state, setState] = useState<State>(State.Empty);
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const awaitUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };
    awaitUser();
    setState(State.Loading);
    loadContacts();
    loadImportedContacts();
  }, []);

  //Everytime a contact is selected it adds it to local storage on the spot
  //Same thing when a contact is unselected
  //Much better than the previous way I had this working
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
        contacts.sort((c1, c2): any => {
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
      <TopNavBar
        stickyHeader={false}
        navigation={navigation}
        displayGroupify={true}
        displayBackButton={true}
        displaySettings={false}
        route={route}
        targetScreen={'SelectorMenu'}
      />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTextContainer}>
            <Text style={{ fontSize: 22, fontWeight: '400' }}>
              Welcome to Groupify, {currentUser?.name.split(' ')[0]}!
            </Text>
            <Text style={styles.headerText}>
              The more friends you add to groupify, the more easier it is to make plans. Add friends from your contacts
              now.
            </Text>
          </View>
          <SearchBar onChangeText={searchContacts} placeholder="Search for contacts" testID={''} />
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
        <View style={styles.planResponse}>
          <TouchableOpacity onPress={() => setOpenModal(true)}>
            <Text style={styles.skipStyle}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              navigation.navigate('Home');
            }}
            disabled={addedContacts.length === 0 ? true : false}
            style={{
              backgroundColor: addedContacts.length > 0 ? '#3F8A8D' : '#BDBDBD',
              paddingVertical: 8,
              paddingHorizontal: 25,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: addedContacts.length > 0 ? WHITE : '#5B5B5B', fontSize: 18, fontWeight: '500' }}>
              Import Contacts
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {openModal && (
        <AlertModal
          button1Text="Add Friends Now"
          button2Text="Add Friends Later"
          message2="OK. You don't have to add your friends now, but the only way to Groupify your plans is to invite the people you want to hang out with to join the app."
          onButton1Press={() => setOpenModal(false)}
          onButton2Press={() => navigation.navigate('Home')}
          message="Are you sure you don't want to add friends now? "
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
    marginHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipStyle: {
    color: '#3F8A8D',
    fontWeight: '600',
    fontSize: 22,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  headerContainer: {
    flex: 1,
    width: '100%',
  },
  headerTextContainer: {
    marginBottom: 10,
    marginTop: 8,
  },
  headerText: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: '400',
    lineHeight: 23.12,
  },
});
