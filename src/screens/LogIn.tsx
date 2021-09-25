import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { getAllImportedContacts } from '../res/storageFunctions';
import { registerForPushNotifications, getExpoPushToken } from '../res/notifications';
import { Contact } from '../res/dataModels';
import { Alert, FormInput, Button, Screen } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { User } from '../models';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Keyboard, StyleSheet, View } from 'react-native';
import { background, TEAL } from '../res/styles/Colors';
import { amplifyPhoneFormat, formatPhoneNumber } from '../res/utilFunctions';
import { Image } from 'react-native-elements/dist/image/Image';
import * as SecureStore from 'expo-secure-store';
import { RoutePropParams } from '../res/root-navigation';

interface Props {
  navigation: {
    CreateAccount: {
      step: string;
      phone: string;
    };
    params: {
      Login: string;
    };
    navigate: (ev: string, {}) => void;
    push: (ev: string, e: { email: string; step: string }) => void;
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
    const token = await getExpoPushToken();
    const userInfo = await Auth.currentUserInfo();
    const users = await DataStore.query(User, (user) => user.phoneNumber('eq', userInfo.attributes.phone_number));
    if (users.length > 0) {
      const user = users[0];
      if (user.pushToken !== token) {
        console.log('Existing User: Updating users pushToken');
        await DataStore.save(
          User.copyOf(user, (updated) => {
            updated.pushToken = token;
          }),
        );
      }
      return user;
    } else {
      console.log('New User: Adding user to database');
      const newUser = await DataStore.save(
        new User({
          phoneNumber: userInfo.attributes.phone_number,
          name: userInfo.attributes.name,
          pushToken: token,
          friends: [],
        }),
      );
      console.log('Created new user:');
      return newUser;
    }
  };

  const logIn = async () => {
    setError(undefined);
    // navigation.navigate('Home', { userID: '669d681e-7dbe-47e2-ad1c-4c894074366a' });
    try {
      await Auth.signIn(formatPhone, password);
      setSecureStoreItem('phone', phone);
      setSecureStoreItem('password', password);
      console.log('successfully signed in');
      const user = await registerUser();
      const contacts: Contact[] = await getAllImportedContacts();
      if (contacts.length === 0) {
        navigation.navigate('ImportContactDetails', {});
      } else {
        if (user.id) {
          console.log(user);
          navigation.navigate('Home', { userID: user.id });
        }
      }
    } catch (err: any) {
      console.log('error signing in...', err);
      if (err.code == 'UserNotConfirmedException') {
        navigation.navigate('CreateAccount', { step: 'validate', phone: formatPhone });
      } else if (err.code == 'InvalidParameterException' && err.message.includes('Incorrect·username·or·password.')) {
        setError('Incorrect username or password.');
      } else if (err.code == 'InvalidParameterException' && err.message.includes('2 validation errors detected')) {
        setError('User does not exist');
      } else {
        setError(err.message);
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
    <Screen style={{ backgroundColor: background, justifyContent: 'space-evenly' }}>
      <View style={{ alignSelf: 'center', flex: 1, marginTop: 80 }}>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
        <AppText style={styles.title}>Log In</AppText>
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
      </TouchableWithoutFeedback>
      <View style={styles.createAccount}>
        <AppText style={styles.text}>
          Don&apos;t have an account? Create one
          <AppText
            style={styles.textTeal}
            onPress={async () => {
              navigation.navigate('CreateAccount', {});
            }}
          >
            {' '}
            here
          </AppText>
        </AppText>
        {route.params && route.params.accountCreated === 'success' && (
          <Alert status={'success'} message={'Account successfully created!'} />
        )}
      </View>
      <View style={{ flex: 1 }}>
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
    width: 318,
    height: 98,
  },
  createAccount: {
    flex: 1,
    alignSelf: 'center',
    marginVertical: 40,
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
