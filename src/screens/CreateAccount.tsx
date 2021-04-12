import { Props } from "../res/root-navigation";
import { SafeAreaView, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { Auth } from "aws-amplify"
import { globalStyles } from "../res/styles/GlobalStyles";

export const CreateAccount = ({navigation, route}: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationCode, setCode] = useState('');
      
    // sign the user up
    const signUp = async () => {
        console.log(email, password);
        try {
            await Auth.signUp({ 
                username: email, 
                password, 
            })
            console.log('user successfully created');
            navigation.push("CreateAccount", {step: 'validate'})
        } catch (err) {
            console.log('Error: ', err);
            //handle bad pass
            //handle bad email
            //handle user exists 
        }
    }

    const validateUser = async () => {
        try {
            console.log(email, validationCode);
            await Auth.confirmSignUp(email, validationCode);
            navigation.navigate("Login");
        } catch (err) {
            console.log('Error: ', err);
        }
    }

    return (
        <SafeAreaView style={globalStyles.defaultRootContainer}>
            {route.step === 'create' && <>
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
            </>}
            {route.step === 'validate' && <>
                {email == '' &&
                <TextInput
                    placeholder='Email'
                    onChangeText={setEmail}
                />}
                <TextInput
                    placeholder='Validation Code'
                    onChangeText={setCode}
                    secureTextEntry={true}
                />
                <Button
                    title='Confirm Sign Up'
                    onPress={validateUser}
                />
            </>}
        </SafeAreaView>
    )
}