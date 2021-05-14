import React, { useEffect, useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View,
  ActivityIndicator,
 } from "react-native";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { SearchBar } from "react-native-elements";
import * as Contacts from "expo-contacts";
import { Contact, Event } from "../res/dataModels";
import { FlatList } from "react-native-gesture-handler";
import { DEFAULT_CONTACT_IMAGE, GREY_5 } from "../res/styles/Colors";
import { getAllImportedContacts, storeUserEvent } from "./../res/storageFunctions";
import { Navbar, AndroidContactTile } from "../molecules/MoleculesExports";
import { NavButton, Button, Title, Screen } from '../atoms/AtomsExports'
import { FriendList } from '../organisms/OrganismsExports'

interface Props {
  navigation: any;
  route: any
}

enum State {
  Empty,
  Loading,
  Done
}

export default function SelectFriends({ navigation, route }: Props) {
  // const [friendsList, setFriendsList] = useState([]);
  const [friends, setFriends] = useState<Contact[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<Contact[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<Contact[]>([]);
  const [query, setQuery] = useState<string>("");
  const [state, setState] = useState<State>(State.Empty);

  // FIXME @Griffin add in "User x likes coffee" to each user when a search is done
  useEffect(() => {
    // console.log(route.params.data)
    setState(State.Loading);
    loadFriends(); // Load contacts only once
  }, []);

  const addSelectedFriend = (friend: Contact) => {
    setSelectedFriends((selectedFriends) => [...selectedFriends, friend]);
  };

  const removeSelectedFriend = (friend: Contact) => {
    // let index = selectedFriends.indexOf(friend);
    let index: number = 0;
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
  const loadFriends = async() => {
    const importedContacts = await getAllImportedContacts();
    // console.log("all imported contacts", importedContacts);
    setFriends(importedContacts);
    setFilteredFriends(importedContacts);
    setState(State.Done);
  }

  // Filters contacts (only contacts containing <text> appear)
  const searchFriends = (text: string) => {
    setQuery(text);
    setFilteredFriends(
      friends.filter(
        friend => {
          let friendLowercase = "";
          try {
            friendLowercase = friend.name.toLowerCase();
          }
          catch {
            console.log("error filtering a contact")
          }
          // let contactLowercase = contact.name.toLowerCase();
          let textLowercase = text.toLowerCase();
          return friendLowercase.indexOf(textLowercase) > -1;
        }
      )
    );
    // console.log(contacts);
  }

  // Renders each contact as AndroidContactTile
  const renderContact = ({ item }: any) => (
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
      <NavButton
          onPress={() => navigation.navigate("CreateCustomEvent")}
          title='Back'
        />
      </Navbar>
      <Title style={globalStyles.superTitle}>Select Friends</Title>
      <SearchBar
        placeholder="Search for friends"
        onChangeText={searchFriends}
        value={query}
        lightTheme={true}
      />
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
        <FriendList style={styles.friendContainer} title="Selected friends" friends={selectedFriends}/>

        <Button
          title="Send Message"
          onPress={async () => {
            route.params.data.eventData.friends = selectedFriends;
            navigation.navigate("SendMessage", route.params);
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  contactContainer: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 26
  },
  flatListContainer: {
    flexGrow: 1,
    flex: 1,
    // borderBottomColor: "gray",
    // borderBottomWidth: 1
  },
  friendContainer: {
    backgroundColor: GREY_5, 
    borderRadius: 10, 
    padding: 10
  },
  footer: {
    // position: "absolute",
    // bottom: 0,
    flex: .5,
    height: "25%",
    // borderWidth: 1,
    display: "flex",
    justifyContent: "space-between",
    // justifySelf: "flex-end"
  }
});