import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FavoriteIcon } from '../../assets/Icons/IconExports';
import { AppText } from '../atoms/AtomsExports';
import { TEAL, YELLOW } from '../res/styles/Colors';
import { Icon } from 'react-native-elements/dist/icons/Icon';

interface Props {
  handleCreate: () => void;
  location: any;
}

export const ActivityMapCard: React.FC<Props> = ({ handleCreate, location }: Props) => {
  const formatAddress = () => {
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
    console.log(str);
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
            latitude: location.geometry.location.lat,
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
          />
        </MapView>
        <FavoriteIcon favorited={false} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <AppText style={styles.buttonText}>Create Plan</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
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
  button: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: TEAL,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 8,
    marginRight: 32,
    height: 49,
    width: 150,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },
});
