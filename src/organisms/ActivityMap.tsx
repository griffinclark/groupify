import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Constants from 'expo-constants';
import { RoutePropParams } from '../res/root-navigation';
import { ActivityCard } from '../molecules/ActivityCard';
import { MapIcon } from '../../assets/Icons/IconExports';
import { TEAL } from '../res/styles/Colors';

export interface Props {
  distance: number;
  image: any;
  handleCreate: (loc: any) => void;
  locations: any[];
  favorites: any[];
  region: any;
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
  userLocation: any;
}

export const ActivityMap: React.FC<Props> = ({
  distance,
  favorites,
  handleCreate,
  image,
  locations,
  navigation,
  route,
  region,
  userLocation,
}: Props) => {
  const [card, setCard] = useState();

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        // showsUserLocation={true}
        region={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta,
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
        >
          <View style={styles.userMarker} />
        </Marker>
        {locations.map((loc) => (
          <Marker
            coordinate={{
              latitude: loc.geometry.location.lat,
              longitude: loc.geometry.location.lng,
            }}
            onPress={() => setCard(loc)}
            key={loc.place_id}
            style={{ position: 'absolute' }}
          >
            <MapIcon image={image} />
          </Marker>
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
            image={image}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  userMarker: {
    backgroundColor: TEAL,
    borderColor: '#fff',
    borderRadius: 12.5,
    borderWidth: 3,
    height: 25,
    width: 25,
  },
});
