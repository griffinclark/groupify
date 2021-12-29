import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import Constants from 'expo-constants';
import { RoutePropParams } from '../res/root-navigation';
import { BackChevronIcon } from '../../assets/Icons/IconExports';
import { AppText } from '../atoms/AppText';
import { GREY_4, TEAL_0 } from '../res/styles/Colors';
import { ActivityMap, ActivityList } from '../organisms/OrganismsExports';
import { getCurrentUser } from './../res/utilFunctions';
import { ActivitySlider } from '../molecules/MoleculesExports';
import { getFavorites } from '../res/utilFavorites';
import { copy } from '../res/groupifyCopy';
import { GoogleLocation } from '../res/dataModels';
import { WHITE } from './../res/styles/Colors';
import { Screen } from '../atoms/Screen';
import { TopNavBar } from '../molecules/TopNavBar';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
    locations: GoogleLocation[];
    passedLocation: string;
    passedPlace: string;
  };
  route: RoutePropParams;
}

// FIXME secret is just being stored in text in Groupify!!!
const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';

export const PlanMap: React.FC<Props> = ({ navigation, route }: Props) => {
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
  const [localLocations, setLocalLocations] = useState<GoogleLocation[]>([]);
  const [title, setTitle] = useState<string>();
  const [image, setImage] = useState<string>();
  const [distance, setDistance] = useState<number>(30);

  useEffect(() => {
    if (region.default) {
      getUserLocation();
    }
    update();
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
        setLocalLocations(route.params.locations);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const update = () => {
    setTitle('copy.foodActivityTile');

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    setImage(require('../../assets/groupify_icon_official.png'));
  };
  const handleCreate = async (loc: GoogleLocation) => {
    const user = await getCurrentUser();
    navigation.navigate('PlanCreate', {
      currentUser: user,
      data: {
        eventData: {
          location: loc.formatted_address,
        },
      },
    });
  };

  return (
    <Screen style={styles.container}>
      <TopNavBar
        targetScreen="SelectorMenu"
        route={route}
        title="DO SOMETHING"
        displayGroupify={false}
        navigation={navigation}
      />
      {page === 'map' ? (
        <ActivityMap
          handleCreate={handleCreate}
          image={image}
          locations={localLocations}
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
            locations={localLocations}
            navigation={navigation}
            setRegion={setRegion}
            region={region}
          />
        </View>
      )}
    </Screen>
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
    fontSize: 16,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: -4,
    marginLeft: 18,
  },
  backButtonTemp: {
    borderBottomWidth: 1,
    backgroundColor: WHITE,
    borderBottomColor: GREY_4,
    flexDirection: 'row',
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
  navbarLogo: {
    height: 45,
    width: 130,
  },
  activitiesImage: {
    height: 30,
    width: 30,
  },
});
