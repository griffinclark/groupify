import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import { RoutePropParams } from '../res/root-navigation';
import { ActivityCard } from '../molecules/ActivityCard';
import { MapIcon } from '../../assets/Icons/IconExports';

export interface Props {
  distance: number;
  image: string;
  handleCreate: () => void;
  locations: any[];
  favorites: any[];
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
}

export const ActivityMap: React.FC<Props> = ({
  distance,
  favorites,
  handleCreate,
  image,
  locations,
  navigation,
  route,
}: Props) => {
  const [userLocation, setUserLocation] = useState({
    latitude: 41.878,
    longitude: -93.0977,
  }); // defaults to Los Angeles if user location is not provided
  const [region, setRegion] = useState({
    latitude: 41.878,
    longitude: -93.0977,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [card, setCard] = useState();

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

  return (
    <View style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} showsUserLocation={true} region={region} style={styles.map}>
        {/* {image && */}
        {locations.map((loc) => (
          <Marker
            coordinate={{
              latitude: loc.geometry.location.lat,
              longitude: loc.geometry.location.lng,
            }}
            icon={require('../../assets/MapMarker.png')}
            key={loc.place_id}
            onPress={() => setCard(loc)}
          />
        ))}
      </MapView>
      {card && (
        <View style={{ position: 'absolute', bottom: 0 }}>
          <ActivityCard
            favorites={favorites}
            route={route}
            navigation={navigation}
            handleCreate={handleCreate}
            location={card}
            map={true}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - (105 + Constants.statusBarHeight),
  },
  mapIcon: {
    alignSelf: 'center',
    marginTop: 18,
    height: 18,
    width: 18,
  },
});
