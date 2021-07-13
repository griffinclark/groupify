import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { LatLng, Marker, Point, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { v4 as uuidv4 } from 'uuid';
import { PlaceCard } from '../molecules/MoleculesExports';
import { Screen, NavButton } from '../atoms/AtomsExports';
import { LT_PURPLE } from '../res/styles/Colors';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
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

export const SearchPlace: React.FC<Props> = ({ navigation }: Props) => {
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
          console.log(location);
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

  const onResultPress = async (data: GooglePlaceData, detail: GooglePlaceDetail | null) => {
    console.log(detail);
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
          title={detail.name}
          description={detail.formatted_address}
        />,
      );
      if (markerRef && markerRef.current) {
        markerRef.current.showCallout();
      }
      let height: string;
      if (moreDetails.photos) {
        if (moreDetails.photos.length > 5) {
          moreDetails.photos = moreDetails.photos.slice(0, 5);
        }
        height = '40%';
      } else {
        height = '20%';
      }
      const distanceInfo = await getDistanceAndDuration(
        `${userLocation.latitude},${userLocation.longitude}`,
        detail.place_id,
      );
      setPlaceCard(
        <PlaceCard
          style={{ height: height, ...styles.placeCard }}
          name={detail.name}
          address={detail.formatted_address}
          rating={moreDetails.rating ? moreDetails.rating : undefined}
          userRatings={moreDetails.user_ratings_total ? moreDetails.user_ratings_total : undefined}
          priceLevel={moreDetails.price_level ? moreDetails.price_level : undefined}
          distance={distanceInfo.distance}
          duration={distanceInfo.duration}
          openNow={moreDetails.opening_hours ? moreDetails.opening_hours.open_now : undefined}
          openHours={moreDetails.opening_hours ? moreDetails.opening_hours.weekday_text : undefined}
          photos={moreDetails.photos ? moreDetails.photos.map((obj) => obj.photo_reference) : undefined}
          onButtonPress={() => onButtonPress(detail.name, detail.formatted_address)}
        />,
      );
    }
  };

  const getDistanceAndDuration = async (origin: string, destination: string) => {
    const mode = 'driving';
    const units = 'imperial';
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?
origins=${origin}
&destinations=place_id:${destination}
&key=${GOOGLE_PLACES_API_KEY}
&mode='${mode}'
&units=${units}`,
    );
    const json = await response.json();
    return { distance: json.rows[0].elements[0].distance.text, duration: json.rows[0].elements[0].duration.text };
  };

  const onButtonPress = (title: string, address: string) => {
    navigation.navigate('CreateCustomEvent', { title, address });
    // pass place id
  };

  const onPoiPress = (poi: POI) => {
    console.log(poi);
    // TODO: Change marker to POI
  };

  const onMarkerPress = () => {
    // Show place card
  };

  return (
    <Screen>
      {/* TODO: Show categories */}
      {/* TODO: Show multiple markers */}
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={region}
        onPoiClick={(event) => onPoiPress(event.nativeEvent)}
        onMarkerPress={() => onMarkerPress()}
        style={styles.map}
      >
        {mapMarker ? mapMarker : null}
      </MapView>
      <View style={styles.navbar}>
        <NavButton onPress={() => navigation.navigate('Home', {})} title="Back" />
        <NavButton onPress={() => navigation.navigate('CreateCustomEvent', {})} title="next" />
        <View style={{ padding: 10 }} />
        <GooglePlacesAutocomplete
          placeholder="Search"
          query={{
            key: GOOGLE_PLACES_API_KEY,
            sessiontoken: sessionToken,
            location: `${userLocation.latitude}, ${userLocation.longitude}`,
            radius: 1000, // meters
          }}
          fetchDetails={true}
          onPress={onResultPress}
          onFail={(error) => console.log(error)}
          enablePoweredByContainer={false}
        />
      </View>
      <View style={styles.searchBarContainer}>{/* X button on the right to clear input field */}</View>
      {placeCard ? placeCard : null}
    </Screen>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    position: 'absolute',
    marginTop: 85,
    marginLeft: '10%',
    marginRight: '10%',
    alignItems: 'center',
    width: '80%',
  },
  placeCard: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: '1%',
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 5,
    borderColor: LT_PURPLE,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  navbar: {
    position: 'absolute',
    top: 50,
    paddingHorizontal: 5,
    display: 'flex',
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
