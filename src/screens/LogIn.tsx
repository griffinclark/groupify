import { StackProps } from "../res/root-navigation";
import React, { useEffect, useState } from "react";
import { Screen } from '../atoms/Screen';
import { Button } from '../atoms/Button';
import { Auth } from "aws-amplify";
import { FormInput } from "../atoms/FormInput";
import { Alert } from "../atoms/AlertModal";

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
            navigation.navigate("Home");
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