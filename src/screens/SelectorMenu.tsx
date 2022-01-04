import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Animated, View, Image, ScrollView } from 'react-native';
import { Screen } from '../atoms/Screen';
import { BLACK, GREY_4, GREY_6, WHITE } from '../res/styles/Colors';
import { AppText } from '../atoms/AppText';
import { HomeNavBar } from '../molecules/HomeNavBar';
import { GoogleLocation, UserLocation } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { ActivityCard } from './../molecules/ActivityCard';
import { MagnifyingGlassIcon } from '../../assets/Icons/MagnifyingGlass';
import { TopNavBar } from '../molecules/TopNavBar';
import { googlePlacesQuery, GooglePlacesQueryOptions } from '../res/utilFunctions';
import { SearchbarWithoutFeedback } from './../molecules/SearchbarWithoutFeedback';
import { TEAL_0 } from './../res/styles/Colors';
import { ProgressBar } from '../atoms/ProgressBar';
export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
    push: () => void;
  };
  route: RoutePropParams;
  userLocation: UserLocation;
}
// Stored as 2d array to make it really easy to edit where options show up in the activity selector
export const activities: string[][] = [
  ['Food', 'Outdoors', 'Shop', 'Coffee', 'Fitness'],
  ['Nightlife', 'Events', 'Culture', 'Relax'],
];

export const SelectorMenu: React.FC<Props> = ({ navigation, route }: Props) => {
  const [featuredLocations, setFeaturedLocations] = useState<GoogleLocation[]>([]);
  const [placesUserWantsToGoQuery, setPlacesUserWantsToGoQuery] = useState('');
  const [tempUserLocationQuery, setTempUserLocationQuery] = useState('');

  useEffect(() => {
    setTempUserLocationQuery('');
    setPlacesUserWantsToGoQuery('');
    const buildFeatureLocations = async () => {
      setFeaturedLocations(
        await googlePlacesQuery('park', route.params.tempUserLocation, GooglePlacesQueryOptions.Activity),
      );
    };
    buildFeatureLocations();
  }, []);

  const getSVG = (str: string) => {
    // return <SvgUri width="20" height="20" source={require('../../assets/activityIcons/Coffee.svg')} />;
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

  return (
    <Screen style={styles.screen}>
      <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[1]}>
        <TopNavBar title="" navigation={navigation} displayGroupify={true} route={route} targetScreen={'Home'} />
        <View style={styles.searchBar}>
          <SearchbarWithoutFeedback
            navigation={navigation}
            route={route}
            userLocation={route.params.userLocation}
            icon={<MagnifyingGlassIcon />}
            placeholderText="Search for food, parks, coffee, etc"
            tempUserLocation={route.params.tempUserLocation}
            placesUserWantsToGoQuery={placesUserWantsToGoQuery}
            tempUserLocationQuery={tempUserLocationQuery}
          />
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
                    onPress={async () => {
                      console.log(route.params.userLocation);

                      const activities: GoogleLocation[] = await googlePlacesQuery(
                        activity,
                        route.params.userLocation,
                        GooglePlacesQueryOptions.Activity,
                      );

                      console.log(route.params.userLocation);
                      navigation.navigate('PlanMap', {
                        navigation: { navigation },
                        route: { route },
                        placesUserWantsToGoQuery: { activity },
                        tempUserLocationQuery: '',
                        userLocation: route.params.userLocation,
                        placesUserWantsToGoResults: activities,
                        tempUserLocation: route.params.tempUserLocation,
                      });
                    }}
                    testID={activity}
                    key={activity}
                  >
                    <View style={styles.activitiesImageContainer}>
                      {getSVG(activity)}
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
          {featuredLocations.length > 0 ? (
            featuredLocations.map((location: GoogleLocation) => {
              return <ActivityCard key={location.place_id} navigation={navigation} location={location} map={false} />;
            })
          ) : (
            <ProgressBar />
          )}
        </View>
      </ScrollView>

      <HomeNavBar
        locations={[]}
        user={route.params.currentUser}
        navigation={navigation}
        userPlans={[]}
        invitedPlans={[]}
        userLocation={route.params.userLocation}
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
  activitySelectorButtonImage: {
    height: 20,
    width: 20,
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
