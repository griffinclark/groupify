import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FavoriteIcon } from '../../assets/Icons/IconExports';
import { AppText } from '../atoms/AtomsExports';
import { TEAL, YELLOW } from '../res/styles/Colors';
import { Icon } from 'react-native-elements/dist/icons/Icon';
// import * as SecureStore from 'expo-secure-store';
import { MapIcon } from '../../assets/Icons/IconExports';
import { addFavorite, deleteFavorite } from '../res/utilFavorites';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleCreate: (loc: any) => void;
  // favorites: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: any;
  map: boolean;
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleRegion?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  region?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  favoritesArr: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFavoritesArr: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTrigger?: any;
  trigger?: boolean;
}

export const ActivityCard: React.FC<Props> = ({
  favoritesArr,
  setFavoritesArr,
  map,
  handleCreate,
  location,
  handleRegion,
  image,
  setTrigger,
  trigger,
}: Props) => {
  if (!location.geometry) return null;
  const formatAddress = () => {
    if (!location.formatted_address) return null;
    const addressArr = location.formatted_address.split(',');
    const firstLine = addressArr.slice(0, -2);
    const lastLine = addressArr.slice(-2);
    return (
      <View>
        <View>
          <AppText style={styles.address}>{firstLine.join(',')}</AppText>
        </View>
        <View>
          <AppText style={styles.address}>{lastLine.join(',')}</AppText>
        </View>
      </View>
    );
  };

  const formatMoney = () => {
    let str = '';
    let i = 0;
    while (i < location.price_level) {
      str += '$';
      i++;
    }
    return str;
  };

  const renderStars = () => {
    if (!location.rating) return null;

    const arr = Array(5).fill('#c4c4c4');
    const star = Math.round(location.rating);
    let i = 0;
    while (i < star) {
      arr[i] = YELLOW;
      i++;
    }

    return (
      <View style={{ flexDirection: 'row' }}>
        {arr.map((ele, idx) => (
          <Icon color={ele} key={idx} name="star" type="font-awesome" size={15} />
        ))}
      </View>
    );
  };

  const handleToggleFavorite = async () => {
    if (favoritesArr.includes(location.place_id)) {
      const newFavs = await deleteFavorite(location.place_id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setFavoritesArr(newFavs.map((ele: any) => ele.place_id));
      if (trigger != undefined) setTrigger(!trigger);
    } else {
      const newFavs = await addFavorite(location);
      setFavoritesArr(newFavs.map((ele) => ele.place_id));
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardTop}>
          <View style={{ width: 147 }}>
            <AppText style={styles.name}>{location.name}</AppText>
            <AppText style={styles.rating}>
              {location.rating} {renderStars()} ({location.user_ratings_total})
            </AppText>
            <AppText>{formatMoney()}</AppText>
            {formatAddress()}
          </View>
          <MapView
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: location.geometry.location.lat + 0.0005,
              longitude: location.geometry.location.lng,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
            }}
            style={styles.map}
            zoomEnabled={false}
            zoomTapEnabled={false}
            rotateEnabled={false}
            scrollEnabled={false}
          >
            <Marker
              coordinate={{
                latitude: location.geometry.location.lat,
                longitude: location.geometry.location.lng,
              }}
            >
              <MapIcon image={image ? image : require('../../assets/activity-fav.png')} />
            </Marker>
          </MapView>
        </View>
        <View style={[styles.cardBottom, map != true ? styles.cardBottomFav : null]}>
          {map != true && (
            <TouchableOpacity style={styles.locationButton} onPress={() => handleRegion(location)}>
              <AppText style={styles.locationButtonText}>Show Location</AppText>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={() => handleCreate(location)}>
            <AppText style={styles.buttonText}>Create Plan</AppText>
          </TouchableOpacity>
        </View>
      </View>
      <FavoriteIcon
        favorited={favoritesArr.includes(location.place_id) ? true : false}
        onPress={handleToggleFavorite}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    minHeight: 203,
    paddingTop: 18,
    paddingHorizontal: 13,
    width: Dimensions.get('window').width,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: 1,
    marginRight: 8,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
  rating: {
    fontSize: 15,
  },
  address: {
    fontSize: 12,
    lineHeight: 14,
  },
  map: {
    borderRadius: 10,
    width: 128,
    height: 115,
    marginLeft: 19,
  },
  cardBottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardBottomFav: {
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    backgroundColor: TEAL,
    borderRadius: 5,
    justifyContent: 'center',
    //marginLeft: 16,
    height: 49,
    width: 150,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },
  locationButton: {
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: TEAL,
    height: 49,
    justifyContent: 'center',
    width: 150,
  },
  locationButtonText: {
    color: TEAL,
    fontSize: 20,
    fontWeight: '900',
  },
});
