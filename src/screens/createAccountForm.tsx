/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Header } from '../atoms/Header';
import { WHITE } from '../res/styles/Colors';
import { FormInput } from '../atoms/FormInput';
import { RoutePropParams } from '../res/root-navigation';
import * as SecureStore from 'expo-secure-store';
import { amplifyPhoneFormat, formatPhoneNumber } from '../res/utilFunctions';
import { Auth } from 'aws-amplify';
import * as Analytics from 'expo-firebase-analytics';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
    push: (ev: any, e: { phone: any; step: string }) => void;
  };
  route: RoutePropParams;
}

export const createAccountForm = ({ navigation, route }: Props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [formatPhone, setFormatPhone] = useState<string>('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setName(firstName + ' ' + lastName);
  }, [firstName, lastName]);

  useEffect(() => {
    setPhone(formatPhoneNumber(route.params.phone));
    setFormatPhone(amplifyPhoneFormat(phone));
  }, [phone]);

  const invalidInput = (phoneNumber: string) => {
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    if (!phoneRegex.test(phone) && phoneNumber.length > 10) {
      setError('Invalid phone number');
      clearError();
      return true;
    } else if (password.includes(' ')) {
      setError('Password cannot contain spaces');
      clearError();
      return true;
    } else {
      return false;
    }
  };

  // sign the user up
  const signUp = async () => {
    if (invalidInput(formatPhone)) {
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      clearError();
      return;
    }
    if (!firstName) {
      setError('Please enter your first name');
      clearError();
      return;
    }
    if (!lastName) {
      setError('Please enter your last name');
      clearError();
      return;
    }
    try {
      await Auth.signUp({
        username: formatPhone,
        password,
        attributes: {
          phone_number: formatPhone,
          name: name,
        },
      });
      setSecureStoreItem('phone', phone);
      setSecureStoreItem('password', password);
      console.log('user successfully created');
      setError(undefined);
      clearError();
      navigation.navigate('ValidateUser', { step: 'validate', phone: formatPhone });
      await Analytics.logEvent('sign_up', {});
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log('Error: ', err);
      if (err.code == 'InvalidParameterException') {
        if (err.message == 'Username should be an email.') {
          setError('Please enter a valid email');
          clearError();
        } else if (err.message.includes('password')) {
          setError('Password must be at least 8 characters');
          clearError();
        } else {
          setError(err.message);
          clearError();
        }
      } else if (err.code == 'InvalidPasswordException') {
        setError('Password must be at least 8 characters');
        clearError();
      } else if (
        err.code === 'UserLambdaValidationException' &&
        err.message == 'PreSignUp failed with error phoneNumber already exists!.'
      ) {
        err.message = 'phone number already exists';
      } else {
        setError(err.message);
        clearError();
      }
    }
  };

  const setSecureStoreItem = async (key: string, value: string): Promise<void> => {
    return SecureStore.setItemAsync(key, value);
  };

  const clearError = () => {
    setTimeout(() => {
      setError(undefined);
    }, 3000);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} title="Groupify" />
        {route.params.step === 'create' && (
          <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.header}>Great! Let&apos;s set your account up.</Text>
                <FormInput
                  autoFocus={true}
                  returnKeyNext={true}
                  label="First Name"
                  placeholder="Enter first name"
                  onChangeText={(value) => {
                    setFirstName(value.trim());
                  }}
                />
                <FormInput
                  autoFocus={false}
                  returnKeyNext={true}
                  placeholder="Enter last name"
                  label="Last Name"
                  onChangeText={(value) => {
                    setLastName(value.trim());
                  }}
                />
                <FormInput
                  returnKeyNext={true}
                  label="Password"
                  placeholder="Enter password"
                  onChangeText={setPassword}
                  secureTextEntry={true}
                />
                <FormInput
                  returnKeyNext={false}
                  label="Confirm Password"
                  placeholder="Enter password"
                  onChangeText={setConfirmPassword}
                  secureTextEntry={true}
                />
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <TouchableOpacity onPress={signUp} activeOpacity={0.7} style={styles.button}>
                  <Text style={styles.buttonText}> Next </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
            <View style={{ height: 70 }} />
          </ScrollView>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  header: {
    fontSize: 22,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 28,
    backgroundColor: '#3F8A8D',
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 22,
    borderRadius: 5,
  },
  buttonText: {
    color: WHITE,
    fontSize: 20,
    fontWeight: '500',
  },
  error: {
    marginTop: 15,
    backgroundColor: 'red',
    textAlign: 'center',
    marginHorizontal: 30,
    color: 'white',
    fontSize: 18,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
