import React, { useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { getAllImportedContacts, getUserPushToken, setUserPushToken } from '../res/storageFunctions';
import { registerForPushNotifications, getExpoPushToken } from '../res/notifications';
import { Contact, NavigationProps } from '../res/dataModels';
import { FormInput, Button, AppText, Screen } from '../atoms/AtomsExports';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { WHITE, TEAL_0 } from '../res/styles/Colors';
import { amplifyPhoneFormat, formatPhoneNumber } from '../res/utilFunctions';
import * as SecureStore from 'expo-secure-store';
import { RoutePropParams } from '../res/root-navigation';
import * as Analytics from 'expo-firebase-analytics';
import { copy } from '../res/groupifyCopy';
import { TopNavBar } from '../molecules/TopNavBar';
import { globalStyles } from '../res/styles/GlobalStyles';
import { JOST } from '../res/styles/Fonts';
import { User } from '../models';

export interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
}

export const LogIn: React.FC<Props> = ({ navigation, route }: Props) => {
  const [phone, setPhone] = useState('');
  // const [formatPhone, setFormatPhone] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState<string | undefined>();

  const getSecureStoreItems = async (): Promise<void> => {
    const savedPhone = await SecureStore.getItemAsync('phone');
    const savedPassword = await SecureStore.getItemAsync('password');

    if(savedPhone) setPhone(savedPhone);
    if(savedPassword) setPassword(savedPassword);
  };

  useEffect(() => {
    clearUserData();

    Hub.listen('auth', (event) => {
      console.log('auth event', event);
    });

    getSecureStoreItems();
  }, []);

  const clearUserData = async () => {
    await DataStore.clear();
    await DataStore.stop();
    await DataStore.start();
  };

  const handleLogin = async (currentUser: any): Promise<User> => {
    await registerForPushNotifications();
    const userQuery = await DataStore.query(User, (user) => user.phoneNumber('eq', currentUser.attributes.phone_number));
    const users = userQuery.map((user) => user);
    const token = await getUserPushToken();

    // if(users.length > 0) {
      const user = users[0];
      const pushTokenRegex = /ExponentPushToken\[.{22}]/;

      if(token && (!pushTokenRegex.test(token) || !pushTokenRegex.test(user.pushToken) || user.pushToken !== token)) {
        const newToken = await getExpoPushToken();

        await setUserPushToken(newToken);

        await DataStore.save(
          User.copyOf(user, (updated) => {
            updated.pushToken = newToken;
          }),
        );
      }

      return user;
    // }
    // else {
    //   console.log('new User');

    //   const newToken = await getExpoPushToken();
    //   await setUserPushToken(newToken);

    //   const newUser = await DataStore.save(
    //     new User({
    //       phoneNumber: currentUser.attributes.phone_number,
    //       name: currentUser.attributes.name,
    //       pushToken: newToken,
    //     })
    //   );

    //   return newUser;
    // }
  };

  const currentUserLogin = async (user: User, token: string | null): Promise<void> => {
    const pushTokenRegex = /ExponentPushToken\[.{22}]/;

    if(token && (!pushTokenRegex.test(token) || !pushTokenRegex.test(user.pushToken) || user.pushToken !== token)) {
      const newToken = await getExpoPushToken();

      await setUserPushToken(newToken);

      await DataStore.save(
        User.copyOf(user, (updated) => {
          updated.pushToken = newToken;
        }),
      );
    }
  }

  const newUserLogin = async (currentUser: any): Promise<User> => {
    console.log('new User');

    const newToken = await getExpoPushToken();
    await setUserPushToken(newToken);

    const newUser = await DataStore.save(
      new User({
        phoneNumber: currentUser.attributes.phone_number,
        name: currentUser.attributes.name,
        pushToken: newToken,
      })
    );

    return newUser;
  }

  const login = async (): Promise<void> => {
    setError(undefined);

    const formatPhone = amplifyPhoneFormat(phone);

    try {
      await Auth.signIn(formatPhone, password);

      setSecureStoreItem('phone', phone);
      setSecureStoreItem('password', password);

      const currentUser = await Auth.currentAuthenticatedUser();

      //const user = await handleLogin(currentUser);

      await registerForPushNotifications();
      const userQuery = await DataStore.query(User, (user) => user.phoneNumber('eq', currentUser.attributes.phone_number));

      const users = userQuery.map((user) => user);
      let user = null;
      const token = await getUserPushToken();

      //if(users.length > 0) {
        await currentUserLogin(users[0], token);

        user = users[0];

        console.log(user.id);
      //}
      // else {
      //   user = await newUserLogin(currentUser);
      // }

      const contacts: Contact[] = await getAllImportedContacts();

      if (contacts.length === 0) {
        navigation.navigate('ImportContactDetails', {});
      } else {
        if (user.id) {
          console.log('userr:', user?.id);
          navigation.push('SelectorMenu', { userID: user?.id, currentUser: user });
        }
      }
      await Analytics.logEvent('login', { userId: user?.id });
        
    }
    catch(err: any) {
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

  const setSecureStoreItem = async (key: string, value: string): Promise<void> => {
    return SecureStore.setItemAsync(key, value);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Screen style={{ backgroundColor: WHITE }}>
        <TopNavBar
          stickyHeader={false}
          navigation={navigation}
          displayGroupify={true}
          displayBackButton={true}
          displaySettings={false}
          route={route}
          targetScreen={'Welcome'}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true} testID="LogInScreen">
          <View style={styles.container}>
            <AppText style={[globalStyles.bodyLarge, styles.largeTitle]}>Login to Your Account</AppText>
            <FormInput 
              returnKeyNext={true}
              label="Phone Number"
              value={phone}
              onChangeText={(number) => setPhone(formatPhoneNumber(number))}
            />
            <FormInput 
              returnKeyNext={true}
              label="Password"
              onChangeText={setPassword}
              secureTextEntry={true}
              value={password}
            />
            <View>
              <TouchableOpacity 
                onPress={() => {console.log('click'); navigation.navigate('ForgotPassword', { step: 'phone'})}}
              >
                <AppText style={[globalStyles.bodyLarge, styles.linkButton]}>{copy.forgotPasswordQuestion}</AppText>
              </TouchableOpacity>

              <AppText style={[globalStyles.bodyLarge, {textAlign: 'center', marginTop: 50}]}>Don't have an account?</AppText>

              <TouchableOpacity 
                onPress={() => navigation.navigate('Welcome', {})}
              >
                <AppText style={[globalStyles.bodyLarge, styles.linkButton]}>Create one today!</AppText>
              </TouchableOpacity>
            </View>

            <Button
              buttonStyle={{ borderRadius: 5, width: Dimensions.get('screen').width - 40, marginTop: 60}}
              title={copy.loginButtonTitle}
              textStyle={{ fontSize: 20, fontFamily: JOST['500'] }}
              disabled={phone.trim().length === 0 && password.trim().length === 0}
              onPress={login}
            />
          </View>
        </TouchableWithoutFeedback>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  largeTitle: {
    marginBottom: 20
  },
  linkButton: {
    color: TEAL_0,
    textAlign: 'center',
    marginTop: 10
  }
});