/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect, useRef } from 'react';
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
} from 'react-native';
import { Header } from '../atoms/Header';
import { WHITE } from '../res/styles/Colors';
import { FormInput } from '../atoms/FormInput';
import { RoutePropParams } from '../res/root-navigation';
import CodeInput from 'react-native-confirmation-code-input';
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
  const [disabled, setDisabled] = useState(true);
  const [validationCode, setValidationCode] = useState('');
  const [formatPhone, setFormatPhone] = useState<string>('');
  const [success, setSuccess] = useState<string | undefined>();

  const confirmRef = useRef<CodeInput>(null);

  useEffect(() => {
    if (route.params.step == 'create' && password && name && firstName && lastName && phone && confirmPassword) {
      setDisabled(false);
    } else if (route.params.step == 'validate' && validationCode) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, firstName, lastName, name, phone, formatPhone, validationCode, confirmPassword]);

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

  //   const validateUser = async () => {
  //     try {
  //       await Auth.confirmSignUp(route.params.phone, validationCode);
  //       navigation.navigate('Login', { accountCreated: 'success' });
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     } catch (err: any) {
  //       console.log('Error: ', err);
  //       setError(err.message);
  //       clearError();
  //       setSuccess(undefined);
  //     }
  //   };

  const setSecureStoreItem = async (key: string, value: string): Promise<void> => {
    return SecureStore.setItemAsync(key, value);
  };

  const clearError = () => {
    setTimeout(() => {
      setError(undefined);
    }, 3000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: WHITE }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={{ backgroundColor: WHITE, flex: 1 }}>
        <Header navigation={navigation} title="Groupify" />
        {route.params.step === 'create' && (
          <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 22, paddingVertical: 20, paddingHorizontal: 10 }}>
                  Great! Let&apos;s set your account up.
                </Text>
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
                  // submit={}
                  returnKeyNext={false}
                  label="Confirm Password"
                  placeholder="Enter password"
                  onChangeText={setConfirmPassword}
                  secureTextEntry={true}
                />
                <TouchableOpacity
                  onPress={signUp}
                  activeOpacity={0.7}
                  disabled={disabled}
                  style={{
                    marginTop: 28,
                    backgroundColor: '#3F8A8D',
                    alignItems: 'center',
                    paddingVertical: 12,
                    marginHorizontal: 22,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: WHITE, fontSize: 20, fontWeight: '500' }}> Next </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
            <View style={{ height: 70 }} />
          </ScrollView>
        )}
        {/* {route.params.step === 'validate' && (
          <ScrollView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 22, marginVertical: 18, fontWeight: '500' }}>
                  Please enter the verification code you received.
                </Text>
                <CodeInput
                  ref={confirmRef}
                  className={'border-b'}
                  space={10}
                  size={48}
                  inputPosition="left"
                  onFulfill={(code: any) => setValidationCode(code)}
                  containerStyle={{ marginTop: 5 }}
                  codeInputStyle={{ borderBottomWidth: 1.5, borderBottomColor: 'black', fontSize: 23 }}
                  activeColor="black"
                  keyboardType="numeric"
                  codeLength={6}
                />
                <TouchableOpacity>
                  <Text style={{ fontSize: 20, color: '#3F8A8D', marginTop: 45, fontWeight: '500' }}>
                    Send New Verification Code
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        )} */}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
