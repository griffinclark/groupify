import React, { useEffect, useState } from "react";
import { 
  StyleSheet,
  Button, 
  PermissionsAndroid, 
  SafeAreaView, 
  Text, 
  View,
  ActivityIndicator,
  ScrollView,
 } from "react-native";
import Navbar from "../organisms/Navbar";
import UserDisplay from "./../organisms/UserDisplay";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { SearchBar } from "react-native-elements";
import AndroidContactTile from "./../molecules/AndroidContactTile";
import * as Contacts from "expo-contacts";
import { Contact, Event } from "../res/dataModels";
import { FlatList } from "react-native-gesture-handler";
import { DEFAULT_CONTACT_IMAGE } from "../res/styles/Colors";
import { getAllImportedContacts, storeUserEvent } from "./../res/storageFunctions";


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
    let importedContacts = await getAllImportedContacts();
    console.log("all imported contacts", importedContacts);
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
  const renderContact = ({ item }) => (
    <AndroidContactTile
      contact={item}
      firstName={item.name}
      imageURL={item.image ? item.image.uri : DEFAULT_CONTACT_IMAGE}
      addUser={addSelectedFriend}
      removeUser={removeSelectedFriend}
    />
  );

  return (
    <SafeAreaView>
      <Navbar navigation={navigation} />
      <Text style={globalStyles.superTitle}>Search for your friends</Text>
      <Text>Press the checkbox to select a friend</Text>
      <View style={globalStyles.miniSpacer} />
      <SearchBar
        placeholder="Search for friends"
        onChangeText={searchFriends}
        value={query}
        lightTheme={true}
      />
      <View style={globalStyles.miniSpacer} />
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

      <View style={{height: 10}} />
      <Text style={globalStyles.title}>Selected friends:</Text>
      <ScrollView horizontal={true}>
        <Text>{selectedFriends.map(friend => friend.name + " | ")}</Text>
      </ScrollView>
      <View style={globalStyles.spacer} />

      {/* TODO @David what do we want to do with the friend list when a user submits? */}
      <Button
        title="Create Event"
        onPress={async () => {
          let event: Event = route.params.data.eventData;
          event.friends = selectedFriends;
          // console.log("selected friends on submit", selectedFriends);
          await storeUserEvent(event);
          navigation.navigate("Home", {data: {prevAction: "created event" + event.uuid}});
        }}
      />

    </SafeAreaView>
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
    height: "45%",
    borderBottomColor: "gray",
    borderBottomWidth: 1
  }
});