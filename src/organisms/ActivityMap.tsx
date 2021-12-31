import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Constants from 'expo-constants';
import { MapIcon } from '../../assets/Icons/IconExports';
import { TEAL_0, WHITE } from '../res/styles/Colors';
import { getFavorites } from '../res/utilFavorites';
import { useIsFocused } from '@react-navigation/native';
import { GoogleLocation } from './../res/dataModels';
import { SvgUri, SvgXml } from 'react-native-svg';

export interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  handleCreate: (loc: GoogleLocation) => void;
  locations: GoogleLocation[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  region: any;
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
  userLocation: Record<string, number>;
}

export const ActivityMap: React.FC<Props> = ({
  handleCreate,
  image,
  locations,
  navigation,
  region,
  userLocation,
}: Props) => {
  const isFocused = useIsFocused();

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
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
            onPress={() => console.log('pinned pressed')}
            key={loc.place_id}
            style={{ position: 'absolute' }}
          >
            <MapIcon image={image} />
            {/* <SvgXml width="20" height="20" xml={require('../../assets/locationPins/Location_Selected.svg')} /> */}
          </Marker>
        ))}
      </MapView>
      {/* {card && (
        <View style={{ position: 'absolute', bottom: 0 }}>
          <ActivityCard
            favoritesArr={favoritesArr}
            setFavoritesArr={setFavoritesArr}
            navigation={navigation}
            handleCreate={handleCreate}
            location={card}
            map={true}
            image={image}
          />
        </View>
      )} */}
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
    backgroundColor: TEAL_0,
    borderColor: WHITE,
    borderRadius: 12.5,
    borderWidth: 3,
    height: 25,
    width: 25,
  },
});
