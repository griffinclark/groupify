import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { background, GREY_5 } from '../res/styles/Colors';
import { Button, Title, Screen } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { RoutePropParams } from '../res/root-navigation';
import { getCurrentUser } from '../res/utilFunctions';
import { User } from '../models';
import { Image } from 'react-native-elements/dist/image/Image';

interface Props {
  navigation: {
    navigate: (ev: string) => void;
  };
  route: RoutePropParams;
}

export const ImportContactDetails: React.FC<Props> = ({ navigation }: Props) => {
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const awaitUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };
    awaitUser();
  }, []);

  const createGreeting = () => {
    if (currentUser) {
      const firstName = currentUser.name.includes(' ')
        ? currentUser.name.substr(0, currentUser.name.indexOf(' '))
        : currentUser?.name;
      return `Welcome, ${firstName}! Let’s get started! The most important part of this app is to have friends on to invite to your shindigs.`;
    }
  };
  return (
    <Screen style={{ backgroundColor: background }}>
      <Title>Import Contacts</Title>

      <View style={styles.flatListContainer}>
        <AppText style={{ fontSize: 20, paddingBottom: 20 }}>{createGreeting()}</AppText>
        <Image source={require('../../assets/Contacts-Graphic.png')} style={{ width: '100%', height: 186 }} />
        <AppText style={{ fontSize: 20, marginBottom: 240, paddingTop: 20 }}>
          From your contact list, please select all people you’d like to import into Groupify.*
        </AppText>

        <AppText style={{ alignSelf: 'center', paddingBottom: 20 }}>
          *You can always edit your contact list later.{' '}
        </AppText>
      </View>

      <View style={styles.footer}>
        <Button
          title="Select Contacts"
          onPress={() => {
            navigation.navigate('ImportContacts');
          }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  contactContainer: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 26,
  },
  flatListContainer: {
    flexGrow: 1,
    flex: 1,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
  friendContainer: {
    backgroundColor: GREY_5,
    borderRadius: 10,
    padding: 10,
  },

  footer: {
    bottom: 0,
    textAlignVertical: 'center',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
});
