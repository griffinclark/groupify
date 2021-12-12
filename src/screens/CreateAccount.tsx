/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoutePropParams } from '../res/root-navigation';
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { Screen, FormInput, Button, Alert } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { WHITE, TEAL } from '../res/styles/Colors';
import { amplifyPhoneFormat, formatPhoneNumber } from '../res/utilFunctions';
import * as SecureStore from 'expo-secure-store';
import { ScrollView } from 'react-native-gesture-handler';
import { BackChevronIcon } from '../../assets/Icons/IconExports';
import * as Analytics from 'expo-firebase-analytics';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
    push: (ev: any, e: { phone: any; step: string }) => void;
  };
  route: RoutePropParams;
}

export const CreateAccount: React.FC<Props> = ({ navigation, route }: Props) => {
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [formatPhone, setFormatPhone] = useState<string>('');
  const [validationCode, setCode] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState<string | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [success, setSuccess] = useState<string | undefined>();

  useEffect(() => {
    if (
      route.params.step == 'create' &&
      password &&
      name &&
      firstName &&
      lastName &&
      phone &&
      phone.length === 14 &&
      confirmPassword
    ) {
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
    setPhone(formatPhoneNumber(phone));
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
      navigation.push('CreateAccount', { step: 'validate', phone: formatPhone });
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

  const validateUser = async () => {
    try {
      await Auth.confirmSignUp(route.params.phone, validationCode);
      navigation.navigate('Login', { accountCreated: 'success' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log('Error: ', err);
      setError(err.message);
      clearError();
      setSuccess(undefined);
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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Screen style={{ backgroundColor: WHITE, height: Dimensions.get('screen').height }}>
        <ScrollView testID="CreateAccountScreen">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
            {route.params.step === 'create' && (
              <View>
                <View>
                  <View style={{ flexDirection: 'row', paddingBottom: 20, marginHorizontal: 20 }}>
                    <BackChevronIcon onPress={() => navigation.navigate('Welcome', {})} />
                    <AppText style={styles.title}>Create Account</AppText>
                  </View>
                  <FormInput
                    autoFocus={false}
                    returnKeyNext={true}
                    label="First Name"
                    onChangeText={(value) => {
                      setFirstName(value.trim());
                    }}
                  />
                  <FormInput
                    autoFocus={false}
                    returnKeyNext={true}
                    label="Last Name"
                    onChangeText={(value) => {
                      setLastName(value.trim());
                    }}
                  />
                  <FormInput
                    returnKeyNext={true}
                    value={phone}
                    label="Phone Number"
                    onChangeText={(value) => {
                      setPhone(formatPhoneNumber(value));
                    }}
                  />
                  <FormInput returnKeyNext={true} label="Password" onChangeText={setPassword} secureTextEntry={true} />
                  <FormInput
                    submit={signUp}
                    returnKeyNext={false}
                    label="Confirm Password"
                    onChangeText={setConfirmPassword}
                    secureTextEntry={true}
                  />
                  {error && <Alert status="error" message={error} />}
                </View>
              </View>
            )}
            {route.params.step === 'validate' && (
              <View style={styles.validateContainer}>
                <View>
                  <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                    <BackChevronIcon onPress={() => navigation.navigate('Welcome', {})} />
                    <AppText style={styles.title}>Verify Phone Number</AppText>
                  </View>
                  <View>
                    <AppText style={styles.details}>Please enter the verification code you received.</AppText>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
                      <FormInput
                        returnKeyNext={false}
                        autoFocus={true}
                        label="Verification Code"
                        onChangeText={(value) => {
                          setCode(value.trim());
                        }}
                        secureTextEntry={true}
                      />
                      {error && <Alert status="error" message={error} />}
                      {/* {success && <Alert status="success" message={success} />} */}

                      {/* <TouchableOpacity
                        onPress={() => {
                          try {
                            console.log(route.params.phone);
                            Auth.resendSignUp(route.params.phone);
                            setSuccess('Sent new verification code');
                            setError(undefined);
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          } catch (err: any) {
                            console.log(err);
                            setError(err.message);
                            clearError();
                          }
                        }}
                        style={styles.buttonStyle}
                      >
                        <AppText style={{ fontSize: 16, color: TEAL, paddingBottom: 80 }}>
                          Send New Verification Code
                        </AppText>
                      </TouchableOpacity> */}
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>
            )}
          </TouchableWithoutFeedback>
        </ScrollView>
        <Button title="Next" onPress={route.params.step === 'validate' ? validateUser : signUp} disabled={disabled} />
      </Screen>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 15,
    color: TEAL,
    fontSize: 30,
    fontWeight: '400',
  },
  buttonStyle: {
    borderRadius: 0,
    paddingVertical: 10,
    paddingHorizontal: 15,
    paddingBottom: 50,
    marginVertical: 10,
    marginHorizontal: 'auto',
    minWidth: 150,
    alignItems: 'center',
  },
  validateContainer: {
    height: Dimensions.get('screen').height - 75,
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  details: {
    fontSize: 20,
    paddingBottom: 50,
    paddingTop: 20,
  },
});
