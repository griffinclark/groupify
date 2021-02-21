import React, { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import { SafeAreaView, Text, View } from "react-native";
import UserDisplay from "../organisms/UserDisplay";
import { globalStyles } from "./../res/styles/GlobalStyles";

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
        console.log("data", data.length)
        let keyValue = 0
        data.forEach((dataPoint) => {
                console.log("dataPoint", dataPoint)
                dataPoint.key = keyValue;
                setContacts(contacts => [...contacts, dataPoint])
                console.log("contacts ", contacts);
                keyValue += 1
            
           
        })
        } else {
          console.log("no contacts were found");
        }
      }
    })();
  }, []);

  const addUser = (key: number) => {
    setFriends((friends) => [...friends, contacts[key]]);
  };

  const removeUser = (key: number) => {};
  // TODO sort friends list
  // TODO add search bar
  // TODO add continue button
  // TODO remove undefined undefined contacts

  return (
    <SafeAreaView>
      <View style={globalStyles.spacer} />
      <Text style={globalStyles.title}>Your Contacts</Text>
      <View style={globalStyles.miniSpacer} />
      <UserDisplay
        userList={contacts}
        displayType={"androidContact"}
        addUser={addUser}
        removeUser={removeUser}
      />
    </SafeAreaView>
  );
}
