import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { GREY_1, WHITE } from '../res/styles/Colors';
import { User, Plan } from '../models';
import { ContactIcon, CreatePlanIcon } from '../../assets/Icons/IconExports';
import { Feather } from '@expo/vector-icons';
import { copy } from '../res/groupifyCopy';
import { GoogleLocation } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';

interface Props {
  route: RoutePropParams;
  user?: User;
  style?: Record<string, unknown>;
  invitedPlans: Plan[];
  locations?: GoogleLocation[];
  userPlans: Plan[];
  navigation: {
    navigate: (ev: string, {}) => void;
    push: (ev: string, {}) => void;
  };
}

export const HomeNavBar: React.FC<Props> = ({
  route,
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
            navigation.navigate('SelectorMenu', {
              currentUser: user,
              locations: locations, // TODO is this needed?
              userLocation: route.params.userLocation,
              data: {
                activitySearchData: { tempUserLocation: route.params.userLocation },
              },
            });
          }}
        >
          <CreatePlanIcon />
          <Text style={styles.text}>{copy.centerNavButton}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ width: '33%' }}
          onPress={() => {
            navigation.navigate('Home', {});
          }}
        >
          <Feather style={{ marginHorizontal: 48 }} name="calendar" size={29} color={WHITE} />
          <Text style={styles.text}>{copy.leftNavButton}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '33%' }}
          onPress={() => {
            navigation.navigate('ContactList', {
              currentUser: user,
              currentUserPlan: userPlans[0] ? userPlans[0] : invitedPlans[0],
            });
          }}
        >
          <ContactIcon />
          <Text style={styles.text}>{copy.rightNavButton}</Text>
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
    fontSize: 11,
    fontWeight: '700',
    marginTop: 10,
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
