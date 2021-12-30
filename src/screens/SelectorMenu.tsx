import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, ScrollView, Keyboard } from 'react-native';
import { Screen } from '../atoms/Screen';
import { BLACK, GREY_4, GREY_6, WHITE } from '../res/styles/Colors';
import { AppText } from '../atoms/AppText';
import { HomeNavBar } from '../molecules/HomeNavBar';
import SvgUri from 'react-native-svg-uri';
import { SearchBar } from '../atoms/SearchBar';
import { GoogleLocation, UserLocation } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { ActivityCard } from './../molecules/ActivityCard';
import { MagnifyingGlassIcon } from '../../assets/Icons/MagnifyingGlass';
import { TopNavBar } from '../molecules/TopNavBar';
export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
    push: () => void;
  };
  route: RoutePropParams;
}
const activities: string[][] = [
  ['Food', 'Outdoors', 'Shop', 'Coffee', 'Fitness'],
  ['Nightlife', 'Events', 'Culture', 'Relax'],
];

export const googlePlacesQuery: (
  text: string,
  userOverrideLocation: UserLocation,
) => Promise<GoogleLocation[]> = async (text, userOverrideLocation) => {
  const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';
  console.log(userOverrideLocation);
  const search =
    'https://maps.googleapis.com/maps/api/place/textsearch/json?' +
    `location=${userOverrideLocation?.latitude},${userOverrideLocation.longitude}` +
    `&radius=${50000}` +
    `&query=${text}` +
    `&key=${GOOGLE_PLACES_API_KEY}`;
  const response = await fetch(search);
  const detail = await response.json();
  const res: GoogleLocation[] = detail.results;
  // detail.results.sort((a: GoogleLocation, b: GoogleLocation) => b.user_ratings_total - a.user_ratings_total);
  return res;
};

