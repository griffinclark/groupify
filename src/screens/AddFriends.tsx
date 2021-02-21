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
          await setContacts(data);
          console.log("successfully grabbed contacts");
        } else {
          console.log("no contacts were found");
        }
      }
    })().then();
  }, []);

  return (
    <SafeAreaView>
      <View style={globalStyles.spacer} />
      <Text style={globalStyles.title}>Your Contacts</Text>
      <View style={globalStyles.miniSpacer} />
      <UserDisplay userList={contacts} displayType={"androidContact"}  />
    </SafeAreaView>
  );
}
