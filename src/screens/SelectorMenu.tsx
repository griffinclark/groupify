import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Screen } from '../atoms/Screen';
import { GOLD_0, GREY_1, GREY_6, WHITE } from '../res/styles/Colors';
import { AppText } from '../atoms/AppText';
import { HomeNavBar } from '../molecules/HomeNavBar';
import { Button } from '../atoms/Button';
import { SearchBar } from '../atoms/SearchBar';
import { ActivityList } from '../organisms/ActivityList';
import { getCurrentUser } from '../res/utilFunctions';
import { GoogleLocation } from '../res/dataModels';
import * as Location from 'expo-location';
import { copy } from '../res/groupifyCopy';
import { LocationAccuracy } from 'expo-location';

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
  const [locations, setLocations] = useState([]);
  const [distance, setDistance] = useState<number>(30);
  const [userLocation, setUserLocation] = useState({
    latitude: 41.878,
    longitude: -93.0977,
  }); // defaults to Los Angeles if user location is not provided and no place param
  const [region, setRegion] = useState({
    latitude: 41.878,
    longitude: -93.0977,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
    default: true,
  });

  useEffect(() => {
    console.log('started');
    if (region.default) {
      getUserLocation();
    }
    queryActivities();
  }, [userLocation, route.params.activity, distance]);

  const handleCreate = async (loc: GoogleLocation) => {
    const user = await getCurrentUser();
    navigation.navigate('PlanCreate', {
      currentUser: user,
      data: {
        eventData: {
          location: loc.formatted_address,
        },
      },
    });
  };

  const getUserLocation = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    } else {
      try {
        let location = await Location.getLastKnownPositionAsync();
        if (location === null) {
          location = await Location.getCurrentPositionAsync({ accuracy: LocationAccuracy.Highest });
        }
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
          default: false,
        });

        queryActivities();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const queryActivities = async () => {
    const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';

    const search =
      'https://maps.googleapis.com/maps/api/place/textsearch/json?' +
      `location=${userLocation.latitude},${userLocation.longitude}` +
      `&radius=${5000}` +
      `&query=${'coffee'}` +
      `&key=${GOOGLE_PLACES_API_KEY}`;
    const response = await fetch(search);
    // TODO make this a more interesting query and sort results by locationF
    const detail = await response.json();
    setLocations(detail.results);
    console.log('locations set,');
    console.log(locations);
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.navbarPlaceholder}>
        <Image source={require('../../assets/Splash_Logo.png')} style={styles.navbarLogo} />
        <Image source={require('../../assets/activity-relax.png')} style={styles.activitiesImage} />
      </View>
      <View style={styles.primaryImageContainer}>
        <Image source={require('../../assets/activity-selector-background-image.png')} />
        <View style={styles.buildPlanButtonContainer}>
          <Button title={'Build My Own Plan'} />
        </View>
        <View style={styles.middleTextContainer}>
          <AppText style={{ color: 'white', fontWeight: 'bold' }}>Or</AppText>
        </View>
        <View style={styles.searchBarContainer}>
          <SearchBar
            placeholder={'Search for food, parks, coffee, etc.'}
            onInputChange={() => {
              console.log('hi');
            }}
          />
        </View>
      </View>
      <View style={styles.activitySelector}>
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
      </View>
      <View style={styles.activitySuggestions}>
        <ActivityList navigation={navigation} handleCreate={handleCreate} locations={locations} />
      </View>
      <HomeNavBar invitedPlans={[]} userPlans={[]} navigation={navigation} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: GREY_1,
  },
  activitiesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 17,
    marginRight: 17,
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
    alignSelf: 'center',
    marginTop: 121,
  },
  middleTextContainer: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 170,
  },
  primaryImageContainer: {
    height: 234,
  },
  searchBarContainer: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 209,
    backgroundColor: WHITE,
    borderRadius: 5,
    width: 334,
  },
  activitySelector: {
    paddingTop: 34,
    backgroundColor: WHITE,
    zIndex: -1,
  },
  activitySuggestions: {
    backgroundColor: GREY_1,
    height: '58%',
  },
});
