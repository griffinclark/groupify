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
import * as Font from 'expo-font';
import { Jost_400Regular, Jost_500Medium, Jost_600SemiBold, Jost_700Bold } from '@expo-google-fonts/jost';

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
  const [fontReady, setFontReady] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();

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

    facebookInit();

    const checkAuth = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        // const phoneNumber = (await Auth.currentUserInfo()).attributes.phone_number;

        const userQuery = await DataStore.query(User);
        const userd = userQuery.map((user) => user);

        setUserID(userd[0].id);

        setCurrentUser(userd[0]);

        const contacts: Contact[] = await getAllImportedContacts();
        if (contacts.length === 0) {
          setInitialScreen('ImportContactDetails');
        } else {
          setInitialScreen('SelectorMenu');
        }
      } catch (err) {
        console.log('user not signed in');
        console.log(err);
        setInitialScreen('Welcome');
      }
    };

    checkAuth();

    const loadFonts = async () => {
      await Font.loadAsync({
        Jost_400Regular,
        Jost_500Medium,
        Jost_600SemiBold,
        Jost_700Bold,
      });
      setFontReady(true);
    };
    loadFonts();
  }, []);

  return (
    <View style={globalStyles.defaultRootContainer}>
      {initalScreen == '' && !fontReady && <Text>Loading...</Text>}
      {initalScreen != '' && fontReady && (currentUser || initalScreen == 'Welcome') && (
        <RootNavigation initialRoute={initalScreen} initialParams={{ userID: userID }} />
      )}
    </View>
  );
};
