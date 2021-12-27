import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  StyleProp,
  ViewStyle,
  TextInput,
  Keyboard,
} from 'react-native';
import { Screen } from '../atoms/Screen';
import { BLACK, GOLD_0, GREY_1, GREY_3, GREY_4, GREY_6, WHITE } from '../res/styles/Colors';
import { AppText } from '../atoms/AppText';
import { HomeNavBar } from '../molecules/HomeNavBar';
import SvgUri from 'react-native-svg-uri';

import { Button } from '../atoms/Button';
import { SearchBar } from '../atoms/SearchBar';
import { getCurrentUser } from '../res/utilFunctions';
import { GoogleLocation, UserLocation } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { ActivityCard } from './../molecules/ActivityCard';
import { SearchSuggestionTile } from '../molecules/SearchSuggestionTile';
import { MagnifyingGlassIcon } from '../../assets/Icons/MagnifyingGlass';
import { MapLinkIcon } from './../../assets/Icons/MapLink';
import { Geometry } from 'react-native-google-places-autocomplete';
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

export const SelectorMenu: React.FC<Props> = ({ navigation, route }: Props) => {
  enum ScreenName {
    LocationSearch = 'LOCATIONSEARCH',
    ActivitySelector = 'ACTIVITYSELECTOR',
    LocationChange = 'LOCATIONCHANGE',
  }
  const [screenToDisplay, setScreenToDisplay] = useState(ScreenName.ActivitySelector);
  const [suggestedLocations, setSuggestedLocations] = useState<GoogleLocation[]>([]);
  const [suggestedLocationOverrides, setSuggestedLocationOverrides] = useState<GoogleLocation[]>([]);
  const [userOverrideLocation, setUserOverrideLocation] = useState(route.params.userLocation);
  const [locationInput, setLocationSearchInput] = useState('');
  const [featureLocations, setFeatureLocations] = useState<GoogleLocation[]>([]);

  const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';

  useEffect(() => {
    const getFeatureLocations = async () => {
      setFeatureLocations(await googlePlacesQuery('park'));
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

  const getSearchBarStyle = (): StyleProp<ViewStyle> => {
    if (screenToDisplay == ScreenName.LocationSearch || screenToDisplay == ScreenName.LocationChange) {
      return {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 19,
        width: 334,
        borderRadius: 5,
        backgroundColor: WHITE,
        zIndex: 1,
      };
    } else if (screenToDisplay == ScreenName.ActivitySelector) {
      return {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 209,
        width: 334,
        borderRadius: 5,
        backgroundColor: WHITE,
        zIndex: 2,
      };
    }
  };

  const googlePlacesQuery: (text: string) => GoogleLocation[] = async (text: string) => {
    if (userOverrideLocation == undefined) {
      setUserOverrideLocation(route.params.userLocation);
    }
    const search =
      'https://maps.googleapis.com/maps/api/place/textsearch/json?' +
      `location=${userOverrideLocation?.latitude},${userOverrideLocation.longitude}` +
      `&radius=${50000}` +
      `&query=${text}` +
      `&key=${GOOGLE_PLACES_API_KEY}`;
    const response = await fetch(search);
    const detail = await response.json();
    // detail.results.sort((a: GoogleLocation, b: GoogleLocation) => b.user_ratings_total - a.user_ratings_total);
    return detail.results;
  };

  const ActivitySelector: React.FC<Props> = ({ navigation, route }: Props) => {
    return (
      <View style={styles.cancleSearchView}>
        <View>
          <Image source={require('../../assets/activity-selector-background-image.png')} />
          <View style={styles.buildPlanButtonContainer}>
            <Button title={'Build My Own Plan'} />
          </View>
          <View style={styles.middleTextContainer}>
            <AppText style={styles.middleText}>Or</AppText>
          </View>
        </View>
        <View style={styles.activitySelector}>
          {activities.map((activityArr: string[]) => (
            <View style={styles.activitiesRow} key={activityArr[0]}>
              {activityArr.map((activity: string) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('PlanMap', { navigation: { navigation }, route: { route } })}
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
    );
  };

  return (
    <Screen style={styles.screen}>
      <View>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setScreenToDisplay(ScreenName.ActivitySelector);
          }}
          style={styles.backButtonTemp}
        >
          <Image source={require('../../assets/Splash_Logo.png')} style={styles.navbarLogo} />
          <Image source={require('../../assets/activity-relax.png')} style={styles.activitiesImage} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[0]}>
        <View style={getSearchBarStyle()}>
          <SearchBar
            leftIcon={<MagnifyingGlassIcon />}
            onPressIn={() => setScreenToDisplay(ScreenName.LocationSearch)}
            placeholder="Search for food, parks, coffee, etc"
            onInputChange={async (text: string) => {
              setSuggestedLocations(await googlePlacesQuery(text));
              if (text.length == 0) {
                setSuggestedLocations([]);
              }
            }}
          />
        </View>

        {screenToDisplay == ScreenName.ActivitySelector ? (
          <>
            <ActivitySelector navigation={navigation} route={route} />
            <View style={styles.locationSuggestions}>
              {featureLocations.length > 0 ? (
                featureLocations.map((location: GoogleLocation) => {
                  return (
                    <ActivityCard key={location.place_id} navigation={navigation} location={location} map={false} />
                  );
                })
              ) : (
                <AppText>Fetching feature locations</AppText>
              )}
            </View>
          </>
        ) : (
          <>
            <View style={styles.locationSearchContainer}>
              <View>
                <View style={styles.searchSection}>
                  <MapLinkIcon />
                  <TextInput
                    style={styles.input}
                    placeholder={'placeholder'}
                    onChangeText={async (text) => {
                      setLocationSearchInput(text);
                      setSuggestedLocationOverrides(await googlePlacesQuery(text));
                      if (text.length == 0) {
                        setSuggestedLocationOverrides([]);
                      }
                    }}
                    onPressOut={async () => {
                      setSuggestedLocations(await googlePlacesQuery(locationInput));
                      // TODO users have to tap twice to get out of search. Yuck
                    }}
                    testID="SearchBar"
                    onPressIn={() => setScreenToDisplay(ScreenName.LocationChange)}
                    defaultValue={locationInput}
                    selectTextOnFocus={true}
                  />
                </View>
              </View>
            </View>
            <View style={styles.locationSearchSuggestions}>
              {screenToDisplay == ScreenName.LocationSearch ? (
                suggestedLocations.length > 0 ? (
                  suggestedLocations.map((location: GoogleLocation) => {
                    return (
                      <SearchSuggestionTile
                        image={true}
                        key={location.place_id}
                        location={location}
                        onPress={() => {
                          navigation.navigate('PlanMap', {
                            navigation: navigation,
                            route: route,
                            locations: [location],
                          });
                        }}
                      />
                    );
                  })
                ) : (
                  <AppText>Location search view </AppText>
                )
              ) : suggestedLocationOverrides.length > 0 ? (
                suggestedLocationOverrides.map((location: GoogleLocation) => {
                  return (
                    <SearchSuggestionTile
                      image={false}
                      key={location.place_id}
                      location={location}
                      onPress={() => {
                        const newLocation: UserLocation = {
                          longitude: location.geometry.location.lng,
                          latitude: location.geometry.location.lat,
                        };
                        setUserOverrideLocation(newLocation);
                        setLocationSearchInput(location.name);
                        setScreenToDisplay(ScreenName.LocationSearch);
                      }}
                    />
                  );
                })
              ) : (
                <AppText>Change my location</AppText>
              )}
            </View>
          </>
        )}
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
    position: 'absolute',
    alignSelf: 'center',
    width: 334,
    borderRadius: 5,
    backgroundColor: WHITE,
  },
  cancleSearchView: {
    position: 'absolute',
    marginTop: 0,
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
});
