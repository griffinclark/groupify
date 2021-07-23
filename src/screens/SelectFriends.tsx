import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, FlatList } from 'react-native';
import { RoutePropParams } from '../res/root-navigation';
import { Contact } from '../res/dataModels';
import { getAllImportedContacts } from '../res/storageFunctions';
import { ContactTile } from '../molecules/MoleculesExports';
import { Button, FriendBubble, SearchBar } from '../atoms/AtomsExports';

interface Props {
  navigation: {
    navigate: (ev: string, a?: { step?: string }) => void;
  };
  route: RoutePropParams;
}

export const SelectFriends: React.FC<Props> = ({ navigation, route }: Props) => {
  const [friends, setFriends] = useState<Contact[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<Contact[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<Contact[]>([]);
  const [menuItemSelected, setMenuItemSelected] = useState('friends');
  const [eventObject, setEventObject] = useState({
    date: '',
    description: '',
    imageURL: '',
    location: '',
    time: '',
    title: '',
    uuid: '',
  });
  useEffect(() => {
    loadFriends();
    setEventObject(route.params.data.eventData);
  }, []);

  const addSelectedFriend = (friend: Contact) => {
    setSelectedFriends((selectedFriends) => [...selectedFriends, friend]);
  };

  const removeSelectedFriend = (friend: Contact) => {
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

  const loadFriends = async () => {
    const importedContacts = await getAllImportedContacts();
    setFriends(importedContacts);
    setFilteredFriends(importedContacts);
  };

  const searchFriends = (text: string) => {
    setFilteredFriends(
      friends.filter((friend) => {
        let friendLowercase = '';
        try {
          friendLowercase = friend.name.toLowerCase();
        } catch {
          console.log('error filtering a contact');
        }
        const textLowercase = text.toLowerCase();
        return friendLowercase.indexOf(textLowercase) > -1;
      }),
    );
  };

  interface renderContactProps {
    item: Contact;
  }

  const renderFriend = ({ item }: renderContactProps) => (
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
        addUser={addSelectedFriend}
        removeUser={removeSelectedFriend}
        isSelected={selectedFriends}
      />
    );
  };

  const onPressSend = async () => {
    route.params.data.eventData.friends = selectedFriends;
    navigation.navigate('SendMessage', route.params);
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
          <Text style={styles.titleText}>Invite friends to join plan...</Text>
        </View>
      </ImageBackground>
      <View style={styles.friendContainer}>
        <View style={styles.menu}>
          <View style={menuItemSelected === 'friends' && styles.itemSelectedContainer}>
            <Text
              style={[menuItemSelected === 'friends' ? styles.menuItemSelected : null, styles.menuItem]}
              onPress={() => menuSelection('friends')}
            >
              FRIENDS
            </Text>
          </View>
          <View style={menuItemSelected === 'contacts' && styles.itemSelectedContainer}>
            <Text
              style={[menuItemSelected === 'contacts' ? styles.menuItemSelected : null, styles.menuItem]}
              onPress={() => menuSelection('contacts')}
            >
              CONTACTS
            </Text>
          </View>
        </View>
        <View>
          {menuItemSelected === 'friends' && (
            <View>
              <Text style={styles.text}>Send your friends and in app notification!</Text>
              <View style={styles.friendBubbleContainer}>
                <FlatList
                  data={filteredFriends}
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
              <Button title={'Notify'} onPress={onPressSend} />
            </View>
          )}
          {menuItemSelected === 'contacts' && (
            <View style={styles.contactsContainer}>
              <Text style={styles.text}>Invite more friends to hang out together!</Text>
              <SearchBar onInputChange={searchFriends} />
              <View style={styles.flatlistContainer}>
                <FlatList
                  data={filteredFriends}
                  renderItem={renderContact}
                  ListEmptyComponent={() => (
                    <View style={styles.title}>
                      <Text>No Friends Found</Text>
                    </View>
                  )}
                />
              </View>
              <Button title="Next" onPress={onPressSend} />
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
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    textAlign: 'left',
    paddingTop: 15,
  },
  body: {
    flex: 4,
    margin: 30,
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
    height: '45%',
    marginVertical: 20,
  },
  contactsContainer: {
    display: 'flex',
    height: '100%',
  },
});
