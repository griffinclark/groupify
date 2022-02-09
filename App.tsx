import React, { useEffect, useState } from 'react';
import { LogBox, Text, View } from 'react-native';
import { globalStyles } from './src/res/styles/GlobalStyles';
import { RootNavigation } from './src/res/root-navigation';
import { User } from './src/models';
import awsconfig from './src/aws-exports';
import { DataStore } from '@aws-amplify/datastore';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { getAllImportedContacts } from './src/res/storageFunctions';
import { Contact } from './src/res/dataModels';
import * as Notifications from 'expo-notifications';
import { facebookInit } from './src/res/facebookTracking';
import { useFonts, Jost_400Regular, Jost_500Medium, Jost_600SemiBold } from '@expo-google-fonts/jost';
Amplify.configure(awsconfig);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const App: React.FC = () => {
  const [initalScreen, setInitialScreen] = useState('');
  const [userID, setUserID] = useState('');
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_500Medium,
    Jost_600SemiBold,
  });

  if (!fontsLoaded) return null;

  LogBox.ignoreLogs([
    // eslint-disable-next-line quotes
    `'requestPermissionsAsync()' is now deprecated.`,
    // eslint-disable-next-line quotes
    `AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage`,
    'FirebaseAnalytics.setCurrentScreen` is deprecated.',
    'Non-serializable values were found in the navigation state',
    'source.uri should not be an empty string',
    'Setting a timer',
    // eslint-disable-next-line quotes
    `[Unhandled promise rejection: TypeError: undefined is not an object (evaluating 'userInfo.attributes.phone_number')]`,
  ]);

  useEffect(() => {
    Hub.listen('auth', (event) => {
      console.log('auth event', event);
    });
  }, []);

  useEffect(() => {
    facebookInit();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        console.log('user is signed in');
        // const phoneNumber = (await Auth.currentUserInfo()).attributes.phone_number;

        const userQuery = await DataStore.query(User);
        const userd = userQuery.map((user) => user.id);

        setUserID(userd[0]);
        const contacts: Contact[] = await getAllImportedContacts();
        if (contacts.length === 0) {
          setInitialScreen('ImportContactDetails');
        } else {
          setInitialScreen('Home');
        }
      } catch (err) {
        console.log('user not signed in');
        console.log(err);
        setInitialScreen('Welcome');
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
