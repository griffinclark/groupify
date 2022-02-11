import React from 'react';
import { RoutePropParams } from '../res/root-navigation';
import { GoogleLocation, NavigationProps, ActivityEnum } from './../res/dataModels';
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

// Stored as 2d array to make it really easy to edit where options show up in the activity selector
export const ActivitySelector: React.FC<Props> = ({ navigation, route }: Props) => {
  const activities = [
    {
      id: ActivityEnum.Happening,
      name: copy.happeningActivityTile,
    },
    {
      id: ActivityEnum.Outdoors,
      name: copy.outsideActivityTile,
    },
    {
      id: ActivityEnum.Indoor,
      name: copy.indoorActivityTile,
    },
    {
      id: ActivityEnum.Exercise,
      name: copy.exerciseActivityTile,
    },
    {
      id: ActivityEnum.Chill,
      name: copy.chillDrinkActivityTile,
    },
    {
      id: ActivityEnum.Sports,
      name: copy.pickupActivityTile,
    },
    {
      id: ActivityEnum.AllDay,
      name: copy.alldayActivityTile,
    },
    {
      id: ActivityEnum.Food,
      name: copy.foodActivityTile,
    },
  ];

  const getImageSource = (id: ActivityEnum) => {
    switch (id) {
      case ActivityEnum.Food:
        return require('../../assets/activityIcons/Food.png');
      case ActivityEnum.Chill:
        return require('../../assets/activityIcons/Coffee.png');
      case ActivityEnum.Exercise:
        return require('../../assets/activityIcons/Fitness.png');
      case ActivityEnum.Sports:
        return require('../../assets/activityIcons/Sports.png');
      case ActivityEnum.Outdoors:
        return require('../../assets/activityIcons/Outdoors.png');
      case ActivityEnum.Indoor:
        return require('../../assets/activityIcons/Shop.png');
      case ActivityEnum.AllDay:
        return require('../../assets/activityIcons/Nightlife.png');
      case ActivityEnum.Happening:
        return require('../../assets/activityIcons/Culture.png');
      default:
        return <AppText>Error</AppText>;
    }
  };

  console.log('activity selector ' + route.params.currentUser);

  return (
    <View style={styles.activitySelector}>
      {activities.map((activity: { id: ActivityEnum; name: string }) => (
        <TouchableOpacity
          onPress={async () => {
            navigateToPlanMap(activity.id, navigation, route, route.params.userLocation, 'Current Location', true);
          }}
          testID={activity.id}
          key={activity.id}
        >
          <View style={styles.activitiesImageContainer}>
            <Image source={getImageSource(activity.id)} style={styles.activitySelectorButtonImage} />
            <AppText style={styles.iconText}>{activity.name}</AppText>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  activitySelectorButtonImage: {
    marginBottom: 5,
  },
  activitySelector: {
    paddingTop: 30,
    backgroundColor: WHITE,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
    fontWeight: '500',
  },
});
