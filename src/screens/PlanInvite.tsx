import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RoutePropParams } from '../res/root-navigation';
import { Contact } from '../res/dataModels';
import { getAllImportedContacts } from '../res/storageFunctions';
import { Alert, AppText, BottomButton, Button, Navbar, Screen, SearchBar } from '../atoms/AtomsExports';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../models';
//import { Icon } from 'react-native-elements/dist/icons/Icon';
import { ContactContainer, FriendContainer } from '../organisms/OrganismsExports';
import { TEAL } from '../res/styles/Colors';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
}

export const PlanInvite: React.FC<Props> = ({ navigation, route }: Props) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [menuItemSelected, setMenuItemSelected] = useState('contacts');
  const [eventObject, setEventObject] = useState({
    date: '',
    description: '',
    imageURL: '',
    location: '',
    time: '',
    title: '',
    uuid: '',
    placeId: '',
  });
  const [friends, setFriends] = useState<User[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<User[]>([]);
  useEffect(() => {
    loadContacts();
    setEventObject(route.params.data.eventData);
    getFriends();
  }, []);

  console.log(eventObject);

  const getFriends = async () => {
    const user = await DataStore.query(User, (user) => user.id('contains', route.params.currentUser.id));
    const userFriends = user[0].friends;
    const friendList = [];
    if (userFriends) {
      for (let i = 0; i < userFriends.length; i++) {
        const friendId = userFriends[i];
        if (friendId) {
          const friend = await DataStore.query(User, friendId);
          friendList.push(friend);
        }
      }
    }
    if (friendList) {
      setFriends(friendList);
    }
  };

  const loadContacts = async () => {
    const importedContacts = await getAllImportedContacts();
    setContacts(importedContacts);
    setFilteredContacts(importedContacts);
  };

  const searchFriends = (text: string) => {
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

  const sendContactMessage = async () => {
    const event = route.params.data.eventData;
    navigation.navigate('SendMessage', {
      currentUser: route.params.currentUser,
      data: {
        eventData: {
          uuid: event.uuid,
          title: event.title,
          date: event.date,
          time: event.time,
          location: event.location,
          description: event.description,
          imageURL: event.imageURL,
          placeId: event.placeId,
          friends: selectedFriends,
          contacts: selectedContacts,
        },
      },
    });
  };

  const menuSelection = (item: string) => {
    setMenuItemSelected(item);
  };

  return (
    <Screen>
      <View style={styles.screen}>
        <Navbar location={'PlanCreate'} navigation={navigation} title={'Invite Friends'} />

        <View style={styles.title}>
          <AppText style={styles.titleText}>Who do you want to invite to {eventObject.title}</AppText>
        </View>

        <View style={styles.friendContainer}>
          <View style={styles.menu}>
            {/* <View style={menuItemSelected === 'friends' && styles.itemSelectedContainer}>
            <Text
              style={[
                menuItemSelected === 'friends' ? styles.menuItemSelected : styles.menuItemNotSelected,
                styles.menuItem,
              ]}
              onPress={() => menuSelection('friends')}
            >
              FRIENDS
            </Text>
          </View> */}
            <View
              style={[
                menuItemSelected === 'contacts'
                  ? styles.menuItemSelectedContainer
                  : styles.menuItemNotSelectedContainer,
                styles.menuItemContainer,
              ]}
            >
              <AppText
                style={[
                  menuItemSelected === 'contacts' ? styles.menuItemSelected : styles.menuItemNotSelected,
                  styles.menuItem,
                ]}
                onPress={() => menuSelection('contacts')}
              >
                CONTACTS
              </AppText>
            </View>
            <View style={[styles.menuItemNotSelectedContainer, styles.menuItemContainer]} />
          </View>

          <View style={{ flex: 1 }}>
            {menuItemSelected === 'friends' && (
              <View style={{ flex: 1, justifyContent: 'space-between' }}>
                {friends.length > 0 ? (
                  <View style={styles.friendBubbleContainer}>
                    <FriendContainer friends={friends} adjustSelectedFriends={setSelectedFriends} />
                  </View>
                ) : null}
                <View style={{ marginBottom: 27, alignSelf: 'center' }}>
                  <Button
                    title={selectedFriends.length === 0 ? 'Skip' : 'Next'}
                    onPress={() => setMenuItemSelected('contacts')}
                  />
                </View>
              </View>
            )}

            {menuItemSelected === 'contacts' && (
              <View style={styles.contactsContainer}>
                <View style={styles.searchbar}>
                  <SearchBar onInputChange={searchFriends} placeholder="Search for Friends to Invite" />
                  <ContactContainer contacts={filteredContacts} adjustSelectedContacts={setSelectedContacts} />
                </View>
                {selectedContacts.length == 0 && <Alert status={'error'} message={'Select a friend to continue'} />}
                {/* <TouchableOpacity onPress={sendContactMessage} disabled={selectedContacts.length === 0 ? true : false}>
                {selectedContacts.length > 0 ? (
                  <AppText style={[styles.navText, { backgroundColor: TEAL, color: WHITE }]}>Next</AppText>
                ) : (
                  <AppText style={[styles.navText, { backgroundColor: GREY_4, color: GREY_3 }]}>Next</AppText>
                )}
              </TouchableOpacity> */}
              </View>
            )}
          </View>
        </View>

        <BottomButton
          disabled={selectedContacts.length == 0 ? true : false}
          title="Preview Plan"
          onPress={sendContactMessage}
        />
      </View>
    </Screen>
  );
};
//
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 27,
    marginHorizontal: 63,
  },
  titleText: {
    fontSize: 20,
    lineHeight: 23,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  friendContainer: {
    flex: 3,
  },
  menu: {
    flexDirection: 'row',
    borderColor: '#8B8B8B',
    marginTop: 30,
  },
  menuItemContainer: {
    alignItems: 'center',
    borderBottomWidth: 3,
    paddingBottom: 13,
    width: '50%',
  },
  menuItemSelectedContainer: {
    borderBottomColor: TEAL,
  },
  menuItemNotSelectedContainer: {
    borderBottomColor: '#E5E5E5',
  },
  menuItem: {
    fontSize: 16,
    fontWeight: '700',
  },
  menuItemSelected: {
    color: TEAL,
  },
  menuItemNotSelected: {
    color: '#8B8B8B',
  },
  body: {
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  searchbar: {
    flex: 1,
    marginTop: 30,
  },
  friendBubbleContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  contactsContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
});
