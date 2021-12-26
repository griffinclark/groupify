import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { Screen } from '../atoms/Screen';
import { GOLD_0, GREY_1, GREY_3, GREY_4, GREY_6, WHITE } from '../res/styles/Colors';
import { AppText } from '../atoms/AppText';
import { HomeNavBar } from '../molecules/HomeNavBar';
import { Button } from '../atoms/Button';
import { SearchBar } from '../atoms/SearchBar';
import { getCurrentUser } from '../res/utilFunctions';
import { GoogleLocation } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { ActivityCard } from './../molecules/ActivityCard';
import { SearchSuggestionTile } from '../molecules/SearchSuggestionTile';
import { MagnifyingGlassIcon } from '../../assets/Icons/MagnifyingGlass';
import { MapLinkIcon } from './../../assets/Icons/MapLink';
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
  const [searchView, setSearchView] = useState(false);
  const [locationSearchView, setLocationSearchView] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestedLocations, setSuggestedLocations] = useState<GoogleLocation[]>([]);
  const [searchLocations, setSearchLocations] = useState<GoogleLocation[]>([]);
  const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';

  const getSearchBarStyle = (): StyleProp<ViewStyle> => {
    if (searchView) {
      return {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 64,
        width: 334,
        borderRadius: 5,
        backgroundColor: WHITE,
        zIndex: 1,
      };
    } else {
      return {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 254,
        width: 334,
        borderRadius: 5,
        backgroundColor: WHITE,
        zIndex: 2,
      };
    }
  };

  const ActivitySelector: React.FC<Props> = ({ navigation, route }: Props) => {
    return (
      <View style={styles.cancleSearchView}>
        <View style={styles.navbarPlaceholder}>
          <Image source={require('../../assets/Splash_Logo.png')} style={styles.navbarLogo} />
          <Image source={require('../../assets/activity-relax.png')} style={styles.activitiesImage} />
        </View>
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
                    <Image source={require('../../assets/activity-coffee.png')} style={styles.activitiesImage} />
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

  const LocationSuggestions = ({ navigation, route }: Props) => {
    // FIXME check if locations is null. If it is, run query before rendering component
    return (
      <View style={styles.locationSuggestions}>
        {route.params.locations.map((location: GoogleLocation) => {
          return (
            <ActivityCard
              key={location.place_id}
              handleCreate={() => {
                console.log('write handle create');
              }}
              navigation={navigation}
              location={location}
              map={false}
            />
          );
        })}
      </View>
    );
  };

  const LocationSearch: React.FC<Props> = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setSearchView(false);
          }}
          style={styles.backButtonTemp}
        >
          <Image source={require('../../assets/Splash_Logo.png')} style={styles.navbarLogo} />
          <Image source={require('../../assets/activity-relax.png')} style={styles.activitiesImage} />
        </TouchableOpacity>
        <View style={styles.locationSearchSuggestions}>
          {searchLocations.length > 0 ? (
            searchLocations.map((location: GoogleLocation) => {
              return (
                <SearchSuggestionTile
                  key={location.place_id}
                  location={location}
                  onPress={() => {
                    console.log('hi');
                  }}
                />
              );
            })
          ) : (
            <AppText>Loading...</AppText>
          )}
        </View>
      </>
    );
  };

  const TakeoverSearch: React.FC<Props> = ({ navigation, route }: Props) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setSearchView(false);
          }}
          style={styles.backButtonTemp}
        >
          <Image source={require('../../assets/Splash_Logo.png')} style={styles.navbarLogo} />
          <Image source={require('../../assets/activity-relax.png')} style={styles.activitiesImage} />
        </TouchableOpacity>
        <View style={styles.locationSearchContainer}>
          <SearchBar
            leftIcon={<MapLinkIcon />}
            onPressIn={() => console.log('setLocationSearchView(true)')} // FIXME fix double tap bug
            placeholder="Current location"
            onInputChange={() => {
              console.log('input changed');
            }}
          />
        </View>
        <View style={styles.locationSearchSuggestions}>
          {locationSearchView ? (
            <>
              {suggestedLocations.length > 0 ? (
                suggestedLocations.map((location: GoogleLocation) => {
                  const locations: GoogleLocation[] = [location];
                  return (
                    <SearchSuggestionTile
                      key={location.place_id}
                      location={location}
                      onPress={() => {
                        navigation.navigate('PlanMap', {
                          navigation: { navigation },
                          route: { route },
                          locations: { locations },
                        });
                      }}
                    />
                  );
                })
              ) : (
                <AppText>Location search view {locationSearchView}</AppText>
              )}
            </>
          ) : (
            <>
              {suggestedLocations.length > 0 ? (
                suggestedLocations.map((location: GoogleLocation) => {
                  const locations: GoogleLocation[] = [location];
                  return (
                    <SearchSuggestionTile
                      key={location.place_id}
                      location={location}
                      onPress={() => {
                        navigation.navigate('PlanMap', {
                          navigation: { navigation },
                          route: { route },
                          locations: { locations },
                        });
                      }}
                    />
                  );
                })
              ) : (
                <AppText>{'locationSearchView ' + locationSearchView}</AppText>
              )}
            </>
          )}
        </View>
      </>
    );
  };

  return (
    <Screen style={styles.screen}>
      <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[0]}>
        <View style={getSearchBarStyle()}>
          <SearchBar
            leftIcon={<MagnifyingGlassIcon />}
            onPressIn={() => setSearchView(true)}
            placeholder="Search for food, parks, coffee, etc"
            onInputChange={async (text: string) => {
              const search =
                'https://maps.googleapis.com/maps/api/place/textsearch/json?' +
                `location=${route.params.userLocation.latitude},${route.params.userLocation.longitude}` +
                `&radius=${50000}` +
                `&query=${text}` +
                `&key=${GOOGLE_PLACES_API_KEY}`;
              const response = await fetch(search);
              const detail = await response.json();
              detail.results.sort(
                (a: GoogleLocation, b: GoogleLocation) => b.user_ratings_total - a.user_ratings_total,
              );

              setSuggestedLocations(detail.results);
              // FIXME sort these
            }}
          />
        </View>

        {searchView ? (
          <TakeoverSearch navigation={navigation} route={route} />
        ) : (
          <>
            <ActivitySelector navigation={navigation} route={route} />
            <LocationSuggestions route={route} navigation={navigation} />
          </>
        )}
      </ScrollView>

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
  activitySelectorSpacing: {
    height: 380,
  },
  searchBarContainer: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 209,
    width: 334,
    borderRadius: 5,
    backgroundColor: WHITE,
  },
  cancleSearchView: {
    position: 'absolute',
    marginTop: 0,
  },
  activitySelector: {
    paddingTop: 39,
    backgroundColor: WHITE,
    zIndex: -1,
  },
  activitySuggestions: {
    backgroundColor: GREY_1,
    height: '58%',
  },
  middleText: { color: 'white', fontWeight: 'bold' },
  scrollContainer: {
    marginBottom: 50,
  },
  locationSuggestions: {
    marginTop: 155,
    zIndex: 1,
  },
  backButtonTemp: {
    position: 'absolute',
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: GREY_4,
    flexDirection: 'row',
    width: '100%',
  },
  behindSearchBarDiv: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 10,
    width: '100%',
    backgroundColor: GOLD_0,
    zIndex: 1,
    paddingTop: 10,
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
    color: GREY_3,
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
