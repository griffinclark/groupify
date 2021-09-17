import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { GOLD, TEAL, WHITE } from '../res/styles/Colors';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { User, Plan } from '../models';
import { AppText } from '../atoms/AppText';
import Announce from '../../assets/Announce.svg';

interface Props {
  user?: User;
  style?: Record<string, unknown>;
  plan: Plan;
  navigation: {
    navigate: (ev: string, {}) => void;
  };
}

export const HomeNavBar: React.FC<Props> = ({ user, style, plan, navigation }: Props) => {
  return (
    <View style={{ width: '100%' }}>
      <View style={[styles.nav, style]}>
        <TouchableOpacity
          onPress={() => {
            navigation?.navigate('InvitedPlans', {
              currentUser: user,
              currentUserPlan: plan,
            });
          }}
        >
          <Announce width={48} height={48} />
          <Icon name="megaphone-outline" size={50} type="ionicon" color={'white'} />
          <AppText style={styles.text}>Notifications</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SearchPlace', { currentUser: user });
          }}
        >
          <Icon name="plus-circle" type="font-awesome" size={50} color={'white'} />
          <AppText style={styles.text}>Create Plan</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation?.navigate('Profile', { currentUser: user, currentUserPlan: plan });
          }}
        >
          <Icon name="user" size={50} type="antdesign" color={'white'} />
          <AppText style={styles.text}>Profile</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  planOptions: {
    alignItems: 'center',
    backgroundColor: WHITE,
    borderColor: GOLD,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: '7%',
    paddingBottom: '10%',
    padding: 10,
  },
  nav: {
    width: '100%',
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: TEAL,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 10,
    color: WHITE,
  },
});
