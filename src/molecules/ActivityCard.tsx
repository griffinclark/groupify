import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityImage } from '../molecules/ActivityImage';
import { AppText } from '../atoms/AtomsExports';
import { GOLD_0, GREY_3, TEAL_0, WHITE, YELLOW } from '../res/styles/Colors';
import { Icon } from 'react-native-elements/dist/icons/Icon';
// import * as SecureStore from 'expo-secure-store';
import { GoogleLocation } from '../res/dataModels';
import { GREY_4 } from './../res/styles/Colors';
import { MagnifyingGlassIcon } from '../../assets/Icons/MagnifyingGlass';

interface Props {
  handleCreate: (loc: GoogleLocation) => void;
  location: GoogleLocation;
  map: boolean;
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
}

export const ActivityCard: React.FC<Props> = ({ location, navigation }: Props) => {
  if (!location.geometry) return null;
  // console.log(location.formatted_address);
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

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ActivityResults', { activity: location.name })}
    >
      <View style={styles.leftCol}>
        <View style={styles.imageContainer}>
          {location.photos ? (
            <ActivityImage referenceId={location.photos[0].photo_reference} width={89} height={89} />
          ) : (
            <MagnifyingGlassIcon />
          )}
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: WHITE,
    minHeight: 107,
    paddingTop: 18,
    paddingHorizontal: 13,
    width: Dimensions.get('window').width,
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderBottomColor: GREY_4,
    borderBottomWidth: 2,
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
