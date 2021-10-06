import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WHITE, TEAL } from '../res/styles/Colors';
import { Button, Screen, AlertModal } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { RoutePropParams } from '../res/root-navigation';
import { getCurrentUser } from '../res/utilFunctions';
import { User } from '../models';
import { Image } from 'react-native-elements/dist/image/Image';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  navigation: {
    navigate: (ev: string) => void;
  };
  route: RoutePropParams;
}

export const ImportContactDetails: React.FC<Props> = ({ navigation }: Props) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [openModal, setOpenModal] = useState(false);

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
        <AppText style={{ fontWeight: '330', fontSize: 30, color: TEAL }}>Import Contacts</AppText>

        <View style={styles.flatListContainer}>
          <AppText style={{ fontSize: 20, paddingBottom: 20 }}>{createGreeting()}</AppText>
          <Image
            source={require('../../assets/Contacts-Graphic.png')}
            style={{ height: 186, width: '100%' }}
            resizeMode="contain"
          />
          <AppText style={{ fontSize: 20, marginBottom: 40, paddingTop: 20 }}>
            From your contact list, please select all people you’d like to import into Groupify.*
          </AppText>

          <AppText style={{ alignSelf: 'center' }}>*You can always edit your contact list later. </AppText>
        </View>
        <View style={styles.planResponse}>
          <TouchableOpacity onPress={() => setOpenModal(true)}>
            <AppText style={styles.skipStyle}>Skip</AppText>
          </TouchableOpacity>
          <Button
            buttonStyle={{ width: 210 }}
            title={'Select Contacts'}
            onPress={() => {
              navigation.navigate('ImportContacts');
            }}
          />
        </View>
        {openModal && (
          <AlertModal
            button1Text="Yes"
            button2Text="Close"
            message2="You must have contacts to make plans with, or to find plans being created. You can always edit your contact list later. "
            onButton1Press={() => navigation.navigate('Home')}
            onButton2Press={() => setOpenModal(false)}
            message="Are you sure you don't want to import contacts? "
          />
        )}
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
    marginHorizontal: '5%',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipStyle: {
    color: TEAL,
    fontWeight: '900',
    fontSize: 20,
  },
});
