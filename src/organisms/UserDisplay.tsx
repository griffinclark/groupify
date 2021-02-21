import React from "react";
import UserTile from "../molecules/UserTile";
import { SafeAreaView, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AndroidContactTile from './../molecules/AndroidContactTile';

interface Props {
  addUser?: any;
  removeUser?: any;
  userList: object[]; // a list of all of our users
  displayType: string; // androidContact, iOSContact, user
}

interface userTileInterface {
  username: string;
  imageURL: string;
}
let key =0
export default function UserDisplay({ addUser, removeUser, userList, displayType }: Props) {
  return (
    <SafeAreaView>
      <FlatList
        data={userList}
        renderItem={({ item }) => {
            switch ( displayType) {
                case "androidContact": {
                    return ( <AndroidContactTile
                        firstName={item.firstName }
                        lastName ={item.lastName + " " + item.key}
                        UID={item.key} 
                        addUser={addUser}
                        removeUser={removeUser}
                      />)
                    }
                   case "iOSContact": {
                       // TODO write
                    return ( <UserTile
                        username={item.username}
                        imageURL={item.imageURL}
                        addUser={addUser}
                        removeUser={removeUser}
                        key={key}
                      />)
                   }

                   case "user":{
                       // TODO finish and test
                    return ( <UserTile
                        username={item.username}
                        imageURL={item.imageURL}
                        addUser={addUser}
                        removeUser={removeUser}
                        key={key}
                      />)
                   }
                   default: {
                       console.log("error --> bad conact type")
                       return(<Text>Bad user type</Text>)
                   }
            }
          
        }}
        keyExtractor={(item, index) => item.key} // FIXME sometimes these keys aren't unique. 
      />
    </SafeAreaView>
  );
}
