// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from 'react';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import { globalStyles } from './src/res/styles/GlobalStyles';
import Welcome from './src/screens/Welcome';
import { RootNavigation } from './src/res/root-navigation';
import awsconfig from './src/aws-exports';
import Amplify, { Auth, API } from 'aws-amplify';
import { getAllImportedContacts } from './src/res/storageFunctions';

import { Contact } from './src/res/dataModels';

Amplify.configure(awsconfig);

export default function App() {
  const [initalScreen, setInitialScreen] = useState('');
  LogBox.ignoreLogs(['source.uri should not be an empty string']); // This error pops up because of how we create the image view, but it isn't a big deal
  LogBox.ignoreLogs(['Setting a timer']); // No it doesn't...

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        console.log('user is signed in');
        let contacts: Contact[] = await getAllImportedContacts();
        if (contacts.length === 0) {
          setInitialScreen('ImportContacts');
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
      {/*TODO: replace with proper loading component later*/}
      {initalScreen == '' && <Text>Loading...</Text>}
      {initalScreen != '' && <RootNavigation initialRoute={initalScreen} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
