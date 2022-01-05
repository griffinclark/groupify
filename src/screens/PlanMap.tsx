import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import Constants from 'expo-constants';
import { RoutePropParams } from '../res/root-navigation';
import { GOLD_0, GREY_4, GREY_8, GREY_6, TEAL_0, WHITE } from '../res/styles/Colors';
import { GoogleLocation } from '../res/dataModels';
import { Screen } from '../atoms/Screen';
import { TopNavBar } from '../molecules/TopNavBar';
import { HomeNavBar } from '../molecules/HomeNavBar';
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
import { MapIcon } from './../../assets/Icons/MapIcon';
import { AppText } from '../atoms/AppText';
import { MagnifyingGlassIcon } from './../../assets/Icons/MagnifyingGlass';
import { SearchbarDisplayMode, SearchbarWithoutFeedback } from '../molecules/SearchbarWithoutFeedback';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
    push: (ev: string, {}) => void;
  };
  route: RoutePropParams;
  placesUserWantsToGoResults: GoogleLocation[];
  tempUserLocationQuery: string;
  placesUserWantsToGoQuery: string;
}

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
  // const [localLocations, setLocalLocations] = useState<GoogleLocation[]>([]); //TODO rename
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
        // setLocalLocations(route.params.placesUserWantsToGoResults); //FIXME the fuck is locations?
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
          <View style={styles.searchBarContainer}>
            <SearchbarWithoutFeedback
              route={route}
              icon={<MagnifyingGlassIcon />}
              placeholderText={'route.params.tempUserLocationQuery'}
              navigation={navigation}
              tempUserLocationQuery={route.params.tempUserLocationQuery}
              userLocation={route.params.userLocation}
              tempUserLocation={route.params.tempUserLocation}
              placesUserWantsToGoQuery={route.params.placesUserWantsToGoQuery}
              mode={SearchbarDisplayMode.Result}
            />
          </View>
          {/* TODO MapView has to be built dynamically based on number of locations and distance between locations */}
          <MapView
            initialRegion={region}
            style={styles.map}
            showsUserLocation={true}
            //FIXME user is grouping with locations
            animationEnabled={false}
            showsBuildings={true}
            showsCompass={false}
            showsTraffic={false}
            userInterfaceStyle="dark"
            clusterColor={GOLD_0}
            // radius={40}
            showsPointsOfInterest={false}
          >
            {route.params.placesUserWantsToGoResults.map((loc) => (
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
    height: '100%',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - (65 + Constants.statusBarHeight),
    // height: '100%',
  },
  marker: {
    position: 'absolute',
    alignItems: 'center',
    width: 100,
  },
  mapText: {
    fontWeight: '800',
    textAlign: 'center',
    color: WHITE,
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
    marginTop: 95,
    backgroundColor: WHITE,
  },
  searchBarText: {
    color: GREY_8,
  },
});
