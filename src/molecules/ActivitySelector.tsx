import React, { useEffect } from 'react';
import { RoutePropParams } from '../res/root-navigation';
import { GoogleLocation, NavigationProps } from './../res/dataModels';
import { Image, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { AppText } from '../atoms/AppText';
import { GREY_6, WHITE } from '../res/styles/Colors';
import { navigateToPlanMap } from '../res/utilFunctions';
import { copy } from './../res/groupifyCopy';

interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
  setPlacesUserWantsToGo?: () => GoogleLocation[];
}

export enum ActivitySelectorLayout {
  SingleLine,
  MultiLine,
}

export enum ActivityEnum {
  Food = 'Food',
  Shopping = 'Shopping',
  Chill = 'Chill',
  Fitness = 'Fitness',
  Game = 'Drink & Game',
  Culture = 'Culture',
  Sports = 'Sports',
  Outdoors = 'Outdoors'
}
// Stored as 2d array to make it really easy to edit where options show up in the activity selector
export const ActivitySelector: React.FC<Props> = ({ navigation, route }: Props) => {

  const activities = [
    {
      id: ActivityEnum.Food,
      name: copy.foodActivityTile,
    },
    {
      id: ActivityEnum.Shopping,
      name: copy.shopActivityTile,
    },
    {
      id: ActivityEnum.Chill,
      name: copy.chillDrinkActivityTile,
    },
    {
      id: ActivityEnum.Fitness,
      name: copy.fitnessActivityTile,
    },
    {
      id: ActivityEnum.Game,
      name: copy.drinkGameActivityTile,
    },
    {
      id: ActivityEnum.Culture,
      name: copy.artAndCultureActivityTile,
    },
    {
      id: ActivityEnum.Sports,
      name: copy.pickupActivityTile,
    },
    {
      id: ActivityEnum.Outdoors,
      name: copy.outsideActivityTile,
    },
  ];

  const getImageSource = (id : ActivityEnum) => {
    switch(id) {
      case ActivityEnum.Food: return require('../../assets/activityIcons/Food.png');
      case ActivityEnum.Shopping: return require('../../assets/activityIcons/Shop.png');
      case ActivityEnum.Chill: return require('../../assets/activityIcons/Coffee.png');
      case ActivityEnum.Fitness: return require('../../assets/activityIcons/Fitness.png');
      case ActivityEnum.Game: return require('../../assets/activityIcons/Nightlife.png');
      case ActivityEnum.Culture: return require('../../assets/activityIcons/Culture.png');
      case ActivityEnum.Sports: return require('../../assets/activityIcons/Sports.png');
      case ActivityEnum.Outdoors: return require('../../assets/activityIcons/Outdoors.png');
      default:
        return <AppText>Error</AppText>;
    }
  }

  return (
    <View style={styles.activitySelector}>
        {activities.map((activity: {id: ActivityEnum, name: string}) => (
          <TouchableOpacity
            onPress={async () => {
              navigateToPlanMap(activity.id, navigation, route, route.params.userLocation, 'Current Location', true);
            }}
            testID={activity.id}
            key={activity.id}
          >
            <View style={styles.activitiesImageContainer}>
            <Image
              source={getImageSource(activity.id)}
              style={styles.activitySelectorButtonImage}
            />
              <AppText style={styles.iconText}>{activity.name}</AppText>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  activitySelectorButtonImage: {
    marginBottom: 5
  },
  activitySelector: {
    paddingTop: 30,
    backgroundColor: WHITE,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  activitiesImageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: WHITE,
    width: Dimensions.get('screen').width / 4 - 16,
    height: 60,
    borderColor: GREY_6,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  iconText: {
    fontSize: 11,
    fontWeight: '500'
  },
});
