import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, FlatList } from 'react-native';
import { RoutePropParams } from '../res/root-navigation';
import { Contact } from '../res/dataModels';
import { getAllImportedContacts } from '../res/storageFunctions';
import { ContactTile } from '../molecules/MoleculesExports';
import { Button, FriendBubble, SearchBar } from '../atoms/AtomsExports';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../models';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
  route: RoutePropParams;
}

export const SelectFriends: React.FC<Props> = ({ navigation, route }: Props) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [menuItemSelected, setMenuItemSelected] = useState('friends');
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

  const getFriends = async () => {
    const friendList = [];
    if (route.params.currentUser.friends) {
      for (let i = 0; i < route.params.currentUser.friends.length; i++) {
        const friendId = route.params.currentUser.friends[i];
        if (friendId) {
          const friend = await DataStore.query(User, friendId);
          friendList.push(friend);
        }
      }
    }
    setFriends(friendList);
  };

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

  const addSelectedFriend = (friend: User) => {
    setSelectedFriends((selectedFriends) => [...selectedFriends, friend]);
  };

  const removeSelectedFriend = (friend: User) => {
    let index = 0;
    for (let i = 0; i < selectedFriends.length; i++) {
      if (selectedFriends[i].id === friend.id) {
        index = i;
        break;
      }
    }
    selectedFriends.splice(index, 1);
    setSelectedFriends(selectedFriends.slice(0));
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

  interface renderFriendProps {
    item: User;
  }
  interface renderContactProps {
    item: Contact;
  }

  const renderFriend = ({ item }: renderFriendProps) => (
    <FriendBubble
      selectedFriends={selectedFriends}
      friend={item}
      key={item.id}
      addUser={addSelectedFriend}
      removeUser={removeSelectedFriend}
    />
  );

  const renderContact = ({ item }: renderContactProps) => {
    return (
      <ContactTile
        friend={item}
        addUser={addSelectedContact}
        removeUser={removeSelectedContact}
        isSelected={selectedContacts}
      />
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
          fullDate: event.fullDate,
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
    <View style={styles.screen}>
      <ImageBackground source={{ uri: eventObject.imageURL }} style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <View style={styles.title}>
          <Text style={styles.titleText}>Send your new plan to your friends</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.eventInfo}>
            <Text style={styles.planInfo}>{eventObject.title}</Text>
            <Text style={styles.planInfo}>{eventObject.date}</Text>
            <Text style={styles.planInfo}>{eventObject.time}</Text>
            <Text numberOfLines={1} style={styles.planInfo}>
              {eventObject.location}
            </Text>
          </View>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>Invite friends to join plan...</Text>
        </View>
      </ImageBackground>
      <View style={styles.friendContainer}>
        <View style={styles.menu}>
          <View style={menuItemSelected === 'friends' && styles.itemSelectedContainer}>
            <Text
              style={[
                menuItemSelected === 'friends' ? styles.menuItemSelected : styles.menuItemNotSelected,
                styles.menuItem,
              ]}
              onPress={() => menuSelection('friends')}
            >
              FRIENDS
            </Text>
          </View>
          <View style={menuItemSelected === 'contacts' && styles.itemSelectedContainer}>
            <Text
              style={[
                menuItemSelected === 'contacts' ? styles.menuItemSelected : styles.menuItemNotSelected,
                styles.menuItem,
              ]}
              onPress={() => menuSelection('contacts')}
            >
              CONTACTS
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {menuItemSelected === 'friends' && (
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Send your friends an in app notification!</Text>
              {friends.length > 0 ? (
                <View style={styles.friendBubbleContainer}>
                  <FlatList
                    data={friends}
                    renderItem={renderFriend}
                    ListEmptyComponent={() => (
                      <View style={styles.title}>
                        <Text>No Friends Found</Text>
                      </View>
                    )}
                    horizontal={false}
                    numColumns={4}
                  />
                </View>
              ) : null}
              <View style={{ position: 'absolute', bottom: 27, alignSelf: 'center' }}>
                <Button
                  title={selectedFriends.length === 0 ? 'Skip' : 'Next'}
                  onPress={() => setMenuItemSelected('contacts')}
                />
              </View>
            </View>
          )}
          {menuItemSelected === 'contacts' && (
            <View style={styles.contactsContainer}>
              <View>
                <Text style={styles.text}>Invite more friends to hang out together!</Text>
                <SearchBar onInputChange={searchFriends} />
              </View>
              <View style={styles.flatlistContainer}>
                <FlatList
                  data={filteredContacts}
                  renderItem={renderContact}
                  ListEmptyComponent={() => (
                    <View style={styles.title}>
                      <Text>No Friends Found</Text>
                    </View>
                  )}
                />
              </View>
              <Button
                title={selectedContacts.length === 0 ? 'Skip' : 'Next'}
                onPress={sendContactMessage}
                disabled={selectedFriends.length === 0 && selectedContacts.length === 0 ? true : false}
              />
              {selectedContacts.length === 0 && selectedFriends.length === 0 && (
                <Text style={styles.error}>Select a friend to continue!</Text>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 2.5,
    justifyContent: 'space-evenly',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.25,
  },
  eventInfo: {
    backgroundColor: '#D9B139',
    padding: 20,
    borderRadius: 15,
  },
  planInfo: {
    fontSize: 20,
    margin: 5,
    fontWeight: '700',
  },
  friendContainer: {
    flex: 3,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    textAlign: 'left',
  },
  body: {
    marginHorizontal: 30,
    justifyContent: 'space-between',
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 6,
    height: 50,
    paddingLeft: 20,
    borderBottomWidth: 3,
    borderColor: 'gray',
  },
  itemSelectedContainer: {
    borderBottomWidth: 3,
    borderBottomColor: '#32A59F',
  },
  menuItem: {
    marginHorizontal: 15,
    fontSize: 14,
    paddingBottom: 4,
  },
  menuItemSelected: {
    color: '#32A59F',
    fontWeight: '700',
  },
  menuItemNotSelected: {
    color: 'gray',
  },
  text: {
    textAlign: 'center',
    padding: 30,
    fontSize: 16,
  },
  friendBubbleContainer: {
    flexDirection: 'row',
  },
  flatlistContainer: {
    flexDirection: 'column',
    width: '100%',
    height: '40%',
    marginVertical: 10,
  },
  contactsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
});
