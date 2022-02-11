import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Screen } from '../atoms/Screen';
import { BLACK, GREY_4, GREY_6, WHITE } from '../res/styles/Colors';
import { HomeNavBar } from '../molecules/HomeNavBar';
import { GoogleLocation, ActivityEnum, UserLocation, LoadingState } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { MagnifyingGlassIcon } from '../../assets/Icons/MagnifyingGlass';
import { TopNavBar } from '../molecules/TopNavBar';
import { getCurrentUser, googlePlacesQuery, GooglePlacesQueryOptions } from '../res/utilFunctions';
import { SearchbarDisplayMode, SearchbarWithoutFeedback } from './../molecules/SearchbarWithoutFeedback';
import { ProgressBar } from '../atoms/ProgressBar';
import { ActivitySelector } from '../molecules/ActivitySelector';
import { LocationResults } from '../molecules/LocationResults';
import { getUserLocation } from './../res/utilFunctions';
import { User } from '../models';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
    push: () => void;
  };
  route: RoutePropParams;
}

export const SelectorMenu: React.FC<Props> = ({ navigation, route }: Props) => {
  const [featuredLocations, setFeaturedLocations] = useState<GoogleLocation[]>([]);
  //const [placesUserWantsToGoQuery, setPlacesUserWantsToGoQuery] = useState('');
  //const [tempUserLocationQuery, setTempUserLocationQuery] = useState('');
  const [scrollTop, setScrollTop] = useState(true);
  const [userLocation, setUserLocation] = useState<UserLocation>({ latitude: 0, longitude: 0 }); // defaults to Los Angeles if user location is not provided and no place param
  const [currentUser, setCurrentUser] = useState<User>();
  const [state, setState] = useState(LoadingState.Loading);

  const randomEnumKey = (enumeration: typeof ActivityEnum) => {
    const keys = Object.keys(enumeration).filter((k) => !(Math.abs(Number.parseInt(k)) + 1));
    const enumKey = keys[Math.floor(Math.random() * keys.length)];
    return enumKey;
  };

  useEffect(() => {
    const awaitUser = async () => {
      setCurrentUser(await getCurrentUser());
    };
    awaitUser();
  }, []);

  useEffect(() => {
    const setupUserLocation = async () => {
      setUserLocation(await getUserLocation());
    };
    setupUserLocation();
  }, [currentUser]);

  useEffect(() => {
    const buildFeatureLocations = async () => {
      const randomKey = randomEnumKey(ActivityEnum);
      setFeaturedLocations(
        await googlePlacesQuery(ActivityEnum[randomKey], userLocation, GooglePlacesQueryOptions.Activity),
      );
    };
    if (userLocation && currentUser) {
      buildFeatureLocations().then(() => setState(LoadingState.Loaded));
    } else {
      console.log('current user: ', currentUser + '\nuser location: ', userLocation);
    }
  }, [userLocation]);

  const handleScrollView = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollTop(e.nativeEvent.contentOffset.y > 300);
  };

  const getTempUserLocation = (): UserLocation => {
    try {
      return route.params.data.activitySearchData.tempUserLocation;
    } catch {
      return userLocation;
    }
  };

  const bgImage = [
    require('../../assets/activity-selector-bg/image-activity-1.png'),
    require('../../assets/activity-selector-bg/image-activity-2.png'),
    require('../../assets/activity-selector-bg/image-activity-3.png'),
    require('../../assets/activity-selector-bg/image-activity-4.png'),
    require('../../assets/activity-selector-bg/image-activity-5.png'),
  ];

  const bgImageIndex = Math.floor(Math.random() * 4);

  return (
    <Screen style={styles.screen}>
      <ScrollView
        style={styles.scrollContainer}
        stickyHeaderIndices={[2]}
        onScroll={handleScrollView}
        scrollEventThrottle={32}
      >
        <TopNavBar
          stickyHeader={false}
          title=""
          navigation={navigation}
          displayGroupify={true}
          displayBackButton={false}
          route={route}
          targetScreen={'Home'}
        />

        <View>
          <Image style={{ width: 'auto', height: 260 }} source={bgImage[bgImageIndex]} />
        </View>

        <View style={[styles.searchBar, scrollTop ? { backgroundColor: WHITE } : {}]}>
          <SearchbarWithoutFeedback
            navigation={navigation}
            route={route}
            userLocation={userLocation}
            icon={<MagnifyingGlassIcon />}
            placeholderText="Search for food, parks, coffee, etc"
            tempUserLocation={getTempUserLocation()}
            placesUserWantsToGoQuery={''}
            tempUserLocationQuery={''}
            mode={SearchbarDisplayMode.Query}
          />
        </View>
        <ActivitySelector route={route} navigation={navigation} userLocation={userLocation} currentUser={currentUser} />

        <View style={styles.locationSuggestions}>
          {state === LoadingState.Loading ? (
            <ProgressBar />
          ) : (
            <LocationResults
              navigation={navigation}
              route={route}
              locations={featuredLocations}
              tempUserLocationQuery={''}
              userLocation={userLocation}
            />
          )}
        </View>
      </ScrollView>

      <HomeNavBar user={currentUser} userLocation={userLocation} navigation={navigation} route={route} />
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
    //height: 45,
    // width: 130,
  },
  activitySuggestions: {
    backgroundColor: WHITE,
    height: '58%',
  },
  middleText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrollContainer: {
    marginBottom: 50,
    paddingBottom: 400,
  },
  locationSuggestions: {
    marginTop: 30,
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
    alignSelf: 'center',
    marginTop: -30,
    marginBottom: -30,
    width: '100%',
    padding: 10,
    height: 65,
    alignItems: 'center',
    zIndex: 1,
  },
});