export const SelectorMenu: React.FC<Props> = ({ navigation, route }: Props) => {
  enum ScreenName {
    LocationSearch = 'LOCATIONSEARCH',
    ActivitySelector = 'ACTIVITYSELECTOR',
    LocationChange = 'LOCATIONCHANGE',
  }
  const [userOverrideLocation, setUserOverrideLocation] = useState(route.params.userLocation);
  const [featureLocations, setFeatureLocations] = useState<GoogleLocation[]>([]);

  useEffect(() => {
    const getFeatureLocations = async () => {
      setFeatureLocations(await googlePlacesQuery('park', userOverrideLocation));
    };
    getFeatureLocations();
    setUserOverrideLocation(route.params.userLocation);
  }, []);

  const getSVG = (str: string) => {
    // return <SvgUri width="20" height="20" source={require('../../assets/activityIcons/Coffee.svg')} />;
    switch (str) {
      case 'Coffee':
        return <SvgUri width="20" height="20" source={require('../../assets/activityIcons/Coffee.svg')} />;
      case 'Culture':
        return <SvgUri width="20" height="20" source={require('../../assets/activityIcons/Culture.svg')} />;
      case 'Events':
        return <SvgUri width="20" height="20" source={require('../../assets/activityIcons/Events.svg')} />;
      case 'Fitness':
        return <SvgUri width="20" height="20" source={require('../../assets/activityIcons/Fitness.svg')} />;
      case 'Outdoors':
        return <SvgUri width="20" height="20" source={require('../../assets/activityIcons/Outdoors.svg')} />;
      case 'Relax':
        return <SvgUri width="20" height="20" source={require('../../assets/activityIcons/Relax.svg')} />;
      case 'Shop':
        return <SvgUri width="20" height="20" source={require('../../assets/activityIcons/Shop.svg')} />;
      default:
        return <AppText>Error</AppText>;
    }
  };

  const navigateToMapView = (locations: GoogleLocation[]) => {
    navigation.navigate('PlanMap', { navigation: { navigation }, route: { route }, locations: locations });
  };

  return (
    <Screen style={styles.screen}>
      <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[1]}>
        <TopNavBar title="" navigation={navigation} displayGroupify={true} route={route} targetScreen={'Home'} />
        <View style={styles.searchBar}>
          <View style={styles.searchBarContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TakeoverSearch', {
                  navigation: navigation,
                  route: route,
                  locationQuery: route.params.locationQuery,
                  userLocation: userOverrideLocation,
                });
              }}
            >
              {/* TODO make the SearchBar just a textfield that looks like a searchbar */}
              <SearchBar
                leftIcon={<MagnifyingGlassIcon />}
                testID={'searchbar'}
                placeholder="Search for food, parks, coffee, etc"
                defaultValue={route.params.locationQuery}
                onChangeText={(input) => {
                  if (input.length > 0) {
                    navigation.navigate('TakeoverSearch', {
                      navigation: navigation,
                      route: route,
                      locationQuery: route.params.locationQuery,
                      userLocation: userOverrideLocation,
                    });
                  } else {
                    Keyboard.dismiss();
                  }
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.activitySelectorRoot}>
          <View>
            <Image source={require('../../assets/activity-selector-background-image.png')} />
          </View>
          <View style={styles.activitySelector}>
            {activities.map((activityArr: string[]) => (
              <View style={styles.activitiesRow} key={activityArr[0]}>
                {activityArr.map((activity: string) => (
                  <TouchableOpacity
                    onPress={async () => navigateToMapView(await googlePlacesQuery(activity, userOverrideLocation))}
                    testID={activity}
                    key={activity}
                  >
                    <View style={styles.activitiesImageContainer}>
                      {/* <View style={styles.activitiesImage}> */}
                      {getSVG(activity)}
                      {/* </View> */}
                      <AppText style={styles.iconText}>{activity}</AppText>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
          <View style={styles.activitySuggestions}></View>
        </View>
        <View style={styles.locationSuggestions}>
          {featureLocations.length > 0 ? (
            featureLocations.map((location: GoogleLocation) => {
              return <ActivityCard key={location.place_id} navigation={navigation} location={location} map={false} />;
            })
          ) : (
            <AppText>Fetching feature locations</AppText>
          )}
        </View>
      </ScrollView>

      <HomeNavBar
        locations={[]}
        user={route.params.currentUser}
        navigation={navigation}
        userPlans={[]}
        invitedPlans={[]}
        userLocation={userOverrideLocation ? userOverrideLocation : route.params.userLocation}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: WHITE,
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
  navbarLogo: {
    height: 45,
    width: 130,
  },
  buildPlanButtonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    // pushes button on image down to the correct height:
    marginTop: 121,
  },
  middleTextContainer: {
    position: 'absolute',
    alignSelf: 'center',
    // pushes "or" text down to the correct height:
    marginTop: 190,
  },
  activitySelectorSpacing: {
    // height: 380,
  },
  searchBarContainer: {
    width: 334,
    borderRadius: 5,
    backgroundColor: WHITE,
  },
  activitySelectorRoot: {
    position: 'absolute',
    marginTop: 45,
  },
  activitySelector: {
    // Pushes activitySelector down to the correct height:
    paddingTop: 40,
    backgroundColor: WHITE,
    // zIndex: -1,
  },
  activitySuggestions: {
    backgroundColor: WHITE,
    height: '58%',
  },
  middleText: { color: 'white', fontWeight: 'bold' },
  scrollContainer: {
    // Add some spacing to the bottom of the activity suggestions:
    marginBottom: 50,
  },
  locationSuggestions: {
    marginTop: 155,
    zIndex: 1,
  },
  backButtonTemp: {
    borderBottomWidth: 1,
    backgroundColor: WHITE,
    borderBottomColor: GREY_4,
    flexDirection: 'row',
  },
  searchSection: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: GREY_6,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    paddingRight: 10,
    marginLeft: 5,
    color: BLACK,
  },
  locationSearchSuggestions: {
    paddingTop: 0,
    alignItems: 'center',
    padding: 20,
  },
  locationSearchContainer: {
    alignSelf: 'center',
    marginTop: 16,
    width: 334,
    borderRadius: 5,
    backgroundColor: WHITE,
    zIndex: 2,
  },
  searchBar: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 209,
    width: '100%',
    padding: 10,
    height: 65,
    backgroundColor: WHITE,
    alignItems: 'center',
    zIndex: 1,
  },
});
