import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import Constants from 'expo-constants';
import { RoutePropParams } from '../res/root-navigation';
import { BackChevronIcon } from '../../assets/Icons/IconExports';
import { AppText } from '../atoms/AppText';
import { TEAL_0 } from '../res/styles/Colors';
import { ActivityMap, ActivityList } from '../organisms/OrganismsExports';
import { getCurrentUser } from './../res/utilFunctions';
import { ActivitySlider } from '../molecules/MoleculesExports';
import { getFavorites } from '../res/utilFavorites';
import { copy } from '../res/groupifyCopy';
import { GoogleLocation } from '../res/dataModels';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
}

// FIXME secret is just being stored in text in Groupify!!!
const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';

export const ActivityResults: React.FC<Props> = ({ navigation, route }: Props) => {
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
  const [page, setPage] = useState<string>('map');
  const [locations, setLocations] = useState([]);
  const [title, setTitle] = useState<string>();
  const [image, setImage] = useState<string>();
  const [distance, setDistance] = useState<number>(30);

  useEffect(() => {
    getUserLocation();
  }, []);
  useEffect(() => {
    if (region.default) {
      getUserLocation();
    }
    update();
    queryActivities();
  }, [userLocation, route.params.activity, distance]);

  useEffect(() => {
    setPage('map');
  }, [region]);

  useEffect(() => {
    if (route.params.place != undefined) {
      setPage('map');
      setRegion(route.params.place);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      setImage(require('../../assets/activity-fav.png'));
    }
  }, [route.params.place]);

  const getUserLocation = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    } else {
      try {
        let location = await Location.getLastKnownPositionAsync();

        console.log(location);

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

        queryActivities();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const update = () => {
    switch (route.params.activity) {
      case 'restaurant':
        setTitle(copy.foodActivityTile);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        setImage(require('../../assets/activity-food.png'));
        break;
      case 'park':
        setTitle(copy.outsideActivityTile);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        setImage(require('../../assets/activity-outside.png'));
        break;
      case 'gym':
        setTitle(copy.workoutActivityTile);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        setImage(require('../../assets/activity-gym.png'));
        break;
      case 'shopping':
        setTitle(copy.shopActivityTile);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        setImage(require('../../assets/activity-shopping.png'));
        break;
      case 'coffee':
        setTitle(copy.coffeeActivityTile);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        setImage(require('../../assets/activity-coffee.png'));
        break;
      case 'relax':
        setTitle(copy.relaxActivityTile);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        setImage(require('../../assets/activity-relax.png'));
        break;
      case 'bar':
        setTitle(copy.nightlifeActivityTile);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        setImage(require('../../assets/activity-bar.png'));
        break;
      case 'entertainment':
        setTitle(copy.entertainmentActivityTile);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        setImage(require('../../assets/activity-entertainment.png'));
        break;
      case 'museum':
        setTitle(copy.artAndCultureActivityTile);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        setImage(require('../../assets/activity-art.png'));
        break;
      case 'favorites':
        setTitle(copy.favoritesActivityTile);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        setImage(require('../../assets/activity-fav.png'));
        break;
      default:
        setTitle(copy.defaultActivityTile);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        setImage(require('../../assets/activity-search.png'));
    }
  };

  const queryActivities = async () => {
    if (route.params.activity === 'favorites') {
      const favorites = await getFavorites();
      setLocations(favorites);
    } else {
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
    }
  };

  const handleCreate = async (loc: GoogleLocation) => {
    const user = await getCurrentUser();

    navigation.navigate('PlanCreate', {
      currentUser: user,
      data: {
        planData: {
          location: loc.formatted_address,
          locationName: loc.name,
          placeId: loc.place_id,
        },
      },
    });
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ActivityFavorites', {});
            }}
          >
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
          handleCreate={handleCreate}
          image={image}
          locations={locations}
          navigation={navigation}
          region={region}
          userLocation={userLocation}
        />
      ) : (
        <View>
          <ActivitySlider distance={distance} setDistance={setDistance} />
          <ActivityList
            handleCreate={handleCreate}
            image={image}
            locations={locations}
            navigation={navigation}
            setRegion={setRegion}
            region={region}
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
    color: TEAL_0,
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
    borderBottomColor: TEAL_0,
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
    color: TEAL_0,
    fontSize: 16,
    fontWeight: '700',
  },
  inactiveText: {},
});
