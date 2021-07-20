import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { globalStyles } from './../res/styles/GlobalStyles';
import { Event } from '../res/dataModels';
import { getAllUserEvents } from './../res/storageFunctions';
import { Screen, Button, NavButton } from '../atoms/AtomsExports';
import { DataDisplay } from '../organisms/OrganismsExports';
import { Navbar } from '../molecules/MoleculesExports';
import { RoutePropParams } from '../res/root-navigation';
import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../models';

interface Props {
  navigation: {
    CreateAccount: {
      step: string;
      email: string;
    };
    params: {
      Login: string;
    };
    navigate:
      | ((ev: string, a?: { step?: string; email?: string }) => void)
      | ((ev: string, a?: { data?: { prevAction?: string } }) => void)
      | ((ev: string, a?: { user: User }) => void);
    push: (ev: string, e: { email: string; step: string }) => void;
  };
  route: RoutePropParams;
}

export const Home: React.FC<Props> = ({ navigation, route }: Props) => {
  const [feedData, setFeedData] = useState<Event[]>([]);

  useEffect(() => {
    (async () => {
      let user: User | undefined;
      if (route.params.user) {
        user = await DataStore.query(User, route.params.user.id);
      }
      if (user) {
        route.params.user = user;
      }
    })();
    getUserEvents();
    console.log('Current user');
    console.log(route.params.user);
  }, [route.params]);

  const getUserEvents = async () => {
    const events = await getAllUserEvents();
    setFeedData(events);
  };

  return (
    <Screen>
      <View style={styles.navbar}>
        <Navbar>
          <NavButton
            onPress={async () => {
              try {
                await Auth.signOut();
                console.log('successfully signed out');
                navigation.navigate('Welcome');
              } catch (err) {
                console.log('error signing out...', err);
              }
            }}
            title="Log Out"
          />
          <NavButton
            onPress={() => {
              navigation.navigate('SetAvailability', { user: route.params.user });
            }}
            title="Edit Availability"
          />
          <NavButton
            onPress={() => {
              navigation.navigate('ImportContacts');
            }}
            title="Edit Contacts"
          />
        </Navbar>
      </View>
      <View style={styles.feedContainer}>
        {feedData.length > 0 ? (
          <DataDisplay data={feedData} />
        ) : (
          <View style={styles.title}>
            <Text style={globalStyles.superTitle}>When you create an event, it will show up here</Text>
          </View>
        )}
      </View>
      <View style={styles.button}>
        <Button
          title="Create event"
          onPress={() => {
            navigation.navigate('CreateCustomEvent');
          }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flex: 1.5,
    justifyContent: 'center',
  },
  feedContainer: {
    flex: 10,
  },
  title: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    flex: 1.5,
    justifyContent: 'center',
  },
});
