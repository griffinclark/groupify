import React, { useEffect, useState } from 'react';
import { LogBox, Text, View } from 'react-native';
import { globalStyles } from './src/res/styles/GlobalStyles';
import { RootNavigation } from './src/res/root-navigation';
import awsconfig from './src/aws-exports';
import Amplify, { API, Auth } from 'aws-amplify';
import { getAllImportedContacts } from './src/res/storageFunctions';
import { Contact } from './src/res/dataModels';
import * as Notifications from 'expo-notifications';
import * as queries from './src/graphql/queries';

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
  LogBox.ignoreLogs(['source.uri should not be an empty string']);
  LogBox.ignoreLogs(['Setting a timer']);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        console.log('user is signed in');
        const phoneNumber = (await Auth.currentUserInfo()).attributes.phone_number;
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        const userQuery: any = await API.graphql({
          query: queries.usersByPhoneNumber,
          variables: { phoneNumber: phoneNumber },
        });
        const users = userQuery.data.usersByPhoneNumber.items;
        const user = users[0];
        setUserID(user.id);
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
