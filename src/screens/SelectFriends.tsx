import React, { useEffect, useState } from "react";
import { StyleSheet, Button, PermissionsAndroid, SafeAreaView, Text, View } from "react-native";
import Navbar from "../organisms/Navbar";
import UserDisplay from "./../organisms/UserDisplay";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { SearchBar } from "react-native-elements";
import AndroidContactTile from "./../molecules/AndroidContactTile";
import { addEvent } from "./Home";
import * as Contacts from "expo-contacts";
import { Contact } from "../res/dataModels";
import { FlatList } from "react-native-gesture-handler";

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
  const [query, setQuery] = useState<String>("");
  const [name, setName] = useState<string>("");
  const [state, setState] = useState<State>(State.Empty);

  // FIXME @Griffin add in "User x likes coffee" to each user when a search is done
  useEffect(() => {
    // console.log(route.params.data)
    loadContacts(); // Load contacts only once
  }, []);

  const addSelectedFriend = (friend: String) => {
    // setSelectedFriends((selectedFriends) => [...selectedFriends, friend]);
    selectedFriends.push(friend); // how does this differ from line above?
  };

  const removeSelectedFriend = (friend: String) => {
    // let localFriends = selectedFriends;
    // localFriends.splice(key, 1);
    // setSelectedFriends(localFriends);
    // let index = selectedFriends.indexOf(friend);
  };

  // Request permission to access contacts and load them.
  const loadContacts = async() => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({});
      setContacts(data.map(contact => ({
        id: contact.id,
        name: contact.name
      })));
      // console.log(contacts);
    }
  }

  // Filters contacts based on the search
  const searchContacts = (text: string) => {
    setQuery(text);
    setFilteredContacts(
      contacts.filter(
        contact => {
          let contactLowercase = contact.name.toLowerCase();
          let textLowercase = text.toLowerCase();
          return contactLowercase.indexOf(textLowercase) > -1;
        }
      )
    );
    // console.log(filteredContacts);
  }

  // Renders each contact as AndroidContactTile
  const renderContact = ({ item }) => (
    <AndroidContactTile
      firstName={item.name}
      imageURL={
        "https://racemph.com/wp-content/uploads/2016/09/profile-image-placeholder.png"
      }
      addUser={addSelectedFriend}
      // removeUser={removeSelectedFriend}
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
      <View style={{ height: "50%" }}>
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

      {/* TODO @David what do we want to do with the friend list when a user submits? */}
      <Button
        title="Create Event"
        onPress={() => {
          navigation.navigate("Home",{data: {
            tagData: route.params.data.tagData,
            eventData: route.params.data.eventData,
            friendList: selectedFriends
          }});
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
});