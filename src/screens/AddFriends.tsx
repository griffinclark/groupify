import React, { useEffect, useState } from "react";
import * as Contacts from "expo-contacts"; //FIXME find a different way to import contacts so we can get the phone numbers we need
import { SafeAreaView, Text, View, Button } from "react-native";
import UserDisplay from "../organisms/UserDisplay";
import { globalStyles } from "./../res/styles/GlobalStyles";
import {importZombies, Zombie, ImportZombiesData} from "../res/services/firebase"

interface Props {
  navigation: any;
}

export default function AddFriends({ navigation }: any) {
  const [contacts, setContacts] = useState([]); // this is the list of contacts imported from a user's phone
  const [friends, setFriends] = useState([]); // this is the list of friends a user will be importing into the app

  // Grab the user's contacts list
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails], // not sure what this is
        });

        if (data.length > 0) {
          let keyValue = 0;
          data.forEach((dataPoint) => {
            dataPoint.key = keyValue;

            // TODO figure out why some contacts are loading in as "undefined undefined"
            setContacts((contacts) => [...contacts, dataPoint]);
            keyValue += 1;
          });
        } else {
          console.log("no contacts were found");
        }
      }
    })();
  }, []);

  // add new zombie accounts to FB
  const herdZombies = () => {
    // TODO @David what happens if I add an actual user instead of a zombie?
    let listOfZombies: Zombie[] = []
    let i = 0
    friends.forEach((friend)=>{
      contacts.forEach((contact)=>{
        console.log("contact: ", contact.phoneNumbers	 )
        return
      })
      i++
      let zombie: Zombie = {
        id: i,
        name: friend.firstName + " " + friend.lastName,
        phoneNumber: friend.phoneNumber
      }
      listOfZombies.push(zombie)
    })
    console.log("DEBUG: ", listOfZombies)

    let zombiesToImport: ImportZombiesData = {
      zombies: listOfZombies
    }

    importZombies(zombiesToImport)
  };

  const addFriend = (key: number) => {
    setFriends((friends) => [...friends, contacts[key]]);
  };

  const removeFriend = (key: number) => {
    let localFriends = friends;
    // This is a terrible way to do this. I was pressed for time, don't judge me too hard
    let index = 0;
    localFriends.forEach((friend) => {
      if ((friend.key = key)) {
        localFriends.splice(index, index + 1);
        setFriends(localFriends);
        return;
      }
      index++;
    });
  };
  // TODO sort friends list alphabetically before desplaying
  // TODO add search bar
  // TODO remove undefined undefined contacts

  return (
    <SafeAreaView>
      <View style={globalStyles.spacer} />
      <Text style={globalStyles.title}>Your Contacts</Text>
      <View style={globalStyles.miniSpacer} />
      {contacts.length > 0 ? (
        <View style={{ height: "75%" }}>
          <UserDisplay
            userList={contacts}
            displayType={"androidContact"} // TODO does this change for iOS?
            addUser={addFriend}
            removeUser={removeFriend}
          />
        </View>
      ) : (
        <Text> Loading...</Text>
      )}
      {/* TODO @David what do we want to do with the friend list when a user submits? */}
      <Button
        title="Done"
        onPress={() => {
          herdZombies();
          navigation.navigate("Home");
        }}
      />
    </SafeAreaView>
  );
}
