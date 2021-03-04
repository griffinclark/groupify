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

enum State {
  Empty,
  Loading,
  Done
}

export default function SelectFriends({ navigation, route }: Props) {
  const [friendsList, setFriendsList] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [query, setQuery] = useState("");
  const [name, setName] = useState<string>("");
  const [state, setState] = useState<State>(State.Empty);

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

  const [timeout, setTimer] = useState<NodeJS.Timeout | null>(null);
  const fakeSearch = async (text: string) => {
    setQuery(text);
    if (timeout) {
      setState(State.Loading);
      clearTimeout(timeout);
    }

    setTimer(setTimeout(() => {
      console.log("delayed: ", text);
      text = text.trim();
      setName(text);
      setState(text == "" ? State.Empty : State.Done);
    }, 750));
  };

  const fakeTile = () => {
    switch (state) {
    case State.Done:
      return (<AndroidContactTile
        firstName={name}
        imageURL={
          "https://racemph.com/wp-content/uploads/2016/09/profile-image-placeholder.png"
        }
        addUser={(user)=>{ setFriendsList((friendsList: string[]) => [...friendsList, user + '\n']) }}
      />)
    
    case State.Loading:
      return (
        <Text>Loading...</Text>
      );
    }
  };

  return (
    <SafeAreaView>
      <View style={globalStyles.spacer} />
      <Text style={globalStyles.superTitle}>Search for your friends</Text>
      <View style={globalStyles.miniSpacer} />
      <SearchBar
        placeholder="Search for friends"
        onChangeText={fakeSearch}
        value={query}
        lightTheme={true}
      />
      <View style={globalStyles.miniSpacer} />
      <View style={{ height: "67%" }}>
        {fakeTile()}
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
