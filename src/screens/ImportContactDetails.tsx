import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WHITE, GREY_5, TEAL } from '../res/styles/Colors';
import { Button, Title, Screen, AlertModal } from '../atoms/AtomsExports';
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
  const [showRespondOptions, setShowRespondOptions] = useState(false);

  useEffect(() => {
    const awaitUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
      setShowRespondOptions(true);
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
      <Title>Import Contacts</Title>

      <View style={styles.flatListContainer}>
        <AppText style={{ fontSize: 20, paddingBottom: 20 }}>{createGreeting()}</AppText>
        <Image
          source={require('../../assets/Contacts-Graphic.png')}
          style={{ height: 186, width: '100%' }}
          resizeMode="contain"
        />
        <AppText style={{ fontSize: 20, marginBottom: '25%', paddingTop: 20 }}>
          From your contact list, please select all people you’d like to import into Groupify.*
        </AppText>

        <AppText style={{ alignSelf: 'center', paddingBottom: 20 }}>
          *You can always edit your contact list later.{' '}
        </AppText>
      </View>
      {showRespondOptions ? (
        <View style={styles.planResponse}>
          <TouchableOpacity onPress={() => setOpenModal(true)}>
            <AppText style={styles.skipStyle}>Skip</AppText>
          </TouchableOpacity>
          <Button
            title={'Select Contacts'}
            onPress={() => {
              navigation.navigate('ImportContacts');
            }}
          />
        </View>
      ) : (
        <View></View>
      )}
      {openModal && (
        <AlertModal
          onConfirm={() => navigation.navigate('Home')}
          onReject={() => setOpenModal(false)}
          message="Are you sure you don't want to import contacts? You must have contacts to make plans with, or to find plans being created. You can always edit your contact list later "
        />
      )}
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
  planResponse: {
    flexDirection: 'row',
    width: '50%',
  },
  skipStyle: {
    borderRadius: 20,
    paddingVertical: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 50,
    color: TEAL,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
