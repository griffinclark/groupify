import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { GoogleLocation, Photo } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { v4 as uuidv4 } from 'uuid';
import * as Location from 'expo-location';
import MapView, { LatLng, Marker, Point, PROVIDER_GOOGLE } from 'react-native-maps';
import { PlaceCard } from '../molecules/PlaceCard';
import { GREY_6, TEAL_0, WHITE } from '../res/styles/Colors';
import Constants from 'expo-constants';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { LocationAccuracy } from 'expo-location';
import { HomeNavBar } from '../molecules/HomeNavBar';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
  route: RoutePropParams;
  locations?: GoogleLocation[];
}
const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';

export const PlanMap: React.FC<Props> = ({ navigation, route, locations }: Props) => {
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
  const onPoiPress = async (poi: POI) => {
    const search = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${poi.placeId}&key=${GOOGLE_PLACES_API_KEY}`;
    const response = await fetch(search);
    const detail = await response.json();
    onResultPress(detail.result);
  };
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
          photos={moreDetails.photos ? moreDetails.photos.map((obj: any) => obj.photo_reference) : undefined}
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

  const clearMarkers = () => {
    setPlaceCard(undefined);
    setMapMarker(undefined);
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

  return (
    <View style={styles.screen}>
      <View style={styles.navbarPlaceholder}>
        <Image source={require('../../assets/Splash_Logo.png')} style={styles.navbarLogo} />
        <Image source={require('../../assets/activity-relax.png')} style={styles.activitiesImage} />
      </View>
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
      <HomeNavBar invitedPlans={[]} userPlans={[]} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: WHITE,
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: 587,
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
    backgroundColor: TEAL_0,
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
    color: TEAL_0,
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  navbarPlaceholder: {
    backgroundColor: WHITE,
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  navbarLogo: {
    height: 40,
    width: 130,
  },
  activitiesImage: {
    height: 30,
    width: 30,
  },
});
