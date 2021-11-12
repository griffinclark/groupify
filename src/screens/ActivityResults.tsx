import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import Constants from 'expo-constants';
import { RoutePropParams } from '../res/root-navigation';
import { BackChevronIcon } from '../../assets/Icons/IconExports';
import { AppText } from '../atoms/AppText';
import { TEAL } from '../res/styles/Colors';
import { ActivityMap, ActivityList } from '../organisms/OrganismsExports';
import * as SecureStore from 'expo-secure-store';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
}

const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';

export const ActivityResults: React.FC<Props> = ({ navigation, route }: Props) => {
  const [userLocation, setUserLocation] = useState({
    latitude: 41.878,
    longitude: -93.0977,
    default: true,
  }); // defaults to Los Angeles if user location is not provided
  const [region, setRegion] = useState({
    latitude: 41.878,
    longitude: -93.0977,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [page, setPage] = useState<string>('map');
  const [locations, setLocations] = useState([]);
  const [title, setTitle] = useState<string>();
  const [image, setImage] = useState<string>('');
  const [favorites, setFavorites] = useState([]);
  const [distance, setDistance] = useState<number>(50);

  useEffect(() => {
    if (userLocation.default) {
      getUserLocation();
    }
    update();
    queryActivities();
  }, [userLocation, route.params.activity, distance]);

  useEffect(() => {
    getFavorites();
  }, [favorites]);

  const getUserLocation = async () => {
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
          default: false,
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
  };

  const update = () => {
    switch (route.params.activity) {
      case 'restaurant':
        setTitle('Get Food');
        setImage('food');
        break;
      case 'park':
        setTitle('Go Outside');
        setImage('outside');
        break;
      case 'gym':
        setTitle('Get Fit');
        setImage('gym');
        break;
      case 'shopping':
        setTitle('Go Shopping');
        setImage('shopping');
        break;
      case 'coffee':
        setTitle('Get Coffee');
        setImage('Coffee');
        break;
      case 'relax':
        setTitle('Get Relaxed');
        setImage('relax');
        break;
      case 'bar':
        setTitle('Nightlife');
        setImage('bar');
        break;
      case 'entertainment':
        setTitle('Entertainment');
        setImage('entertainment');
        break;
      case 'museum':
        setTitle('Art & Culture');
        setImage('art');
        break;
      case 'favorites':
        setTitle('Favorites');
        break;
      default:
        setTitle('Search Results');
    }
  };

  const queryActivities = async () => {
    const distanceMeters = 1609.34 * distance > 40000 ? 40000 : 1609.34 * distance;
    const search =
      'https://maps.googleapis.com/maps/api/place/textsearch/json?' +
      `location=${userLocation.latitude},${userLocation.longitude}` +
      `&radius=${distanceMeters}` +
      `&query=${route.params.activity}` +
      `&key=${GOOGLE_PLACES_API_KEY}`;

    const response = await fetch(search);
    const detail = await response.json();
    setLocations(detail.results);
  };

  const getFavorites = async (): Promise<void> => {
    const favorites = await SecureStore.getItemAsync('favorites');
    setFavorites([]);
  };

  const handleCreate = () => {
    console.log('hit');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.navbar}>
          <View style={{ flexDirection: 'row' }}>
            <BackChevronIcon
              onPress={() => {
                navigation.goBack();
              }}
            />
            <AppText style={styles.navbarText}>{title}</AppText>
          </View>
          <TouchableOpacity>
            <AppText style={styles.favorites}>Favorites</AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.switch}>
          <View style={page === 'map' ? styles.activeTab : styles.inactiveTab}>
            <TouchableOpacity onPress={() => setPage('map')}>
              <AppText style={page === 'map' ? styles.activeText : styles.inactiveText}>Map</AppText>
            </TouchableOpacity>
          </View>

          <View style={page === 'list' ? styles.activeTab : styles.inactiveTab}>
            <TouchableOpacity onPress={() => setPage('list')}>
              <AppText style={page === 'list' ? styles.activeText : styles.inactiveText}>List</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {page === 'map' ? (
        <ActivityMap
          favorites={favorites}
          distance={distance}
          handleCreate={handleCreate}
          image={image}
          locations={locations}
          navigation={navigation}
          route={route}
        />
      ) : (
        <ActivityList
          favorites={favorites}
          distance={distance}
          setDistance={setDistance}
          handleCreate={handleCreate}
          locations={locations}
          navigation={navigation}
          route={route}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {},
  navbar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 26,
    paddingHorizontal: 30,
    paddingTop: Constants.statusBarHeight,
    // height: 99,
  },
  navbarText: {
    fontSize: 30,
    fontWeight: '700',
    color: TEAL,
    marginTop: -4,
    marginLeft: 18,
  },
  favorites: {
    fontSize: 20,
  },
  switch: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  activeTab: {
    alignItems: 'center',
    borderBottomColor: TEAL,
    borderBottomWidth: 1.5,
    flex: 1,
    paddingBottom: 14,
  },
  inactiveTab: {
    alignItems: 'center',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1.5,
    flex: 1,
  },
  activeText: {
    color: TEAL,
    fontSize: 16,
    fontWeight: '700',
  },
  inactiveText: {},
});
