import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { AppText } from '../atoms/AppText';
import { NavigationProps, UserLocation } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { GREY_6, GREY_8, WHITE } from '../res/styles/Colors';
import { User } from '../models';

interface Props {
  route: RoutePropParams;
  icon: JSX.Element;
  placeholderText?: string;
  tempUserLocation: UserLocation;
  placesUserWantsToGoQuery: string;
  tempUserLocationQuery: string;
  navigation: NavigationProps;
  userLocation: UserLocation;
  mode: SearchbarDisplayMode;
  currentUser: User;
}

export enum SearchbarDisplayMode {
  Query = 'QUERY',
  Result = 'RESULT',
}

export const SearchbarWithoutFeedback: React.FC<Props> = ({
  navigation,
  route,
  icon,
  placeholderText,
  tempUserLocationQuery,
  userLocation,
  placesUserWantsToGoQuery,
  tempUserLocation,
  mode,
  currentUser,
}: Props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('TakeoverSearch', {
          navigation: navigation,
          route: route,
          data: {
            activitySearchData: {
              tempUserLocation: tempUserLocation,
              placesUserWantsToGoQuery: placesUserWantsToGoQuery,
              tempUserLocationQuery: tempUserLocationQuery,
            },
          },
          userLocation: userLocation,
          currentUser: currentUser,
          //TODO @joni do we want to clear user search on navigate back to SelectorMenu?
        });
      }}
    >
      <View style={styles.searchBarContainer}>
        <View style={styles.icon}>{icon}</View>
        {mode == SearchbarDisplayMode.Query ? (
          <AppText style={styles.searchBarText}>{placeholderText}</AppText>
        ) : (
          <View style={{ flexDirection: 'row', overflow: 'hidden' }}>
            <AppText>{placesUserWantsToGoQuery + ' '}</AppText>
            <AppText style={styles.searchBarText}>
              {tempUserLocationQuery ? tempUserLocationQuery : 'Current Location'}
            </AppText>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    width: 334,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: GREY_6,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: WHITE,
    overflow: 'hidden',
  },
  icon: {
    padding: 15,
  },
  searchBarText: {
    color: GREY_8,
  },
});
