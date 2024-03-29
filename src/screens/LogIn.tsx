/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { getAllImportedContacts, getUserPushToken, setUserPushToken } from '../res/storageFunctions';
import { registerForPushNotifications, getExpoPushToken } from '../res/notifications';
import { Contact } from '../res/dataModels';
import { Alert, FormInput, Button } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { User } from '../models';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { JOST } from '../res/styles/Fonts';

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
} from 'react-native';
import { WHITE, TEAL_0 } from '../res/styles/Colors';
import { amplifyPhoneFormat, formatPhoneNumber } from '../res/utilFunctions';
import * as SecureStore from 'expo-secure-store';
import { RoutePropParams } from '../res/root-navigation';
import * as Analytics from 'expo-firebase-analytics';
import { copy } from '../res/groupifyCopy';
import { TopNavBar } from '../molecules/TopNavBar';
import { ActivityIndicator } from 'react-native-paper';

export interface Props {
  navigation: {
    CreateAccount: {
      step: any;
      phone: any;
    };
    params: {
      Login: string;
    };
    navigate: (ev: any, {}) => void;
    push: (ev: any, {}) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
}

export const LogIn: React.FC<Props> = ({ navigation, route }: Props) => {
  const [phone, setPhone] = useState('');
  const [formatPhone, setFormatPhone] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState<string | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [info, setInfo] = useState();
  const [currentUser, setCurrentUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    Hub.listen('auth', (event) => {
      console.log('auth event', event);
    });
    getSecureStoreItems();
    clearUserData();
  }, []);

