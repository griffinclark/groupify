import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Animated, View, Image, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
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
  //const [placesUserWantsToGoQuery, setPlacesUserWantsToGoQuery] = useState('');
  //const [tempUserLocationQuery, setTempUserLocationQuery] = useState('');
  const [scrollTop, setScrollTop] = useState(true);
  
  useEffect(() => {
    // TODO @JONI do we want to be resetting one or both of these?
    //setTempUserLocationQuery('');
    //setPlacesUserWantsToGoQuery('');
    const buildFeatureLocations = async () => {
      setFeaturedLocations(
        await googlePlacesQuery('things to do', route.params.data.activitySearchData.tempUserLocation, GooglePlacesQueryOptions.Activity),
      );
    };
    buildFeatureLocations();
  }, []);

  const handleScrollView = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollTop(e.nativeEvent.contentOffset.y > 300)
  }

  return (
    <Screen style={styles.screen}>
      <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[2]} onScroll={handleScrollView} scrollEventThrottle={32}>
        <TopNavBar title="" navigation={navigation} displayGroupify={true} displayBackButton={false} route={route} targetScreen={'Home'} />
          <View>
            <Image style={{width: '100%'}} source={require('../../assets/activity-selector-background-image.png')} />
          </View>

          <View style={[styles.searchBar, scrollTop ? {backgroundColor: WHITE} : {}]}>
            <SearchbarWithoutFeedback
              navigation={navigation}
              route={route}
              userLocation={route.params.userLocation}
              icon={<MagnifyingGlassIcon />}
              placeholderText="Search for food, parks, coffee, etc"
              tempUserLocation={route.params.data.activitySearchData.tempUserLocation}
              placesUserWantsToGoQuery={''}
              tempUserLocationQuery={''}
              mode={SearchbarDisplayMode.Query}
            />
          </View>
          <ActivitySelector route={route} navigation={navigation} />

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
  activitySuggestions: {
    backgroundColor: WHITE,
    height: '58%',
  },
  middleText: { 
    color: 'white', 
    fontWeight: 'bold' 
  },
  scrollContainer: {
    marginBottom: 50,
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
