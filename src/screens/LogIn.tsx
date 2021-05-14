import { StackProps } from "../res/root-navigation";
import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { getAllImportedContacts } from "./../res/storageFunctions";
import { Contact } from "./../res/dataModels";
import { Navbar } from "../organisms/OrganismsExports";
import { Title, NavButton, Alert, FormInput, Button, Screen } from '../atoms/AtomsExports'

export const LogIn: React.FC<StackProps> = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState<string | undefined>();

    const logIn = async () => {
        setError(undefined); //clear error modal
        try {
            await Auth.signIn(email, password);
            console.log('successfully signed in');
            let contacts: Contact[] = await getAllImportedContacts();
            if (contacts.length === 0) {
                navigation.navigate("ImportContacts");
            }
            else {
                navigation.navigate("Home");
            }
        } catch (err) {
            console.log('error signing in...', err);
            if(err.code == 'UserNotConfirmedException') {
                navigation.navigate("CreateAccount", {step: 'validate', email: email});
            } else if (
                err.code == 'InvalidParameterException' && 
                err.message.includes('Incorrect username or password.')
            ) {
                setError('Incorrect username or password.');
            } else {
                setError(err.message);
            }
        }
    }

    useEffect(() => {
        if(email.trim() && password.trim()) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [email, password])
    
    return (
        <Screen>
            <Navbar>
                <NavButton
                    onPress={() => navigation.navigate("Welcome")}
                    title='Back'
                    />
            </Navbar>
            <Title>Log In</Title>
            <FormInput
                label='Email'
                onChangeText={setEmail}
                placeholder='example@email.com'
            />
            <FormInput
                label='Password'
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            {error && <Alert status='error' message={error}/>}
            <Button 
                title='Sign In'
                onPress={logIn}
                disabled={disabled}
            />
        </Screen>
    )
};
