import React from 'react';
import { Dimensions, GestureResponderEvent, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { ActivityImage } from '../molecules/ActivityImage';
import { AppText, Button } from '../atoms/AtomsExports';
import { TEAL_0, WHITE, GREY_6 } from '../res/styles/Colors';
// import * as SecureStore from 'expo-secure-store';
import { GoogleLocation, NavigationProps, UserLocation } from '../res/dataModels';
import { MagnifyingGlassIcon } from '../../assets/Icons/MagnifyingGlass';
import { navigateToPlanMap } from './../res/utilFunctions';
import { RoutePropParams } from '../res/root-navigation';
import { LocationRating } from '../molecules/LocationRating';
import { LocationAddress } from '../molecules/LocationAddress';
import { JOST } from '../res/styles/Fonts';

interface Props {
  location: GoogleLocation;
  map: boolean;
  navigation: NavigationProps;
  route: RoutePropParams;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  tempUserLocationQuery: string;
  userLocation?: UserLocation;
  onSelectLocation?: (location: GoogleLocation) => void;
}

export const ActivityCard: React.FC<Props> = ({
  location,
  navigation,
  route,
  tempUserLocationQuery,
  userLocation,
  onSelectLocation,
}: Props) => {
  if (!location.geometry) return null;

  const onButtonPress = (e: GestureResponderEvent) => {
    e.stopPropagation();

    navigation.navigate('PlanCreate', {
      currentUser: route.params.currentUser,
      navigation: navigation,
      data: {
        planData: {
          location: location.formatted_address,
          locationName: location.name,
          placeId: location.place_id,
          imageURL: location.photos ? location.photos[0].photo_reference : null,
        },
      },
    });
    return true;
  };

  const onActivityCardPress = () => {
    if (onSelectLocation) {
      onSelectLocation(location);
    } else {
      navigateToPlanMap(location.name, navigation, route, tempUserLocationQuery, userLocation);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onActivityCardPress}>
      <View style={styles.leftCol}>
        <View style={styles.imageContainer}>
          {location.photos ? (
            <ActivityImage
              referenceId={location.photos[0].photo_reference}
              width={Dimensions.get('screen').width * 0.23}
              height={Dimensions.get('screen').width * 0.23}
            />
          ) : (
            <Image
              source={require('../../assets/appstore.png')}
              style={{
                width: Dimensions.get('screen').width * 0.23,
                height: Dimensions.get('screen').width * 0.23,
                borderRadius: 10,
              }}
            />
          )}
        </View>
      </View>
      <View style={styles.rightCol}>
        <View style={styles.firstRow}>
          <LocationRating rating={location.rating} ratingTotal={location.user_ratings_total} />
          <View style={styles.viewMapBtn} onStartShouldSetResponder={onButtonPress}>
            <Button
              buttonStyle={styles.button}
              textStyle={{ fontFamily: JOST[600] }}
              containerStyle={{ width: 'auto' }}
              title={'Groupify It'}
            />
          </View>
        </View>

        <AppText style={styles.name}>{location.name}</AppText>
        <LocationAddress formattedAddress={location.formatted_address} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {},
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
    justifyContent: 'flex-start',
  },
  firstRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    marginRight: 0,
    marginBottom: 4,
    flex: 1,
  },
  cardContent: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 20,
    fontFamily: JOST[400],
  },
  viewMapBtn: {
    marginLeft: 'auto',
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
    maxWidth: 90,
    minWidth: 0,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginVertical: 0,
  },
  buttonText: {
    color: WHITE,
    fontSize: 14,
    fontFamily: JOST[600],
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
});
