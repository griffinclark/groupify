import React, { useEffect, useState } from 'react';
import { LogBox, Text, View } from 'react-native';
import { globalStyles } from './src/res/styles/GlobalStyles';
import { RootNavigation } from './src/res/root-navigation';
import awsconfig from './src/aws-exports';
import Amplify, { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { getAllImportedContacts } from './src/res/storageFunctions';
import { Contact } from './src/res/dataModels';
import { User } from './src/models';
import * as SecureStore from 'expo-secure-store';

Amplify.configure(awsconfig);

export const App: React.FC = () => {
  const [initalScreen, setInitialScreen] = useState('');
  const [userID, setUserID] = useState('');
  LogBox.ignoreLogs(['source.uri should not be an empty string']);
  LogBox.ignoreLogs(['Setting a timer']);

  const hasLoggedIn = async (): Promise<boolean> => {
    const savedPhone = await SecureStore.getItemAsync('phone');
    return savedPhone ? true : false;
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        console.log('user is signed in');
        const phoneNumber = (await Auth.currentUserInfo()).attributes.phone_number;
        const users = await DataStore.query(User, (user) => user.phoneNumber('eq', phoneNumber));
        const user = users[0];
        setUserID(user.id);
        const contacts: Contact[] = await getAllImportedContacts();
        if (contacts.length === 0) {
          setInitialScreen('ImportContacDetails');
        } else {
          setInitialScreen('Home');
        }
      } catch (err) {
        console.log('user not signed in');
        console.log(err);
        (await hasLoggedIn()) ? setInitialScreen('Login') : setInitialScreen('CreateAccount');
      }
    };
    checkAuth();
  }, []);

  return (
    <View style={globalStyles.defaultRootContainer}>
      {initalScreen == '' && <Text>Loading...</Text>}
      {initalScreen != '' && <RootNavigation initialRoute={initalScreen} initialParams={{ userID: userID }} />}
    </View>
  );
};
