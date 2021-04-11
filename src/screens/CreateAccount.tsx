import { Props } from "../res/root-navigation";
import { SafeAreaView, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { Auth } from "aws-amplify"
import { globalStyles } from "../res/styles/GlobalStyles";

export const CreateAccount = ({navigation}: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
      
    // sign the user up
    const signUp = async () => {
    console.log(email, password);
    try {
        await Auth.signUp({ 
            username: email, 
            password, 
            // attributes: { email }
        })
        console.log('user successfully signed up');
    } catch (err) {
        console.log('Error: ', err);
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
                title='Sign Up'
                onPress={signUp}
            />
        </SafeAreaView>
    )
}