import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { TEAL, WHITE } from '../res/styles/Colors';
import { User, Plan } from '../models';
import { AppText } from '../atoms/AppText';
import { AnnounceIcon, SettingsIcon, CreatePlanIcon } from '../../assets/Icons/IconExports';

interface Props {
  user?: User;
  style?: Record<string, unknown>;
  invitedPlans: Plan[];
  userPlans: Plan[];
  navigation: {
    navigate: (ev: string, {}) => void;
    push: (ev: string, {}) => void;
  };
}

export const HomeNavBar: React.FC<Props> = ({ user, style, userPlans, invitedPlans, navigation }: Props) => {
  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <View style={[styles.nav, style]}>
        <TouchableOpacity
          style={{ width: '33%' }}
          onPress={() => {
            navigation.navigate('ViewPlans', {});
          }}
        >
          <AnnounceIcon />
          <AppText style={styles.text}>Notifications</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '33%' }}
          onPress={() => {
            navigation.push('ActivitySelector', { currentUser: user });
          }}
        >
          <CreatePlanIcon />
          <AppText style={styles.text}>Create Plan</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '33%' }}
          onPress={() => {
            navigation.navigate('Profile', {
              currentUser: user,
              currentUserPlan: userPlans[0] ? userPlans[0] : invitedPlans[0],
            });
          }}
        >
          <SettingsIcon />
          <AppText style={styles.text}>Settings</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: TEAL,
  },
  text: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
    color: WHITE,
    textAlign: 'center',
  },
});
