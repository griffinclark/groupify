import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WHITE, TEAL_0 } from '../res/styles/Colors';
import { Button, Screen, AppText } from '../atoms/AtomsExports';
import { RoutePropParams } from '../res/root-navigation';
import { getCurrentUser } from '../res/utilFunctions';
import { User } from '../models';
import { Image } from 'react-native-elements/dist/image/Image';
import { copy } from './../res/groupifyCopy';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
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
    <Screen style={{ backgroundColor: WHITE }}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <AppText style={{ fontWeight: '330', fontSize: 30, color: TEAL_0 }}>Import Contacts</AppText>

        <View style={styles.flatListContainer}>
          <AppText style={{ fontSize: 20, paddingBottom: 20 }}>{createGreeting()}</AppText>
          <Image
            source={require('../../assets/Contacts-Graphic.png')}
            style={{ height: 186, width: '100%' }}
            resizeMode="contain"
          />
          <AppText style={{ fontSize: 20, marginBottom: 40, paddingTop: 20 }}>{copy.askForContactsPrompt}</AppText>

          <AppText style={{ alignSelf: 'center' }}>{copy.editContactsLaterPrompt}</AppText>
        </View>
        <View style={styles.planResponse}>
          <Button
            buttonStyle={{ width: 210 }}
            title={'Import Contacts'}
            onPress={() => {
              navigation.navigate('ImportContacts', { last: 'ImportContactDetails' });
            }}
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  flatListContainer: {
    flexGrow: 1,
    flex: 1,
    paddingTop: 20,
    paddingBottom: 30,
  },
  planResponse: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
