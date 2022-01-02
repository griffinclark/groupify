import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import Constants from 'expo-constants';
import { RoutePropParams } from '../res/root-navigation';
import { GOLD_0, GREY_4, GREY_8, TEAL_0 } from '../res/styles/Colors';
import { GoogleLocation } from '../res/dataModels';
import { WHITE, GREY_6 } from './../res/styles/Colors';
import { Screen } from '../atoms/Screen';
import { TopNavBar } from '../molecules/TopNavBar';
import { HomeNavBar } from '../molecules/HomeNavBar';
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
import { MapIcon } from './../../assets/Icons/MapIcon';
import { AppText } from '../atoms/AppText';
import { MagnifyingGlassIcon } from './../../assets/Icons/MagnifyingGlass';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
    push: (ev: string, {}) => void;
  };
  route: RoutePropParams;
  placesUserWantsToGoResults: GoogleLocation[];
}

// FIXME secret is just being stored in text in Groupify!!!
const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';

export const PlanMap: React.FC<Props> = ({ navigation, route }: Props) => {
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
  const [localLocations, setLocalLocations] = useState<GoogleLocation[]>([]); //TODO rename
  const [mapIcon, setMapIcon] = useState<string>();
  const [distance, setDistance] = useState<number>(30); //TODO does this do anything?

  useEffect(() => {
    if (region.default) {
      getUserLocation();
    }
  }, [userLocation, route.params.activity, distance]); //FIXME the fuck are the second two?

  useEffect(() => {
    if (route.params.place != undefined) {
      setRegion(route.params.place);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      setMapIcon(require('../../assets/locationPins/Location_Base.png'));
    }
  }, [route.params.place]); //FIXME the fuck is place?

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
        setLocalLocations(route.params.placesUserWantsToGoResults); //FIXME the fuck is locations?
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Screen style={styles.container}>
      <TopNavBar
        targetScreen="SelectorMenu"
        route={route}
        title="DO SOMETHING"
        displayGroupify={false}
        navigation={navigation}
      />
      {region.default == true ? (
        <>
          <AppText numberOfLines={2}>Loading map</AppText>
          {/* TODO AppText not truncating properly */}
        </>
      ) : (
        <>
          <TouchableWithoutFeedback
            // FIXME make this its own component
            onPress={() => {
              navigation.navigate('TakeoverSearch', {
                navigation: navigation,
                route: route,
                tempUserLocationQuery: route.params.tempUserLocationQuery,
                userLocation: userLocation,
              });
            }}
          >
            <View style={styles.searchBarContainer}>
              <View style={styles.magnifyingGlassIcon}>
                <MagnifyingGlassIcon />
              </View>
              <AppText style={styles.searchBarText}>Current location</AppText>
            </View>
          </TouchableWithoutFeedback>
          {/* TODO MapView has to be built dynamically based on number of locations and distance between locations */}
          <MapView
            initialRegion={region}
            style={styles.map}
            // disable showsUserLocation because it's slightly off from the one Apple displays, leading to 2 user locations shown
            showsUserLocation={false}
            //FIXME user is grouping with locations
            animationEnabled={false}
            showsBuildings={true}
            showsCompass={false}
            showsTraffic={true}
            userInterfaceStyle="dark"
            clusterColor={GOLD_0}
            // radius={40}
            showsPointsOfInterest={false}
          >
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
            >
              <View style={styles.userMarker} />
            </Marker>
            {localLocations.map((loc) => (
              <Marker
                coordinate={{
                  latitude: loc.geometry.location.lat,
                  longitude: loc.geometry.location.lng,
                }}
                onPress={() => console.log('pinned pressed')}
                key={loc.place_id}
                style={styles.marker}
              >
                {/* TODO change icon on press */}
                <MapIcon image={mapIcon} />
                <Text style={styles.mapText}>{loc.name}</Text>
              </Marker>
            ))}
          </MapView>
        </>
      )}

      <HomeNavBar
        locations={[]}
        user={route.params.currentUser}
        navigation={navigation}
        userPlans={[]}
        userLocation={userLocation}
        invitedPlans={[]}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {},
  navbar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 26,
    paddingHorizontal: 30,
    paddingTop: Constants.statusBarHeight,
    // height: 99,
  },
  navbarText: {
    fontSize: 16,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: -4,
    marginLeft: 18,
  },
  backButtonTemp: {
    borderBottomWidth: 1,
    backgroundColor: WHITE,
    borderBottomColor: GREY_4,
    flexDirection: 'row',
  },
  favorites: {
    fontSize: 20,
  },
  switch: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  activeTab: {
    alignItems: 'center',
    borderBottomColor: TEAL_0,
    borderBottomWidth: 1.5,
    flex: 1,
    paddingBottom: 14,
  },
  inactiveTab: {
    alignItems: 'center',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1.5,
    flex: 1,
  },
  activeText: {
    color: TEAL_0,
    fontSize: 16,
    fontWeight: '700',
  },
  inactiveText: {},
  navbarLogo: {
    height: 45,
    width: 130,
  },
  activitiesImage: {
    height: 30,
    width: 30,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - (105 + Constants.statusBarHeight),
  },
  userMarker: {
    backgroundColor: TEAL_0,
    borderColor: WHITE,
    borderRadius: 12.5,
    borderWidth: 3,
    height: 25,
    width: 25,
  },
  marker: {
    position: 'absolute',
    alignItems: 'center',
    width: 100,
  },
  mapText: {
    fontWeight: '800',
    textAlign: 'center',
    color: TEAL_0,
    // textShadowOffset: { width: 2, height: 2 },
    // textShadowRadius: 20,
    // textShadowColor: WHITE,
  },
  magnifyingGlassIcon: {
    padding: 15,
  },
  searchBarContainer: {
    width: 334,
    zIndex: 1,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: GREY_6,
    borderWidth: 1,
    borderRadius: 5,
    position: 'absolute',
    marginTop: 90,
    backgroundColor: WHITE,
  },
  searchBarText: {
    color: GREY_8,
  },
});
