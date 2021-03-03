import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import Navbar from "../organisms/Navbar";
import UserDisplay from "./../organisms/UserDisplay";
import { globalStyles } from "./../res/styles/GlobalStyles";
import { SearchBar } from "react-native-elements";
import AndroidContactTile from "./../molecules/AndroidContactTile";
import { addEvent } from "./Home";

interface Props {
  navigation: any;
  route: any
}

export default function SelectFriends({ navigation, route }: Props) {
  const [friendsList, setFriendsList] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [query, setQuery] = useState("");

  // FIXME @Griffin add in "User x likes coffee" to each user when a search is done
  useEffect(() => {
    console.log(route.params.data)
    setFriendsList([]);
  }, []);

  const addSelectedFriend = (key: number) => {
    setSelectedFriends((selectFriends) => [...selectFriends, friendsList[key]]);
  };

  const removeSelectedFriend = (key: number) => {
    let localFriends = selectedFriends;
    localFriends.splice(key, 1);
    setSelectedFriends(localFriends);
  };

  return (
    <SafeAreaView>
      <View style={globalStyles.spacer} />
      <Text style={globalStyles.title}>Your Friends</Text>
      <View style={globalStyles.miniSpacer} />
      <SearchBar
        placeholder="Search for friends"
        onChangeText={setQuery}
        value={query}
        lightTheme={true}
      />
      <View style={globalStyles.miniSpacer} />
      <View style={{ height: "67%" }}>
        <AndroidContactTile
          firstName={query}
          imageURL={
            "https://media-exp1.licdn.com/dms/image/C5603AQEJs0Wm-qqwhA/profile-displayphoto-shrink_200_200/0/1612680577055?e=1620259200&v=beta&t=rL6dxBxfm-q6KAe-aJvD-isPD94NzXuuZVKkSe-Mp_U"
          }
          addUser={(user)=>{ setFriendsList((friendsList) => [...friendsList, user]) }}

        ></AndroidContactTile>
      </View>

      {/* TODO @David what do we want to do with the friend list when a user submits? */}
      <Button
        title="Create Event"
        onPress={() => {
          navigation.navigate("Home",{data: {
            tagData: route.params.data.tagData,
            eventData: route.params.data.eventData,
            friendList: friendsList
          }});
        }}
      />
    </SafeAreaView>
  );
}
