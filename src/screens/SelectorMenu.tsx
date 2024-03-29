import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Screen } from '../atoms/Screen';
import { BLACK, GREY_4, GREY_6, WHITE } from '../res/styles/Colors';
import { HomeNavBar } from '../molecules/HomeNavBar';
import { GoogleLocation, ActivityEnum, UserLocation } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { MagnifyingGlassIcon } from '../../assets/Icons/MagnifyingGlass';
import { TopNavBar } from '../molecules/TopNavBar';
import { googlePlacesQuery, GooglePlacesQueryOptions, getUserLocation } from '../res/utilFunctions';
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
}

export const SelectorMenu: React.FC<Props> = ({ navigation, route }: Props) => {
  const [featuredLocations, setFeaturedLocations] = useState<GoogleLocation[]>([]);
  //const [placesUserWantsToGoQuery, setPlacesUserWantsToGoQuery] = useState('');
  //const [tempUserLocationQuery, setTempUserLocationQuery] = useState('');
  const [scrollTop, setScrollTop] = useState(true);
  const [userLocation, setUserLocation] = useState<UserLocation>();

  const randomEnumKey = (enumeration: typeof ActivityEnum) => {
    const keys = Object.keys(enumeration).filter((k) => !(Math.abs(Number.parseInt(k)) + 1));
    const enumKey = keys[Math.floor(Math.random() * keys.length)];
    return enumKey;
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      setUserLocation(await getUserLocation());
    };

    fetchUserLocation();
  }, []);

  useEffect(() => {
    const randomKey = randomEnumKey(ActivityEnum);

    const buildFeatureLocations = async () => {
      if (userLocation) {
        setFeaturedLocations(
          await googlePlacesQuery(ActivityEnum[randomKey], userLocation, GooglePlacesQueryOptions.Activity),
        );
      }
    };

    buildFeatureLocations();
  }, [userLocation]);

  const handleScrollView = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollTop(e.nativeEvent.contentOffset.y > 300);
  };

  const bgImage = [
    require('../../assets/activity-selector-bg/image-activity-1.png'),
    require('../../assets/activity-selector-bg/image-activity-2.png'),
    require('../../assets/activity-selector-bg/image-activity-3.png'),
    require('../../assets/activity-selector-bg/image-activity-4.png'),
    require('../../assets/activity-selector-bg/image-activity-5.png'),
  ];

  // const bgImageIndex = Math.floor(Math.random() * 4);
  const bgImageIndex = 3;
  
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
          navigation={navigation}
          displayGroupify={true}
          displayBackButton={false}
          displaySettings={true}
          route={route}
          targetScreen={'SelectorMenu'}
        />

        <View>
          <Image style={{ width: 'auto', height: 260 }} source={bgImage[bgImageIndex]} />
        </View>
        {userLocation && (
          <View style={[styles.searchBar, scrollTop ? { backgroundColor: WHITE } : {}]}>
            <SearchbarWithoutFeedback
              navigation={navigation}
              route={route}
              userLocation={userLocation}
              icon={<MagnifyingGlassIcon />}
              placeholderText="Search for food, parks, coffee, etc"
              tempUserLocation={
                route.params?.data?.activitySearchData?.tempUserLocation
                  ? route.params.data.activitySearchData.tempUserLocation
                  : userLocation
              }
              placesUserWantsToGoQuery={''}
              tempUserLocationQuery={''}
              mode={SearchbarDisplayMode.Query}
              currentUser={route.params.currentUser}
            />
          </View>
        )}

        <ActivitySelector route={route} navigation={navigation} userLocation={userLocation} />

        <View style={styles.locationSuggestions}>
          {featuredLocations.length > 0 ? (
            <LocationResults
              navigation={navigation}
              route={route}
              locations={featuredLocations}
              tempUserLocationQuery={''}
              userLocation={userLocation}
            />
          ) : (
            <ProgressBar />
          )}
        </View>
      </ScrollView>
      {userLocation && (
        <HomeNavBar user={route.params.currentUser} navigation={navigation} route={route} userLocation={userLocation} />
      )}
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
