import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { GREY_1, TEAL_0, WHITE } from '../res/styles/Colors';
import { User, Plan } from '../models';
import { AppText } from '../atoms/AppText';
import { AnnounceIcon, SettingsIcon, CreatePlanIcon } from '../../assets/Icons/IconExports';
import { copy } from '../res/groupifyCopy';
import { GoogleLocation } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';

interface Props {
  user?: User;
  style?: Record<string, unknown>;
  invitedPlans: Plan[];
  locations?: GoogleLocation[];
  userPlans: Plan[];
  navigation: {
    navigate: (ev: string, {}) => void;
    push: (ev: string, {}) => void;
  };
  userLocation: any; //TODO fix
}

export const HomeNavBar: React.FC<Props> = ({
  userLocation,
  user,
  style,
  userPlans,
  invitedPlans,
  navigation,
  locations,
}: Props) => {
  return (
    <View style={styles.navbar}>
      <View style={[styles.nav, style]}>
        <TouchableOpacity
          style={{ width: '33%' }}
          onPress={() => {
            navigation.navigate('ViewPlans', {});
          }}
        >
          <AnnounceIcon />
          <AppText style={styles.text}>{copy.leftNavButton}</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '33%' }}
          // onPress={() => {
          //   navigation.push('ActivitySelector', { currentUser: user });
          // }}
          onPress={() => {
            navigation.navigate('SelectorMenu', {
              locations: locations, // TODO is this needed?
              userLocation: userLocation,
              data: {
                activitySearchData: {tempUserLocation: userLocation}
              }
            });
          }}
        >
          <CreatePlanIcon />
          <AppText style={styles.text}>{copy.centerNavButton}</AppText>
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
          <AppText style={styles.text}>{copy.rightNavButton}</AppText>
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
    backgroundColor: GREY_1,
  },
  text: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 5,
    marginBottom: 10,
    color: WHITE,
    textAlign: 'center',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
  },
});
