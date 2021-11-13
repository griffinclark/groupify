import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FavoriteIcon } from '../../assets/Icons/IconExports';
import { AppText } from '../atoms/AtomsExports';
import { TEAL, YELLOW } from '../res/styles/Colors';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { RoutePropParams } from '../res/root-navigation';
import * as SecureStore from 'expo-secure-store';
import { MapIcon } from '../../assets/Icons/IconExports';

interface Props {
  handleCreate: (loc: any) => void;
  favorites: any[];
  location: any;
  map: boolean;
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
  setRegion?: any;
  region?: any;
  image?: any;
}

export const ActivityCard: React.FC<Props> = ({ favorites, map, handleCreate, location, setRegion, image }: Props) => {
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

  const addFavorite = async (value: string): Promise<void> => {
    return SecureStore.setItemAsync('favorites', value);
  };

  const handleRegion = () => {
    const newRegion = {
      latitude: location.geometry.location.lat,
      longitude: location.geometry.location.lng,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
      default: false,
    };
    setRegion(newRegion);
  };

  return (
    <View style={styles.card}>
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
            <MapIcon image={image} />
          </Marker>
        </MapView>
        <FavoriteIcon favorited={false} />
      </View>
      <View style={styles.cardBottom}>
        {map != true && (
          <TouchableOpacity style={styles.locationButton} onPress={handleRegion}>
            <AppText style={styles.locationButtonText}>Show Location</AppText>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={() => handleCreate(location)}>
          <AppText style={styles.buttonText}>Create Plan</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    height: 243,
    paddingTop: 18,
    paddingHorizontal: 13,
    width: Dimensions.get('window').width,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginRight: 17,
  },
  cardBottom: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    // marginTop: 8,
    position: 'absolute',
    bottom: 13,
    right: 32,
  },
  button: {
    alignItems: 'center',
    backgroundColor: TEAL,
    borderRadius: 5,
    justifyContent: 'center',
    marginLeft: 16,
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
