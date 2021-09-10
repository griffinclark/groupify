import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { Contact } from '../res/dataModels';
import { FlatList } from 'react-native-gesture-handler';
import { DEFAULT_CONTACT_IMAGE, GREY_5 } from '../res/styles/Colors';
import { AppText, Button, Title, Screen } from '../atoms/AtomsExports';
import { FriendList } from '../organisms/OrganismsExports';
import { AndroidContactTile, Navbar } from '../molecules/MoleculesExports';
import { RoutePropParams } from '../res/root-navigation';
import { DataStore } from 'aws-amplify';
import { Invitee, User } from '../models';

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

export const EditFriends: React.FC<Props> = ({ navigation, route }: Props) => {
  const [query, setQuery] = useState('');
  const [state, setState] = useState(State.Empty);
  const [friends, setFriends] = useState<Invitee[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setState(State.Loading);
    loadFriends();
    setState(State.Done);
  }, []);

  const loadFriends = async () => {
    const user = await DataStore.query(User, route.params.userID);
    // console.log(user);
    const friends: User[] = [];
    if (user) {
      const friendIDs = user.friends;
      if (friendIDs) {
        for (const friendID of friendIDs) {
          if (friendID) {
            const friend = await DataStore.query(User, friendID);
            // console.log(friend);
            if (friend) {
              friends.push(friend);
            }
          }
        }
        setFriends(friends);
      }
    }
  };

  const renderUser = ({ item }: { item: User }) => (
    <AndroidContactTile
      contact={item}
      firstName={item.name}
      imageURL={DEFAULT_CONTACT_IMAGE}
      addUser={addUser}
      removeUser={removeUser}
      isChecked={isUserSelected(item.id)}
    />
  );

  const addUser = (user: Contact | User) => {
    setFriends((friends) => [...friends, { id: user.id, name: user.name }]);
  };

  const removeUser = (user: Contact | User) => {
    const index = friends.findIndex((friend) => friend.id == user.id);
    friends.splice(index, 1);
    setFriends(friends.slice());
  };

  const isUserSelected = (id: string) => {
    for (const friend of friends) {
      if (friend.id === id) {
        return true;
      }
    }
    return false;
  };

  const saveFriends = async () => {
    const user = await DataStore.query(User, route.params.userID);
    const friendIDs = friends.map((friend) => friend.id);
    if (user) {
      await DataStore.save(
        User.copyOf(user, (updated) => {
          updated.friends = friendIDs;
        }),
      );
    }
  };

  const searchUsers = async (text: string) => {
    const trimText = text.trim();
    setState(State.Loading);
    // console.log(`Searching users that contain ${text}`);
    text = trimText.charAt(0).toUpperCase() + trimText.slice(1);
    const users = await DataStore.query(User, (user) =>
      user.or((user) => user.name('contains', text).phoneNumber('contains', text)).id('ne', route.params.userID),
    );
    // console.log(users);
    setUsers(users);
    setState(State.Done);
  };

  return (
    <Screen>
      <Navbar>
        <Icon name="arrow-left" type="font-awesome" size={30} onPress={() => navigation.navigate('Profile')} />
      </Navbar>
      <Title>Add Friends</Title>
      <SearchBar
        lightTheme="true"
        placeholder="Search by name, phone number, email"
        onChangeText={(text) => {
          setQuery(text);
          searchUsers(query);
        }}
        onSubmitEditing={() => searchUsers(query)}
        value={query}
        platform="default"
      />
      <View style={styles.flatListContainer}>
        {state === State.Loading ? (
          <View>
            <ActivityIndicator size="large" color="#bad555" />
          </View>
        ) : null}
        <FlatList
          data={users}
          renderItem={renderUser}
          ListEmptyComponent={() => (
            <View style={styles.listContainer}>
              <import>No Users Found</import>
            </View>
          )}
        />
      </View>
      <View style={styles.footer}>
        <FriendList style={styles.friendContainer} title="Friends List" friends={friends} />
        <Button
          title="Save Friends"
          onPress={async () => {
            await saveFriends();
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
