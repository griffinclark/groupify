import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { StackProps } from '../res/root-navigation';
import { globalStyles } from '../res/styles/GlobalStyles';
import { Contact } from '../res/dataModels';
import { DEFAULT_CONTACT_IMAGE, GREY_5 } from '../res/styles/Colors';
import { getAllImportedContacts } from '../res/storageFunctions';
import { Navbar, AndroidContactTile } from '../molecules/MoleculesExports';
import { NavButton, Button, Title, Screen } from '../atoms/AtomsExports';
import { FriendList } from '../organisms/OrganismsExports';

enum State {
  Empty,
  Loading,
  Done,
}

export const SelectFriends: React.FC<StackProps> = ({ navigation, route }: StackProps) => {
  const [friends, setFriends] = useState<Contact[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<Contact[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<Contact[]>([]);
  const [query, setQuery] = useState<string>('');
  const [state, setState] = useState<State>(State.Empty);

  useEffect(() => {
    setState(State.Loading);
    loadFriends(); // Load contacts only once
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

  // Request permission to access contacts and load them.
  const loadFriends = async () => {
    const importedContacts = await getAllImportedContacts();
    setFriends(importedContacts);
    setFilteredFriends(importedContacts);
    setState(State.Done);
  };

  // Filters contacts (only contacts containing <text> appear)
  const searchFriends = (text: string) => {
    setQuery(text);
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

  // Renders each contact as AndroidContactTile
  const renderContact = ({ item }: Record<string, Contact>) => (
    <AndroidContactTile
      contact={item}
      firstName={item.name}
      imageURL={item.image ? item.image.uri : DEFAULT_CONTACT_IMAGE}
      addUser={addSelectedFriend}
      removeUser={removeSelectedFriend}
    />
  );

  return (
    <Screen>
      <Navbar>
        <NavButton onPress={() => navigation.navigate('CreateCustomEvent')} title="Back" />
      </Navbar>
      <Title style={globalStyles.superTitle}>Select Friends</Title>
      <SearchBar placeholder="Search for friends" onChangeText={searchFriends} value={query} lightTheme={true} />
      <View style={styles.flatListContainer}>
        {state === State.Loading ? (
          <View>
            <ActivityIndicator size="large" color="#bad555" />
          </View>
        ) : null}
        <FlatList
          data={filteredFriends}
          renderItem={renderContact}
          ListEmptyComponent={() => (
            <View style={styles.listContainer}>
              <Text>No Friends Found</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.footer}>
        <FriendList style={styles.friendContainer} title="Selected friends" friends={selectedFriends} />
        <Button
          title="Send Message"
          onPress={async () => {
            route.params.data.eventData.friends = selectedFriends;
            navigation.navigate('SendMessage', route.params);
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
