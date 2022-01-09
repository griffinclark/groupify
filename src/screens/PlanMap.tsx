import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, ScrollView, View } from 'react-native';
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
import { MagnifyingGlassIcon } from './../../assets/Icons/MagnifyingGlass';
import { SearchbarDisplayMode, SearchbarWithoutFeedback } from '../molecules/SearchbarWithoutFeedback';
import { ProgressBar } from '../atoms/ProgressBar';

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
  const [mapIcon, setMapIcon] = useState('');
  const [selectedMapIcon, setSelectedMapIcon] = useState('');
  const [distance, setDistance] = useState(30); //TODO does this do anything?
  const [selectedMarker, setSelectedMarker] = useState('');
  const [radius, setRadius] = useState(1);
  const [menuHeight, setMenuHeight] = useState(175);

  useEffect(() => {
    if (region.default) {
      getStartRegion();
    }
  }, [userLocation, route.params.activity, distance]); //FIXME the fuck are the second two?

  useEffect(() => {
    if (route.params.place != undefined) {
      setRegion(route.params.place);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      setMapIcon(require('../../assets/locationPins/Location_Base.png'));
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      setSelectedMapIcon(require('../../assets/locationPins/Location_Selected.png'));
    }
  }, [route.params.place]); //FIXME the fuck is place?

  const getRaidus = () => {
    const zoom = Math.log2(360 * (Dimensions.get('window').width / 256 / region.longitudeDelta)) + 1;
    if (zoom < 10) {
      console.log('returning 1');
      return 1;
    } else {
      console.log('returning 100');
      return 100;
    }
  };

  const getStartRegion = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    } else {
      try {
        let location = await Location.getLastKnownPositionAsync();
        if (location === null) {
          location = await Location.getCurrentPositionAsync({ accuracy: LocationAccuracy.Highest });
        }

        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
          default: false,
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Screen style={styles.container}>
      {region.default == true ? (
        <>
          <ProgressBar />
          {/* TODO AppText not truncating properly */}
        </>
      ) : (
        <>
          <ScrollView>
            <TopNavBar
              targetScreen="SelectorMenu"
              route={route}
              title="DO SOMETHING"
              displayGroupify={false}
              navigation={navigation}
            />
            <View style={styles.mapContainer}>
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
                animationEnabled={false}
                showsBuildings={true}
                showsCompass={false}
                onRegionChange={async (region) => {
                  if (Math.log2(360 * (Dimensions.get('window').width / 256 / region.longitudeDelta)) + 1 < 13) {
                    // console.log('changing radius to 100');
                    setRadius(100);
                  } else {
                    // console.log('setting radius to 10');
                    setRadius(10);
                  }
                }}
                showsTraffic={false}
                userInterfaceStyle="dark"
                clusterColor={GOLD_0}
                spiderLineColor={GOLD_0}
                edgePadding={{ top: 50, left: 0, right: 0, bottom: 0 }}
                // clusteringEnabled={false}
                radius={radius}
                showsPointsOfInterest={false}
              >
                {route.params.placesUserWantsToGoResults.map((loc) => (
                  <Marker
                    coordinate={{
                      latitude: loc.geometry.location.lat,
                      longitude: loc.geometry.location.lng,
                    }}
                    onPress={() => {
                      setSelectedMarker(loc.place_id);
                      // console.log(loc.place_id);
                      // console.log(getZoomValue());
                    }}
                    key={loc.place_id}
                    style={styles.marker}
                  >
                    {/* TODO change icon on press */}
                    {loc.place_id == selectedMarker ? <MapIcon image={selectedMapIcon} /> : <MapIcon image={mapIcon} />}
                    <Text style={styles.mapText}>{loc.name}</Text>
                  </Marker>
                ))}
              </MapView>
            </View>

            {/* <View style={styles.slideUpMenu}></View> */}
          </ScrollView>
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
    height: Dimensions.get('window').height - (65 + Constants.statusBarHeight) - 175,
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
    fontSize: 11,
    maxHeight: 30,
    // maxWidth: 100,
    overflow: 'hidden',
    //TODO truncate text properly
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
  slideUpMenu: {
    backgroundColor: WHITE,
    height: 1000,
    zIndex: 2,
    position: 'absolute',
    width: '100%',
    marginBottom: 175,
  },
  mapContainer: {},
});
