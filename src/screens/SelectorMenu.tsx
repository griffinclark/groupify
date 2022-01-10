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
import { SearchbarDisplayMode, SearchbarWithoutFeedback } from './../molecules/SearchbarWithoutFeedback';
import { ProgressBar } from '../atoms/ProgressBar';
import { ActivitySelector } from '../molecules/ActivitySelector';
import { LocationResults } from '../molecules/LocationResults';
interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
    push: () => void;
  };
  route: RoutePropParams;
  userLocation: UserLocation;
}

export const SelectorMenu: React.FC<Props> = ({ navigation, route }: Props) => {
  const [featuredLocations, setFeaturedLocations] = useState<GoogleLocation[]>([]);
  const [placesUserWantsToGoQuery, setPlacesUserWantsToGoQuery] = useState('');
  const [tempUserLocationQuery, setTempUserLocationQuery] = useState('');

  useEffect(() => {
    // TODO @JONI do we want to be resetting one or both of these?
    setTempUserLocationQuery('');
    setPlacesUserWantsToGoQuery('');
    const buildFeatureLocations = async () => {
      setFeaturedLocations(
        await googlePlacesQuery('things to do', route.params.tempUserLocation, GooglePlacesQueryOptions.Activity),
      );
    };
    buildFeatureLocations();
  }, []);

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
            mode={SearchbarDisplayMode.Query}
          />
        </View>
        <View style={styles.activitySelectorRoot}>
          <View>
            <Image source={require('../../assets/activity-selector-background-image.png')} />
          </View>
          <ActivitySelector route={route} navigation={navigation} />
          <View style={styles.activitySuggestions}></View>
        </View>
        <View style={styles.locationSuggestions}>
          {featuredLocations.length > 0 ? (
            <LocationResults navigation={navigation} route={route} locations={featuredLocations} />
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
  activitiesImage: {
    height: 30,
    width: 30,
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
