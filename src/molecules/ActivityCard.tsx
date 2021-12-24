import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { ActivityImage } from '../molecules/ActivityImage';
import { FavoriteIcon } from '../../assets/Icons/IconExports';
import { AppText } from '../atoms/AtomsExports';
import { GOLD_0, GREY_3, TEAL_0, WHITE, YELLOW } from '../res/styles/Colors';
import { Icon } from 'react-native-elements/dist/icons/Icon';
// import * as SecureStore from 'expo-secure-store';
import { MapIcon } from '../../assets/Icons/IconExports';
import { addFavorite, deleteFavorite } from '../res/utilFavorites';
import { GoogleLocation } from '../res/dataModels';
import { GREY_4 } from './../res/styles/Colors';

interface Props {
  handleCreate: (loc: GoogleLocation) => void;
  location: GoogleLocation;
  map: boolean;
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
  onPress: () => void;
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
  onPress,
}: Props) => {
  if (!location.geometry) return null;
  console.log(location.formatted_address);
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

    const arr = Array(5).fill(GREY_4);
    const star = Math.round(location.rating);
    let i = 0;
    while (i < star) {
      arr[i] = GOLD_0;
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
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.leftCol}>
        <View style={styles.imageContainer}>
          <ActivityImage referenceId={location.photos[0].photo_reference} width={89} height={89} />
        </View>
      </View>
      <View style={styles.rightCol}>
        <AppText style={styles.rating}>
          {location.rating} {renderStars()} ({location.user_ratings_total})
        </AppText>
        <AppText style={styles.name}>{location.name}</AppText>
        {formatAddress()}
      </View>
    </TouchableOpacity>
  );
};
/*


<View style={styles.cardContent}>
        <View style={styles.cardTop}>
          <View style={{ width: 147 }}>
            <AppText>{formatMoney()}</AppText>
          </View>
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

*/
const styles = StyleSheet.create({
  card: {
    backgroundColor: WHITE,
    minHeight: 107,
    paddingTop: 18,
    paddingHorizontal: 13,
    width: Dimensions.get('window').width,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  leftCol: {
    paddingRight: 10,
  },
  rightCol: {},

  cardContent: {
    flex: 1,
    marginRight: 8,
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
  cardBottomFav: {
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    backgroundColor: TEAL_0,
    borderRadius: 5,
    justifyContent: 'center',
    //marginLeft: 16,
    height: 49,
    width: 150,
  },
  buttonText: {
    color: WHITE,
    fontSize: 20,
    fontWeight: '900',
  },
  locationButtonText: {
    color: TEAL_0,
    fontSize: 20,
    fontWeight: '900',
  },
  locationImage: {
    height: 89,
    width: 89,
  },
  imageContainer: {
    paddingBottom: 10,
  },
});
