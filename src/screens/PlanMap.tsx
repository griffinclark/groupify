import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import Constants from 'expo-constants';
import { RoutePropParams } from '../res/root-navigation';
import { GOLD_0, GREY_8, GREY_6, WHITE } from '../res/styles/Colors';
import { GoogleLocation, UserLocation } from '../res/dataModels';
import { Screen } from '../atoms/Screen';
import { TopNavBar } from '../molecules/TopNavBar';
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
import { MapIcon } from './../../assets/Icons/MapIcon';
import { MagnifyingGlassIcon } from './../../assets/Icons/MagnifyingGlass';
import { SearchbarDisplayMode, SearchbarWithoutFeedback } from '../molecules/SearchbarWithoutFeedback';
import { ActivitySelectorSlideUpCard } from '../organisms/ActivitySelectorSlideUpCard';

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
  userLocation: UserLocation;
}

export const PlanMap: React.FC<Props> = ({ navigation, route, tempUserLocationQuery }: Props) => {
  const [userLocation, setUserLocation] = useState<UserLocation>({
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
  // const [mapIcon, setMapIcon] = useState('');
  // const [selectedMapIcon, setSelectedMapIcon] = useState('');
  const [selectedMarker, setSelectedMarker] = useState('');
  const [radius, setRadius] = useState(1);
  const [placesUserWantsToGo, setPlacesUserWantsToGo] = useState<GoogleLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<GoogleLocation>();

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mapMarker = require('../../assets/locationPins/Location_Base.png');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mapSelectedMarker = require('../../assets/locationPins/Location_Selected.png');

  const mapRef = useRef();

  useEffect(() => {
    if (placesUserWantsToGo.length === 1) {
      setSelectedLocation(placesUserWantsToGo[0]);
    }

    if (placesUserWantsToGo.length != 1 && region.default) {
      getStartRegion();
    }
  }, [userLocation, route.params.activity, placesUserWantsToGo]); //FIXME the fuck are the second two?

  useEffect(() => {
    setPlacesUserWantsToGo(route.params.data.activitySearchData.placesUserWantsToGoResults);
  }, []);

  useEffect(() => {
    if (route.params.place != undefined) {
      setRegion(route.params.place);
    }
  }, [route.params.place]); //FIXME the fuck is place?

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
      } catch (e) {
        console.log(e);
      }
    }
  };

  const setSelectedLocationFn = (location: GoogleLocation) => {
    setSelectedMarker(location.place_id);
    setSelectedLocation(location);

    const region = {
      latitude: location.geometry.location.lat,
      longitude: location.geometry.location.lng,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009,
      default: false,
    };

    setRegion(region);

    mapRef.current?.animateToRegion(region, 2000);
  };

  return (
    <Screen style={styles.container}>
      {region.default == true ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <>
          <TopNavBar
            stickyHeader={false}
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
                placeholderText={route.params.data.activitySearchData.tempUserLocationQuery}
                navigation={navigation}
                tempUserLocationQuery={route.params.data.activitySearchData.tempUserLocationQuery}
                userLocation={userLocation}
                tempUserLocation={route.params.data.activitySearchData.tempUserLocation}
                placesUserWantsToGoQuery={route.params.data.activitySearchData.placesUserWantsToGoQuery}
                mode={SearchbarDisplayMode.Result}
                currentUser={route.params.currentUser}
              />
            </View>
            {/* TODO MapView has to be built dynamically based on number of locations and distance between locations */}
            <MapView
              ref={mapRef}
              initialRegion={region}
              style={styles.map}
              showsUserLocation={true}
              animationEnabled={false}
              showsBuildings={true}
              showsCompass={false}
              onRegionChange={async (region) => {
                // console.log(Math.log2(360 * (Dimensions.get('window').width / 256 / region.longitudeDelta)));
                if (Math.log2(360 * (Dimensions.get('window').width / 256 / region.longitudeDelta)) < 12) {
                  setRadius(100);
                } else if (Math.log2(360 * (Dimensions.get('window').width / 256 / region.longitudeDelta)) < 14) {
                  setRadius(80);
                } else {
                  setRadius(30);
                }
              }}
              showsTraffic={false}
              userInterfaceStyle="dark"
              clusterColor={GOLD_0}
              spiderLineColor={GOLD_0}
              edgePadding={{ top: 100, left: 75, right: 75, bottom: 350 }}
              clusteringEnabled={false}
              radius={radius}
              showsPointsOfInterest={false}
            >
              {placesUserWantsToGo.map((loc) => (
                <Marker
                  coordinate={{
                    latitude: loc.geometry.location.lat,
                    longitude: loc.geometry.location.lng,
                  }}
                  onPress={() => {
                    setSelectedLocation(loc);
                  }}
                  key={loc.place_id}
                  style={styles.marker}
                >
                  {/* TODO change icon on press */}
                  {loc.place_id == selectedMarker ? (
                    <MapIcon image={mapSelectedMarker} />
                  ) : (
                    <MapIcon image={mapMarker} />
                  )}
                  <Text style={styles.mapText}>{loc.name}</Text>
                </Marker>
              ))}
            </MapView>
          </View>
          <ActivitySelectorSlideUpCard
            navigation={navigation}
            route={route}
            selectedLocation={selectedLocation}
            userLocation={route.params.data.activitySearchData.tempUserLocation}
            locations={route.params.data.activitySearchData.placesUserWantsToGoResults}
            tempUserLocationQuery={tempUserLocationQuery}
            onSelectLocation={setSelectedLocationFn}
            currentUser={route.params.currentUser}
          />
        </>
      )}

      {/* <HomeNavBar
        locations={[]}
        route={route}
        user={route.params.currentUser}
        navigation={navigation}
        userPlans={[]}
        invitedPlans={[]}
      /> */}
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
    height: Dimensions.get('window').height,
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // zIndex: 3
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
    marginTop: Constants.statusBarHeight,
    backgroundColor: WHITE,
  },
  searchBarText: {
    color: GREY_8,
  },
  slideUpMenu: {
    backgroundColor: WHITE,
    height: 1000,
    zIndex: 2,
    // position: 'absolute',
    width: '100%',
    marginBottom: 175,
  },
  mapContainer: {},
});
