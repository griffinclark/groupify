import React, { useEffect, useState } from "react"
import { Button, SafeAreaView, Text, View } from "react-native"
import UserDisplay from "../organisms/UserDisplay"
import { globalStyles } from './../res/styles/GlobalStyles';
import { User } from './../res/dataModels';

interface Props{
    navigation: any
    eventUID: string
}
export default function ChangeInvitedFriends({eventUID, navigation}: any){
    const [friendsList, setFriendsList] = useState<User[]>([])
    const [invitedFriends, setInvitiedFriends] = useState<User[]>()

    // import a user's friend list
    useEffect(()=>{
        // TODO @David import the logged in user's friendsList here
    }, [])

    useEffect(()=>{
        // TODO @David given an eventUID, add all other users who are invited to that event
    }, [])
    
    return(
        <SafeAreaView>
            {/* <Text style={globalStyles.title}>Change invited friends</Text>
            <UserDisplay 
            userList={friendsList}
            displayType={"user"}

            /> */}
            <View style={globalStyles.megaSpacer} />
            <Text>Feature coming soon!</Text>
            <Button title={"Go Back"} onPress={()=>{navigation.goBack()}} />
        </SafeAreaView>
    )
}