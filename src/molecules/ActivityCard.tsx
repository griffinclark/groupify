import React from 'react';
import { Dimensions, GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityImage } from '../molecules/ActivityImage';
import { AppText, Button } from '../atoms/AtomsExports';
import { GOLD_0, TEAL_0, WHITE, GREY_4, GREY_6 } from '../res/styles/Colors';
import { Icon } from 'react-native-elements/dist/icons/Icon';
// import * as SecureStore from 'expo-secure-store';
import { GoogleLocation, NavigationProps } from '../res/dataModels';
import { MagnifyingGlassIcon } from '../../assets/Icons/MagnifyingGlass';
import { navigateToPlanMap } from './../res/utilFunctions';
import { RoutePropParams } from '../res/root-navigation';
interface Props {
  location: GoogleLocation;
  map: boolean;
  navigation: NavigationProps;
  route: RoutePropParams;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  tempUserLocationQuery: string;
}

export const ActivityCard: React.FC<Props> = ({ location, navigation, route, tempUserLocationQuery }: Props) => {
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

  const onButtonPress = (e: GestureResponderEvent) => {
    e.stopPropagation();
    navigateToPlanMap(location.name, navigation, route, route.params.userLocation, tempUserLocationQuery);
    return true;
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => console.log('click container')}
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
        <View style={styles.firstRow}>
          <AppText style={styles.rating}>
            {location.rating.toFixed(1)} {renderStars()} ({location.user_ratings_total})
          </AppText>
          <View onStartShouldSetResponder={onButtonPress}>
            <Button buttonStyle={styles.button} containerStyle={{width: 'auto'}} title={'View Map'} />
          </View>
        </View>
        
        <AppText style={styles.name}>{location.name}</AppText>
        {formatAddress()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {

  },
  card: {
    backgroundColor: WHITE,
    minHeight: 107,
    paddingVertical: 8,
    paddingHorizontal: 13,
    width: '100%',
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderBottomColor: GREY_6,
    borderBottomWidth: 2,
  },
  leftCol: {
    marginRight: 10,
  },
  rightCol: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  
  },
  firstRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    marginRight: 0,
    marginBottom: 4,
    flex: 1
  },
  cardContent: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
  rating: {
    fontSize: 12,
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
    backgroundColor: TEAL_0,
    borderRadius: 5,
    justifyContent: 'center',
    maxWidth: 84,
    minWidth: 0,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginVertical: 0
  },
  buttonText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '600',
  },
  locationButtonText: {
    color: TEAL_0,
    fontSize: 20,
    fontWeight: '900',
  },
  locationImage: {
    height: 89,
    width: 89,
  }
});
