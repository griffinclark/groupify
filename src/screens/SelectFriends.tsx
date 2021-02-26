import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import Navbar from "../organisms/Navbar";
import UserDisplay from './../organisms/UserDisplay';
import { globalStyles } from './../res/styles/GlobalStyles';

interface Props {
  navigation: any;
}

export default function SelectFriends({ navigation }: Props) {
  const [friendsList, setFriendsList] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  // TODO @David load a user's friends
  useEffect(() => {
    setFriendsList([]);
  }, []);

  const addSelectedFriend = (key: number) => {
    setSelectedFriends((selectFriends) => [...selectFriends, friendsList[key]]);
  };

  const removeSelectedFriend = (key: number) =>{
      let localFriends = selectedFriends
      localFriends.splice(key, 1)
      setSelectedFriends(localFriends)
  }

  return(
      <SafeAreaView>
        <Navbar />
          <View style={globalStyles.spacer} />
      <Text style={globalStyles.title}>Your Friends</Text>
      <View style={globalStyles.miniSpacer} />
      {friendsList.length > 0 ? (
        <View style={{ height: "75%" }}>
          <UserDisplay
            userList={friendsList}
            displayType={"androidContact"} // TODO does this change for iOS?
            addUser={addSelectedFriend}
            removeUser={removeSelectedFriend}
          />
        </View>
      ) : (
        <Text> Loading...</Text>
      )}
      {/* TODO @David what do we want to do with the friend list when a user submits? */}
      <Button
        title="Continue"
        onPress={() => {
          navigation.navigate("EventResults");
          // TODO @David how do we carry over selected data?
        }}
      />
      </SafeAreaView>
  )
}
