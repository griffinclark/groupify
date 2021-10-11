import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { LatLng, Marker, Point, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { v4 as uuidv4 } from 'uuid';
import { PlaceCard } from '../molecules/MoleculesExports';
import { RoutePropParams } from '../res/root-navigation';
import Constants from 'expo-constants';

import { AppText } from '../atoms/AtomsExports';
import { BackChevronIcon } from '../../assets/Icons/BackChevron';
import { TEAL, WHITE } from '../res/styles/Colors';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
  route: RoutePropParams;
}

const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';

interface GooglePlaceDetailExtended extends GooglePlaceDetail {
  rating: number;
  user_ratings_total: number;
  reviews: Record<string, unknown>[];
  price_level: number;
  opening_hours: {
    open_now: boolean;
    weekday_text: string[];
  };
  photos: {
    photo_reference: string;
  }[];
}

interface POI {
  coordinate: LatLng;
  position: Point;
  placeId: string;
  name: string;
}

export const PlanMap: React.FC<Props> = ({ navigation, route }: Props) => {
  const [userLocation, setUserLocation] = useState({
    latitude: 41.878,
    longitude: -93.0977,
  }); // defaults to Los Angeles if user location is not provided
  const [region, setRegion] = useState({
    latitude: 41.878,
    longitude: -93.0977,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [mapMarker, setMapMarker] = useState<JSX.Element>();
  const markerRef = useRef<Marker>(null);
  const [placeCard, setPlaceCard] = useState<JSX.Element>();
  const [sessionToken, setSessionToken] = useState(uuidv4());

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      } else {
        try {
          let location = await Location.getLastKnownPositionAsync();
          if (location === null) {
            location = await Location.getCurrentPositionAsync({ accuracy: LocationAccuracy.Low });
          }
          setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          });
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, []);

  const onResultPress = async (detail: GooglePlaceDetail | null) => {
    const moreDetails = detail as GooglePlaceDetailExtended;
    setSessionToken(uuidv4());
    if (detail) {
      setRegion({
        latitude: detail.geometry.location.lat,
        longitude: detail.geometry.location.lng,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      });
      setMapMarker(
        <Marker
          ref={markerRef}
          coordinate={{
            latitude: detail.geometry.location.lat,
            longitude: detail.geometry.location.lng,
          }}
          icon={require('../../assets/MapMarker.png')}
        />,
      );

      if (markerRef && markerRef.current) {
        markerRef.current.showCallout();
      }
      setPlaceCard(
        <PlaceCard
          name={detail.name}
          address={detail.formatted_address}
          rating={moreDetails.rating ? moreDetails.rating : undefined}
          userRatings={moreDetails.user_ratings_total ? moreDetails.user_ratings_total : undefined}
          priceLevel={moreDetails.price_level ? moreDetails.price_level : undefined}
          openHours={moreDetails.opening_hours ? moreDetails.opening_hours.weekday_text : undefined}
          photos={moreDetails.photos ? moreDetails.photos.map((obj) => obj.photo_reference) : undefined}
          onButtonPress={() =>
            onButtonPress(
              detail.formatted_address,
              detail.place_id,
              moreDetails.photos ? moreDetails.photos[0].photo_reference : '',
            )
          }
          onCloseButtonPress={clearMarkers}
        />,
      );
    }
  };

  const onButtonPress = (address: string, placeId: string, photo: string) => {
    if (route.params.option === 'edit') {
      navigation.navigate('EditPlan', { data: { eventData: { placeId: placeId, location: address } } });
    } else {
      navigation.navigate('PlanCreate', {
        currentUser: route.params.currentUser,
        data: {
          eventData: {
            location: address,
            imageURL: photo,
            placeId: placeId,
          },
        },
      });
    }
  };

  const onPoiPress = async (poi: POI) => {
    const search = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${poi.placeId}&key=${GOOGLE_PLACES_API_KEY}`;
    const response = await fetch(search);
    const detail = await response.json();
    onResultPress(detail.result);
  };

  const clearMarkers = () => {
    setPlaceCard(undefined);
    setMapMarker(undefined);
  };
  return (
    // <Screen>
    <View style={styles.container}>
      {/* TODO: Show categories */}
      {/* TODO: Show multiple markers */}
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={region}
        onPoiClick={(event) => onPoiPress(event.nativeEvent)}
        style={styles.map}
        // customMapStyle={mapStyles}
        onPress={clearMarkers}
      >
        {mapMarker ? mapMarker : null}
      </MapView>

      <View style={styles.navbar}>
        <View style={styles.navbarBackground} />

        <View style={styles.navbarIcon}>
          <BackChevronIcon onPress={() => navigation.navigate('PlanCreate', route.params)} />
        </View>

        <GooglePlacesAutocomplete
          placeholder="Search"
          query={{
            key: GOOGLE_PLACES_API_KEY,
            sessiontoken: sessionToken,
            location: `${userLocation.latitude}, ${userLocation.longitude}`,
            radius: 1000, // meters
          }}
          fetchDetails={true}
          onPress={(data, detail) => onResultPress(detail)}
          onFail={(error) => console.log(error)}
          enablePoweredByContainer={false}
          styles={{
            textInput: {
              borderColor: '#C5C5C5',
              borderRadius: 5,
              borderWidth: 1,
              marginRight: 20,
              marginTop: Constants.statusBarHeight - 15,
            },
            row: {
              padding: 30,
              alignItems: 'center',
            },
            listView: {
              marginHorizontal: 10,
              marginLeft: -25,
              width: 500,
            },
          }}
          renderRow={(rowData) => {
            const title = rowData.structured_formatting.main_text;
            const address = rowData.structured_formatting.secondary_text;
            return (
              <View style={{ position: 'absolute' }}>
                <AppText style={{ fontSize: 14, fontWeight: '700' }}>{title}</AppText>
                <AppText style={{ fontSize: 14 }}>{address}</AppText>
              </View>
            );
          }}
        />
      </View>
      {placeCard ? placeCard : null}
    </View>
    /* </Screen> */
  );
};

console.log(Constants.statusBarHeight);

const styles = StyleSheet.create({
  searchBarContainer: {
    position: 'absolute',
    marginTop: 85,
    marginLeft: '10%',
    marginRight: '10%',
    alignItems: 'center',
    width: '80%',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  navbar: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    width: '100%',

    paddingTop: 15,
  },
  navbarBackground: {
    backgroundColor: WHITE,
    // height: 83,
    // height: 98,
    height: Constants.statusBarHeight + 60,
    position: 'absolute',
    width: '100%',
  },
  navbarIcon: {
    marginLeft: 27,
    marginRight: 35,
    marginTop: Constants.statusBarHeight - 10,
  },
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
  },
  skip: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: TEAL,
    width: 75,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  skipText: {
    color: 'white',
    fontWeight: '800',
  },
  popup: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  mapPopup: {
    top: 110,
    backgroundColor: 'white',
    width: '95%',
    alignSelf: 'center',
    height: 250,
    justifyContent: 'space-evenly',
    borderRadius: 20,
  },
  mapPopupText: {
    fontWeight: '400',
    fontSize: 24,
    color: TEAL,
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center',
  },
});
