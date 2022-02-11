import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RoutePropParams } from '../res/root-navigation';
import { GoogleLocation, UserLocation } from '../res/dataModels';
import { User } from '../models';
import { WHITE, TEAL_0 } from '../res/styles/Colors';
import { PartyIcon } from '../../assets/Icons/PartyIcon';

interface Props {
  user: User;
  navigation: {
    navigate: (ev: string, {}) => void;
  };
  locations?: GoogleLocation[];
  userLocation: UserLocation;
  route: RoutePropParams;
}

export const NoPlansCard: React.FC<Props> = ({ user, navigation, locations, userLocation }: Props) => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <PartyIcon />
        <Text style={styles.text}>No Plans to see here, yet!</Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('SelectorMenu', {
            locations: locations, // TODO is this needed?
            userLocation: userLocation,
            data: {
              activitySearchData: { tempUserLocation: userLocation },
            },
            currentUser: user,
          })
        }
        activeOpacity={0.4}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Create a Plan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
    paddingBottom: 8,
  },
  text: {
    fontSize: 19,
    textAlign: 'center',
    marginVertical: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  button: {
    backgroundColor: TEAL_0,
    width: 315,
    height: 35,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: WHITE,
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 18,
  },
});
