import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import MapView, { LatLng, Marker, Point, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { v4 as uuidv4 } from 'uuid';
import { PlaceCard } from '../molecules/MoleculesExports';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { mapStyles } from '../res/styles/MapStyles';
import { RoutePropParams } from '../res/root-navigation';
import { TEAL } from '../res/styles/Colors';
import { Button } from '../atoms/AtomsExports';
import { Image } from 'react-native-elements/dist/image/Image';
import { AppText } from '../atoms/AppText';
import { WHITE } from '../res/styles/Colors';

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
  const [mapPopupOpen, setMapPopupOpen] = useState(true);

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

  const onResultPress = async (data: GooglePlaceData, detail: GooglePlaceDetail | null) => {
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
        >
          <Image
            source={require('../../assets/MapMarker.png')}
            style={{ width: 48, height: 66 }}
            // resizeMode={'contain'}
          />
        </Marker>,
      );

      if (markerRef && markerRef.current) {
        markerRef.current.showCallout();
      }
      let height: string;
      if (moreDetails.photos) {
        if (moreDetails.photos.length > 5) {
          moreDetails.photos = moreDetails.photos.slice(0, 5);
        }
        height = '45%';
      } else {
        height = '30%';
      }
      const distanceInfo = await getDistanceAndDuration(
        `${userLocation.latitude},${userLocation.longitude}`,
        detail.place_id,
      ).catch((error) => console.log(error));
      setPlaceCard(
        <PlaceCard
          //   style={{ height: height }}
          name={detail.name}
          address={detail.formatted_address}
          rating={moreDetails.rating ? moreDetails.rating : undefined}
          userRatings={moreDetails.user_ratings_total ? moreDetails.user_ratings_total : undefined}
          priceLevel={moreDetails.price_level ? moreDetails.price_level : undefined}
          distance={distanceInfo ? distanceInfo.distance : undefined}
          duration={distanceInfo ? distanceInfo.duration : undefined}
          openNow={moreDetails.opening_hours ? moreDetails.opening_hours.open_now : undefined}
          openHours={moreDetails.opening_hours ? moreDetails.opening_hours.weekday_text : undefined}
          photos={moreDetails.photos ? moreDetails.photos.map((obj) => obj.photo_reference) : undefined}
          onButtonPress={() =>
            onButtonPress(
              detail.name,
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

  const getDistanceAndDuration = async (origin: string, destination: string) => {
    const mode = 'driving';
    const units = 'imperial';
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=place_id:${destination}&key=${GOOGLE_PLACES_API_KEY}&mode=${mode}&units=${units}`;
    const response = await fetch(url);
    const json = await response.json();
    return { distance: json.rows[0].elements[0].distance.text, duration: json.rows[0].elements[0].duration.text };
  };

  const onButtonPress = (title: string, address: string, placeId: string, photo: string) => {
    console.log('Location');
    console.log(location);
    navigation.navigate('PlanCreate', {
      currentUser: route.params.currentUser,
      data: {
        eventData: {
          title: title,
          location: address,
          imageURL: photo,
          placeId: placeId,
        },
      },
    });
  };

  const onPoiPress = async (poi: POI) => {
    const search = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${poi.placeId}&key=${GOOGLE_PLACES_API_KEY}`;
    const response = await fetch(search);
    const detail = await response.json();
    onResultPress(poi, detail.result);
  };

  const clearMarkers = () => {
    setPlaceCard(undefined);
    setMapMarker(undefined);
  };
  return (
    <View style={styles.container}>
      {/* TODO: Show categories */}
      {/* TODO: Show multiple markers */}
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={region}
        onPoiClick={(event) => onPoiPress(event.nativeEvent)}
        style={styles.map}
        customMapStyle={mapStyles}
        onPress={clearMarkers}
      >
        {mapMarker ? mapMarker : null}
      </MapView>

      <View style={styles.navbar}>
        <Icon
          name="chevron-left"
          type="font-awesome"
          size={30}
          onPress={() => navigation.navigate('PlanCreate', {})}
          style={styles.navbarIcon}
        />

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
          styles={{
            textInput: {
              borderColor: '#C5C5C5',
              borderRadius: 5,
              borderWidth: 1,
              marginRight: 20,
              //   position: 'absolute',
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

      {/* {mapPopupOpen ? (
        <View style={styles.popup}>
          <View style={styles.mapPopup}>
            <AppText style={styles.mapPopupText}>Select or search for a location on the map for your plan.</AppText>
            <Button title="Okay" onPress={() => setMapPopupOpen(false)} />
          </View>
        </View>
      ) : null}
      <TouchableOpacity
        style={styles.skip}
        onPress={() => {
          navigation.navigate('CreateCustomEvent', { currentUser: route.params.currentUser });
        }}
      >
        <AppText style={styles.skipText}>Skip</AppText>
      </TouchableOpacity>
      <View style={styles.searchBarContainer}>X button on the right to clear input field</View> */}
      {placeCard ? placeCard : null}
    </View>
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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: WHITE,
    flexDirection: 'row',
    height: 83,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  navbarIcon: {
    marginLeft: 27,
    marginRight: 35,
  },
  container: {
    flex: 1,
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
