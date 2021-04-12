import { Props } from "../res/root-navigation";
import { SafeAreaView, TextInput, Button } from "react-native";   
import React, { useState } from "react";
import { globalStyles } from "../res/styles/GlobalStyles";
import { Auth } from "aws-amplify";

export const LogIn = ({navigation} : Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logIn = async () => {
        try {
            await Auth.signIn(email, password);
            console.log('successfully signed in');
            navigation.navigate("Home");
          } catch (err) {
            console.log('error signing in...', err);
            //handle no validation 
          }
    }
    
    return (
        <SafeAreaView style={globalStyles.defaultRootContainer}>
            <TextInput
                placeholder='Email'
                onChangeText={setEmail}
            />
            <TextInput
                placeholder='Password'
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <Button 
                title='Sign In'
                onPress={logIn}
            />
        </SafeAreaView>
    )
};
