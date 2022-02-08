import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RoutePropParams } from '../res/root-navigation';
import { GoogleLocation } from '../res/dataModels';
import { roundDate } from '../res/utilFunctions';
import { User } from '../models';
import { WHITE, TEAL, BLACK } from '../res/styles/Colors';

interface Props {
  user: User,
  navigation: {
    navigate: (ev: string, {}) => void;
  };
  locations?: GoogleLocation[];
  userLocation: any; //TODO fix
  route: RoutePropParams
}

export const NoPlansCard: React.FC<Props> = ({ user, navigation, locations, userLocation }: Props) => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <MaterialIcons name="celebration" size={50} color={BLACK} />
        <Text style={styles.text}>No Plans to see here, yet!</Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('SelectorMenu', {
          locations: locations, // TODO is this needed?
          userLocation: userLocation,
          data: {
            activitySearchData: {tempUserLocation: userLocation}
          },
          currentUser: user
        })}
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
    marginTop: 2,
    paddingBottom: 8,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 22,
    fontWeight: '400',
  },
  button: {
    backgroundColor: TEAL,
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 22,
  },
});
