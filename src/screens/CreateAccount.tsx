import { StackProps } from "../res/root-navigation";
import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify"
import { Button } from "../atoms/Button";
import { FormInput } from "../atoms/FormInput";
import { Screen } from "../atoms/Screen";
import { Alert } from "../atoms/AlertModal";

export const CreateAccount: React.FC<StackProps> = ({navigation, route}) => {
    const [email, setEmail] = useState(route.params.email ? route.params.email : '');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [validationCode, setCode] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    useEffect(() => {
        if(
            route.params.step =='create' && 
            email.trim() && 
            password.trim() && 
            name.trim() && 
            phone.trim()
        ) {
            setDisabled(false);
        } else if(
            route.params.step == 'validate' &&
            email.trim() &&
            validationCode.trim()
        ) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }, [email, password, name, phone, validationCode]);

    const invalidPhone = () => {
        const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
        if(phoneRegex.test(phone)) {
            return false
        } else {
            setError('Invalid phone number');
            return true
        }
    }

    
      
    // sign the user up
    const signUp = async () => {
        console.log(email, password);
        if(invalidPhone()) {
            return
        }
        try {
            //TODO: save phone and name
            await Auth.signUp({ 
                username: email, 
                password, 
                // attributes: {
                //     phone: phone,
                //     name: name
                // }
            });
            console.log('user successfully created');
            setError(undefined); //clear error
            navigation.push("CreateAccount", {step: 'validate', email: email});
        } catch (err) {
            console.log('Error: ', err);
            if(err.code == 'InvalidParameterException') {
                if(err.message == "Username should be an email.") {
                    setError('Please enter a valid email');
                } else if(err.message.includes('password')) {
                    setError('Password must be at least 8 characters');
                } else {
                    setError(err.message);
                }
            } else if (err.code == 'InvalidPasswordException') {
                setError('Password must be at least 8 characters');
            } else {
                setError(err.message);
            }
        }
    }

    const validateUser = async () => {
        try {
            console.log(email, validationCode);
            await Auth.confirmSignUp(email, validationCode);
            navigation.navigate("Login");
        } catch (err) {
            console.log('Error: ', err);
            setError(err.message);
        }
    }

    return (
        <Screen>
            {route.params.step === 'create' && <>
                <FormInput
                    label='Name'
                    onChangeText={setName}
                />
                <FormInput
                    label='Email'
                    onChangeText={setEmail}
                />
                <FormInput
                    label='Password'
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <FormInput
                    label='Phone Number'
                    onChangeText={setPhone}
                />
                {error && <Alert status='error' message={error}/>}
                <Button 
                    title='Next'
                    onPress={signUp}
                    disabled={disabled}
                />
            </>}
            {route.params.step === 'validate' && <>
                <Text style={{margin: 20, fontWeight: 'bold'}}>Please enter the verification code from your email</Text>
                {email == '' &&
                <FormInput
                    label='Email'
                    onChangeText={setEmail}
                />}
                <FormInput
                    label='Verification Code'
                    onChangeText={setCode}
                    secureTextEntry={true}
                />
                {error && <Alert status='error' message={error}/>}
                {success && <Alert status='success' message={success}/>}
                <Button
                    title='Send New Code'
                    onPress={() => { 
                        try {
                            Auth.resendSignUp(email);
                            setSuccess('Sent new verification code');
                        } catch (err) {
                            console.log(err);
                            setError(err.message);
                        }
                    }}
                    disabled={!email.trim()}
                />
                <Button
                    title='Confirm Email'
                    onPress={validateUser}
                    disabled={disabled}
                />
            </>}
        </Screen>
    )
}