import React, { useEffect, useState } from 'react';
import { API, Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { getAllImportedContacts, getUserPushToken, setUserPushToken } from '../res/storageFunctions';
import { registerForPushNotifications, getExpoPushToken } from '../res/notifications';
import { Contact } from '../res/dataModels';
import { Alert, FormInput, Button, Screen } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { User } from '../models';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { WHITE, TEAL } from '../res/styles/Colors';
import { amplifyPhoneFormat, formatPhoneNumber } from '../res/utilFunctions';
import * as SecureStore from 'expo-secure-store';
import { RoutePropParams } from '../res/root-navigation';
import * as queries from '../graphql/queries';
import * as Analytics from 'expo-firebase-analytics';

// const user = {
//   "_deleted": undefined,
//   "_lastChangedAt": undefined,
//   "_version": undefined,
//   "email": "placeHolder@temporaryWorkAround.com",
//   "friends": Array [],
//   "id": "x",
//   "name": "User Two",
//   "phoneNumber": "+15102057904",
//   "pushToken": "ExponentPushToken[v_oSimNdzGmTwk4-N4i-jT]",
//   "userAvailabilityId": null,
// }

export interface Props {
  navigation: {
    CreateAccount: {
      step: string;
      phone: string;
    };
    params: {
      Login: string;
    };
    navigate: (ev: string, {}) => void;
    push: (ev: string, {}) => void;
  };
  route: RoutePropParams;
}

export const LogIn: React.FC<Props> = ({ navigation, route }: Props) => {
  const [phone, setPhone] = useState('');
  const [formatPhone, setFormatPhone] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    clearUserData();
  }, []);

  const clearUserData = async () => {
    await DataStore.clear();
    await DataStore.stop();
    await DataStore.start();
  };

  useEffect(() => {
    setFormatPhone(amplifyPhoneFormat(phone));
  }, [phone]);

  const registerUser = async (): Promise<User> => {
    await registerForPushNotifications();
    const token = await getUserPushToken();
    const userInfo = await Auth.currentUserInfo();
    console.log('userInfo', userInfo);
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const userQuery: any = await API.graphql({
      query: queries.usersByPhoneNumber,
      variables: { phoneNumber: userInfo.attributes.phone_number },
    });
    console.log(typeof userQuery);
    const users = userQuery.data.usersByPhoneNumber.items;
    if (users.length > 0) {
      const user = users[0];
      const pushTokenRegex = /ExponentPushToken\[.{22}]/;
      if (token && (!pushTokenRegex.test(token) || !pushTokenRegex.test(user.pushToken) || user.pushToken !== token)) {
        console.log('Existing User: Updating users pushToken');
        const newToken = await getExpoPushToken();
        await setUserPushToken(newToken);
        await DataStore.save(
          User.copyOf(user, (updated) => {
            updated.pushToken = newToken;
          }),
        );
      }
      return user;
    } else {
      console.log('New User: Adding user to database');
      const newToken = await getExpoPushToken();
      await setUserPushToken(newToken);
      const newUser = await DataStore.save(
        new User({
          phoneNumber: userInfo.attributes.phone_number,
          name: userInfo.attributes.name,
          pushToken: newToken,
          
        }),
      );
      console.log('Created new user:');
      return newUser;
    }
  };

  const logIn = async (): Promise<void> => {
    setError(undefined);
    try {
      await Auth.signIn(formatPhone, password);
      setSecureStoreItem('phone', phone);
      setSecureStoreItem('password', password);
      console.log('successfully signed in');
      const user = await registerUser();
      console.log(user);
      const contacts: Contact[] = await getAllImportedContacts();
      if (contacts.length === 0) {
        navigation.navigate('ImportContactDetails', {});
      } else {
        if (user.id) {
          console.log(user);
          navigation.push('Home', { userID: user.id });
        }
      }
      await Analytics.logEvent('login', { userId: user.id });
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log('error signing in...', err);
      if (err.code == 'UserNotConfirmedException') {
        navigation.navigate('CreateAccount', { step: 'validate', phone: formatPhone });
      } else if (err.code == 'InvalidParameterException' && err.message.includes('Incorrect·username·or·password.')) {
        setError('Incorrect username or password.');
      } else if (
        err.code == 'InvalidParameterException' &&
        err.message.includes('Member must satisfy regular expression pattern')
      ) {
        setError('Please enter a valid phone number');
      } else if (err.code == 'InvalidParameterException' && err.message.includes('2 validation errors detected')) {
        setError('User does not exist');
      } else {
        if (err.code === 'UserNotFoundException' && formatPhone.length <= 11) {
          setError('Please enter a valid phone number');
        } else {
          setError(err.message);
        }
      }
    }
  };

  const getSecureStoreItems = async (): Promise<void> => {
    const savedPhone = await SecureStore.getItemAsync('phone');
    const savedPassword = await SecureStore.getItemAsync('password');
    if (savedPhone) setPhone(savedPhone);
    if (savedPassword) setPassword(savedPassword);
  };

  const setSecureStoreItem = async (key: string, value: string): Promise<void> => {
    return SecureStore.setItemAsync(key, value);
  };

  useEffect(() => {
    getSecureStoreItems();
  }, []);

  useEffect(() => {
    if (phone.trim() && password.trim()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [phone, password]);

  return (
    <Screen style={{ backgroundColor: WHITE, height: '100%', justifyContent: 'space-between' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
            <View style={{ alignSelf: 'center', flex: 1, marginTop: 20 }} testID="LogInScreen">
              <ImageBackground style={styles.logoBackground} source={require('../../assets/Login_Background.png')} />
              <ImageBackground style={styles.logo} source={require('../../assets/Splash_Logo.png')} />
            </View>
            <View>
              <FormInput
                returnKeyNext={true}
                label="Phone Number"
                value={phone}
                onChangeText={(number) => setPhone(formatPhoneNumber(number))}
              />
              <FormInput
                returnKeyNext={false}
                label="Password"
                onChangeText={setPassword}
                secureTextEntry={true}
                value={password}
              />
              <TouchableOpacity
                style={{ alignSelf: 'center' }}
                onPress={() => navigation.navigate('ForgotPassword', { step: 'phone' })}
              >
                <AppText style={styles.textTeal}>Forgot password?</AppText>
              </TouchableOpacity>
              {error && <Alert status="error" message={error} />}
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.createAccount}>
            <AppText style={styles.text}>Don&apos;t have an account?</AppText>
            <AppText
              style={styles.textTeal}
              onPress={async () => {
                navigation.navigate('CreateAccount', {});
              }}
            >
              Create one today!
            </AppText>
            {route.params && route.params.accountCreated === 'success' && (
              <Alert status={'success'} message={'Account successfully created!'} />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View>
        <Button title="Log In" onPress={logIn} disabled={disabled} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    margin: 20,
    fontSize: 30,
    fontWeight: '500',
  },
  logo: {
    alignSelf: 'center',
    width: 334,
    height: 107,
  },
  logoBackground: {
    width: 376,
    height: 158,
    alignSelf: 'center',
  },
  createAccount: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontWeight: '500',
    fontSize: 20,
  },
  textTeal: {
    color: TEAL,
    fontWeight: '500',
    fontSize: 20,
  },
});
