import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Screen } from '../atoms/Screen';
import { GOLD_2, GREY_6, TEAL_0, WHITE } from '../res/styles/Colors';
import { AppText } from '../atoms/AppText';
import { HomeNavBar } from '../molecules/HomeNavBar';
import { Navbar } from '../molecules/Navbar';
import { Button } from '../atoms/Button';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
    push: () => void;
  };
  handleActivity: (activity: string) => void;
}

/*
        1/ Display the top navbar ( just a white rectangle until I know whether or not this has been built yet )
        2/ Display the background image
        3/ Display the white background
        4/ Display the list of locations that are close to me 
            TODO thoughts on how to make this smarter
            4.1/ Fetch locations on homepage loading
            4.2/ Limit to 20 locations 
            TODO how deep should this list be?
            4.3/ If locations exist, display locations. Otherwise, show "loading..."
            TODO what should we do if these locations haven't loaded yet
            4.4/ At the bottom of the list, show a clown button
            TODO what should we do when we hit the bottom of the list
        5/ Add in the Build My Own Plan button
        6/ Add in "Or"
        7/ Add in the searchbar 
        8/ Create button factory
        9/ Save icons locally
        10/ Add search functionality to buttons
        */

// Because of how the factory works, please ensure that the first element in each array is unique
// Please limit each array[] to 5 elements
const activities: string[][] = [
  ['Food', 'Outdoors', 'Shop', 'Coffee', 'Fitness'],
  ['Nightlife', 'Events', 'Culture', 'Relax'],
];

export const SelectorMenu: React.FC<Props> = ({ navigation, route, handleActivity }: Props) => {
  return (
    <Screen style={styles.screen}>
      <View style={styles.navbarPlaceholder}>
        <Image source={require('../../assets/Splash_Logo.png')} style={styles.navbarLogo} />
        <Image source={require('../../assets/activity-relax.png')} style={styles.activitiesImage} />
      </View>
      <View>
        <Image source={require('../../assets/activity-selector-background-image.png')} />
      </View>
      <View style={styles.buildPlanButtonContainer}>
        <Button title={'Build My Own Plan'} />
      </View>
      {activities.map((activityArr: string[]) => (
        <View style={styles.activitiesRow} key={activityArr[0]}>
          {activityArr.map((activity: string) => (
            <TouchableOpacity onPress={() => console.log(activity)} testID={activity} key={activity}>
              <View style={styles.activitiesImageContainer}>
                <Image source={require('../../assets/activity-coffee.png')} style={styles.activitiesImage} />
                <AppText style={styles.iconText}>{activity}</AppText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <HomeNavBar invitedPlans={[]} userPlans={[]} navigation={navigation} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: WHITE,
  },
  activitiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginLeft: 17,
    marginRight: 17,
  },
  activitiesImageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: WHITE,
    width: 60,
    height: 60,
    borderColor: GREY_6,
    borderWidth: 1,
    borderRadius: 5,
  },
  activitiesImage: {
    height: 30,
    width: 30,
  },
  iconText: {
    fontSize: 10,
  },
  navbarPlaceholder: {
    backgroundColor: WHITE,
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  navbarLogo: {
    height: 40,
    width: 130,
  },
  buildPlanButtonContainer: {
    position: 'absolute',
    bottom: '62%',
    alignSelf: 'center',
  },
});