  useEffect(() => {
    let subscription: any = undefined;

    const removeListener = Hub.listen('datastore', async (capsule) => {
      const {
        payload: { event, data },
      } = capsule;

      // console.log('DataStore Event', event, data);

      if (event === 'ready') {
        if (subscription) {
          removeListener();
        }
      }
    });

    const loadDataStore = async () => {
      const users = await DataStore.query(User, (user) => user.phoneNumber('eq', formatPhone), { limit: 1 });

      if (users.length === 1) {
        setUsers(users);
        return;
      }

      //eslint-disable-next-line  @typescript-eslint/no-unused-vars
      subscription = DataStore.observe(User).subscribe(({ element, ...x }) => {
        if (element.phoneNumber == formatPhone) {
          users.push(element);
        }

        if (users.length) {
          subscription.unsubscribe();
          setUsers(users);
          return;
        }
      });
    };

    if (info) {
      loadDataStore();
    }

    return () => {
      removeListener();

      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [info]);

  const clearUserData = async () => {
    await DataStore.clear();
  };

  useEffect(() => {
    setFormatPhone(amplifyPhoneFormat(phone));
  }, [phone]);

  useEffect(() => {
    if (currentUser?.id) {
      loginExisting();
      importContacts();
    }
  }, [currentUser]);

  useEffect(() => {
    if (users.length) {
      setCurrentUser(users[0]);
    }
  }, [users]);

  /*const registerUser = async (): Promise<User> => {
    await registerForPushNotifications();
    const token = await getUserPushToken();
    const userInfo = await Auth.currentUserInfo();
    const userQuery = await DataStore.query(User, (user) => user.phoneNumber('eq', userInfo.attributes.phone_number));
    const users = userQuery.map((user) => user);
    if (users.length > 0) {
      const user = users[0];
      console.log('user login', user);
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
      console.log('Existing User: Returning user', user);
      return user;
    } else {
      console.log('New User: Adding user to database');
      const newToken = await getExpoPushToken();
      await setUserPushToken(newToken);
      console.log('newToken', newToken);
      const newUser = await DataStore.save(
        new User({
          phoneNumber: userInfo.attributes.phone_number,
          name: userInfo.attributes.name,
          pushToken: newToken,
        }),
      );
      console.log('Created new user:');
      console.log('newUser', newUser);
      return newUser;
    }
  };*/

  const loginExisting = async () => {
    if (currentUser) {
      await registerForPushNotifications();
      const token = await getUserPushToken();
      const pushTokenRegex = /ExponentPushToken\[.{22}]/;
      if (
        token &&
        (!pushTokenRegex.test(token) || !pushTokenRegex.test(currentUser.pushToken) || currentUser.pushToken !== token)
      ) {
        console.log('Existing User: Updating users pushToken');
        const newToken = await getExpoPushToken();
        await setUserPushToken(newToken);
        await DataStore.save(
          User.copyOf(currentUser, (updated) => {
            updated.pushToken = newToken;
          }),
        );
      }
      setIsLoading(false);
      await Analytics.logEvent('login', { userId: currentUser.id });
      navigation.push('SelectorMenu', { userID: currentUser.id, currentUser: currentUser });
    }
  };

  const importContacts = async () => {
    if (currentUser) {
      const contacts: Contact[] = await getAllImportedContacts();

      if (contacts.length === 0) {
        navigation.navigate('ImportContactDetails', {});
      }
    }
  };

  const logIn = async (): Promise<void> => {
    setError(undefined);
    setIsLoading(true);

    try {
      await Auth.signIn(formatPhone, password);

      setSecureStoreItem('phone', phone);
      setSecureStoreItem('password', password);

      //const newPushToken = await registerForPushNotifications();

      //console.log('kk', newPushToken);

      const currentUser = await Auth.currentUserInfo();
      setInfo(currentUser);
      //const userQuery = await DataStore.query(User, (user) => user.phoneNumber('eq', currentUser.attributes.phone_number));

      //console.log(userQuery);

      // if(userQuery.length) {
      //   const user = userQuery[0];

      //   console.log(user);

      // navigation.push('ImportContactDetails', {});
      // }

      //const user = await registerUser();

      // const contacts: Contact[] = await getAllImportedContacts();
      // if (contacts.length === 0) {
      //   navigation.navigate('ImportContactDetails', {});
      // } else {
      //   if (user.id) {
      //     console.log('userr:', user.id);
      //     navigation.push('SelectorMenu', { userID: user.id, currentUser: user });
      //   }
      // }
      // await Analytics.logEvent('login', { userId: user.id });
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setIsLoading(false);
      console.log('error signing in...', err);
      if (err.code == 'UserNotConfirmedException') {
        navigation.navigate('createAccountForm', { step: 'create', phone: formatPhone });
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
    if (phone.trim() && password.trim()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [phone, password]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopNavBar
        stickyHeader={false}
        navigation={navigation}
        displayGroupify={true}
        displayBackButton={true}
        displaySettings={false}
        route={route}
        targetScreen={'Welcome'}
      />
      <View testID="LogInScreen">
        <Text style={styles.loginText}>Login to Your Account</Text>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
            <View style={{ marginTop: 80 }}>
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
              <View style={{ marginHorizontal: 118 }}>
                <TouchableOpacity
                  style={{ marginHorizontal: 0, alignSelf: 'center' }}
                  onPress={() => navigation.navigate('ForgotPassword', { step: 'phone' })}
                >
                  <AppText style={styles.textTeal}>{copy.forgotPasswordTitle}</AppText>
                </TouchableOpacity>
                {error && <Alert status="error" message={error} />}
              </View>
            </View>

            <View style={styles.createAccount}>
              <Text style={styles.text}>{copy.dontHaveAnAccountQuestion}</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('VerifyPhone', {})}>
                <Text style={styles.textTeal}>{copy.createAccount}</Text>
              </TouchableOpacity>
              {route.params && route.params.accountCreated === 'success' && (
                <Alert status={'success'} message={'Account successfully created!'} />
              )}
            </View>
            <View>
              {isLoading ? (
                <View>
                  <ActivityIndicator color="black" size={'large'} />
                </View>
              ) : (
                <Button
                  buttonStyle={{ width: 335, height: 47, borderRadius: 5 }}
                  textStyle={{ fontSize: 20, fontFamily: JOST['500'] }}
                  title={copy.loginButtonTitle}
                  onPress={logIn}
                  disabled={disabled}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
          <View style={{ height: 70 }} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  createAccount: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 60,
  },
  text: {
    fontFamily: JOST['400'],
    fontSize: 20,
    marginBottom: 10,
  },
  textTeal: {
    color: TEAL_0,
    fontFamily: JOST['400'],
    fontSize: 20,
  },
  logoImg: {
    alignSelf: 'center',
    marginVertical: 40,
  },
  safeArea: {
    backgroundColor: WHITE,
    flex: 1,
    // justifyContent: 'space-between',
  },
  loginText: {
    marginTop: 29,
    marginLeft: 20,
    fontSize: 20,
    fontFamily: JOST['400'],
  },
});
