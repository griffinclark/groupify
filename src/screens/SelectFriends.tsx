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
import { addEvent } from "./Home";
import * as Contacts from "expo-contacts";
import { Contact, Event } from "../res/dataModels";
import { FlatList } from "react-native-gesture-handler";
import { DEFAULT_CONTACT_IMAGE } from "../res/styles/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeUserEvent } from "./../res/storageFunctions";


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
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [query, setQuery] = useState<string>("");
  const [state, setState] = useState<State>(State.Empty);

  // FIXME @Griffin add in "User x likes coffee" to each user when a search is done
  useEffect(() => {
    // console.log(route.params.data)
    setState(State.Loading);
    loadContacts(); // Load contacts only once
  }, []);

  const addSelectedFriend = (friend: string) => {
    setSelectedFriends((selectedFriends) => [...selectedFriends, friend]);
  };

  const removeSelectedFriend = (friend: string) => {
    let index = selectedFriends.indexOf(friend);
    selectedFriends.splice(index, 1);
    setSelectedFriends(selectedFriends.slice(0));
  };

  // Request permission to access contacts and load them.
  const loadContacts = async() => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({});
      let contacts = data.map(contact => ({
        id: contact.id,
        name: contact.name,
        image: contact.image,
        phoneNumber: (contact.phoneNumbers ? contact.phoneNumbers[0].number : null),
      }));
      contacts.sort((c1, c2) => (c1.name < c2.name) ? -1 : 1);
      setContacts(contacts);
      setFilteredContacts(contacts); // show all contacts when screen loads
      // console.log(contacts);
    }
    setState(State.Done);
  }

  // Filters contacts (only contacts containing <text> appear)
  const searchContacts = (text: string) => {
    setQuery(text);
    setFilteredContacts(
      contacts.filter(
        contact => {
          let contactLowercase = "";
          try {
            contactLowercase = contact.name.toLowerCase();
          }
          catch {
            console.log("error filtering a contact")
          }
          // let contactLowercase = contact.name.toLowerCase();
          let textLowercase = text.toLowerCase();
          return contactLowercase.indexOf(textLowercase) > -1;
        }
      )
    );
    // console.log(contacts);
  }

  // Renders each contact as AndroidContactTile
  const renderContact = ({ item }) => (
    <AndroidContactTile
      firstName={item.name}
      imageURL={item.image ? item.image.uri : DEFAULT_CONTACT_IMAGE}
      addUser={addSelectedFriend}
      removeUser={removeSelectedFriend}
    />
  );

  return (
    <SafeAreaView>
      <View style={globalStyles.spacer} />
      <Text style={globalStyles.superTitle}>Search for your friends</Text>
      <Text>Press the checkbox to select a friend</Text>
      <View style={globalStyles.miniSpacer} />
      <SearchBar
        placeholder="Search for friends"
        onChangeText={searchContacts}
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
          data={filteredContacts}
          renderItem={renderContact}
          ListEmptyComponent={() => (
            <View style={styles.listContainer}>
              <Text>No Contacts Found</Text>
            </View>
          )}
        />
      </View>

      <View style={{height: 10}} />
      <Text style={globalStyles.title}>Selected friends:</Text>
      <ScrollView horizontal={true}>
        <Text>{selectedFriends.map(friend => friend + " | ")}</Text>
      </ScrollView>
      <View style={globalStyles.spacer} />

      {/* TODO @David what do we want to do with the friend list when a user submits? */}
      <Button
        title="Create Event"
        onPress={async () => {
          let event: Event = route.params.data.eventData;
          event.friends = selectedFriends;
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