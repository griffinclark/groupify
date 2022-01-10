import React, { useEffect } from 'react';
import { RoutePropParams } from '../res/root-navigation';
import { GoogleLocation, NavigationProps } from './../res/dataModels';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
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

// Stored as 2d array to make it really easy to edit where options show up in the activity selector
export const ActivitySelector: React.FC<Props> = ({ navigation, route }: Props) => {
  const getButtonImage = (str: string) => {
    // Think this has to be built like this because source can't be built dynamically
    switch (str) {
      case 'Coffee':
        return (
          <Image source={require('../../assets/activityIcons/Coffee.png')} style={styles.activitySelectorButtonImage} />
        );
      case 'Culture':
        return (
          <Image
            source={require('../../assets/activityIcons/Culture.png')}
            style={styles.activitySelectorButtonImage}
          />
        );
      case 'Events':
        return (
          <Image source={require('../../assets/activityIcons/Events.png')} style={styles.activitySelectorButtonImage} />
        );
      case 'Fitness':
        return (
          <Image
            source={require('../../assets/activityIcons/Fitness.png')}
            style={styles.activitySelectorButtonImage}
          />
        );
      case 'Outdoors':
        return (
          <Image
            source={require('../../assets/activityIcons/Outdoors.png')}
            style={styles.activitySelectorButtonImage}
          />
        );
      case 'Relax':
        return (
          <Image source={require('../../assets/activityIcons/Relax.png')} style={styles.activitySelectorButtonImage} />
        );
      case 'Shop':
        return (
          <Image source={require('../../assets/activityIcons/Shop.png')} style={styles.activitySelectorButtonImage} />
        );
      case 'Food':
        return (
          <Image source={require('../../assets/activityIcons/Food.png')} style={styles.activitySelectorButtonImage} />
        );
      case 'Nightlife':
        return (
          <Image
            source={require('../../assets/activityIcons/Nightlife.png')}
            style={styles.activitySelectorButtonImage}
          />
        );
      default:
        return <AppText>Error</AppText>;
    }
  };

  const activities = [
    copy.foodActivityTile,
    copy.outsideActivityTile,
    copy.shopActivityTile,
    copy.coffeeActivityTile,
    copy.workoutActivityTile,
    copy.nightlifeActivityTile,
    copy.coffeeActivityTile,
    copy.artAndCultureActivityTile,
    copy.relaxActivityTile,
  ];

  // if style == multiple rows
  const twoDActivities: string[][] = [];
  let i = 0;
  let j = -1;

  activities.forEach((activity) => {
    if (i == 0) {
      twoDActivities.push([]);
      j++;
    }
    twoDActivities[j].push(activity);
    i++;
    if (i == 5) {
      i = 0;
    }
  });

  return (
    <View style={styles.activitySelector}>
      {twoDActivities.map((activityArr: string[]) => (
        <View style={styles.activitiesRow} key={activityArr[0]}>
          {activityArr.map((activity: string) => (
            <TouchableOpacity
              onPress={async () => {
                navigateToPlanMap(activity, navigation, route, route.params.userLocation, 'Current Location');
              }}
              testID={activity}
              key={activity}
            >
              <View style={styles.activitiesImageContainer}>
                {getButtonImage(activity)}
                <AppText style={styles.iconText}>{activity}</AppText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  activitySelectorButtonImage: {
    height: 20,
    width: 20,
  },
  activitySelector: {
    // Pushes activitySelector down to the correct height:
    paddingTop: 40,
    backgroundColor: WHITE,
    // zIndex: -1,
  },
  activitiesImageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: WHITE,
    width: 60,
    height: 60,
    borderColor: GREY_6,
    borderWidth: 1,
    borderRadius: 5,
  },
  activitiesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    // space out the rows of buttons:
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 17,
    marginRight: 17,
  },
  iconText: {
    fontSize: 10,
  },
});
