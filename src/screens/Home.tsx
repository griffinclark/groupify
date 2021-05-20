import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { globalStyles } from 'res/styles/GlobalStyles';
import { Event } from 'res/dataModels';
import { getAllUserEvents } from 'res/storageFunctions';
import { Auth } from 'aws-amplify';
import { Screen, Button, NavButton } from 'atoms/AtomsExports';
import { DataDisplay } from 'organisms/OrganismsExports';
import { Navbar } from 'molecules/MoleculesExports';

interface Props {
  navigation: any;
  route: any;
}

export const Home: React.FC<Props> = ({ navigation, route }: Props) => {
  const [feedData, setFeedData] = useState<Event[]>([]);

  useEffect(() => {
    getUserEvents();
  }, [route.params]); // only runs when route.params changes, need to change this in the future

  const getUserEvents = async () => {
    // console.log(await getAllUserEvents());
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
              navigation.navigate('ImportContacts');
            }}
            title="Edit Contacts"
          />
        </Navbar>
      </View>
      <View style={styles.feedContainer}>
        {feedData.length > 0 ? (
          <DataDisplay data={feedData} navigation={navigation} displayButton={false} />
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
