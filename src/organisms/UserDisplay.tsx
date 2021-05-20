import React from "react";
import { SafeAreaView, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {AndroidContactTile, UserTile} from 'molecules/MoleculesExports';

// TODO handle names being too long

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
let listKey =0
export function UserDisplay({ addUser, removeUser, userList, displayType }: Props) {
  return (
    <SafeAreaView>
      <FlatList
        data={userList}
        renderItem={({ item }) => {
            switch ( displayType) {
                case "androidContact": {
                    return ( <AndroidContactTile
                        firstName={item.firstName }
                        lastName ={item.lastName}
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
        keyExtractor={(item)=> item.id.toString()} // FIXME sometimes these keys aren't unique. 
      />
    </SafeAreaView>
  );
}
