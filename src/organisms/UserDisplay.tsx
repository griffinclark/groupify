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

export default function UserDisplay({ addUser, removeUser, userList, displayType }: Props) {
    let key = 0
  return (
    <SafeAreaView>
      <FlatList
        data={userList}
        renderItem={({ item }) => {
            key += 1
            switch ( displayType) {
                case "androidContact": {
                    return ( <AndroidContactTile
                        firstName={item.firstName }
                        lastName ={item.lastName}
                        imageURL={"https://avatars.dicebear.com/4.5/api/bottts/" + "p" + ".svg"}
                        key={item.id} //FIXME this isn't grabbing a unique value
                      />)
                    }
                   case "iOSContact": {
                       // TODO write
                    return ( <UserTile
                        username={item.username}
                        imageURL={item.imageURL}
                        addUser={addUser}
                        removeUser={removeUser}
                        key={username}
                      />)
                   }

                   case "user":{
                       // TODO finish and test
                    return ( <UserTile
                        username={item.username}
                        imageURL={item.imageURL}
                        addUser={addUser}
                        removeUser={removeUser}
                        key={username}
                      />)
                   }
                   default: {
                       console.log("error --> bad conact type")
                       return(<Text>Bad user type</Text>)
                   }
            }
          
        }}
        keyExtractor={(user) => user.username}
      />
    </SafeAreaView>
  );
}
