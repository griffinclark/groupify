import React from 'react';
import { Dimensions, GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityImage } from '../molecules/ActivityImage';
import { AppText, Button } from '../atoms/AtomsExports';
import { GOLD_0, TEAL_0, WHITE, GREY_4, GREY_6 } from '../res/styles/Colors';
import { Icon } from 'react-native-elements/dist/icons/Icon';
// import * as SecureStore from 'expo-secure-store';
import { GoogleLocation, NavigationProps, UserLocation } from '../res/dataModels';
import { MagnifyingGlassIcon } from '../../assets/Icons/MagnifyingGlass';
import { navigateToPlanMap } from './../res/utilFunctions';
import { RoutePropParams } from '../res/root-navigation';
import { LocationRating } from '../molecules/LocationRating';
import { LocationAddress } from '../molecules/LocationAddress';

interface Props {
  location: GoogleLocation;
  map: boolean;
  navigation: NavigationProps;
  route: RoutePropParams;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  tempUserLocationQuery: string;
  userLocation: UserLocation;
  onSelectLocation?: (location: GoogleLocation) => void;
}

export const ActivityCard: React.FC<Props> = ({ location, navigation, route, tempUserLocationQuery, userLocation, onSelectLocation }: Props) => {
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
        }
      }
    });
    return true;
  }

  const onActivityCardPress = () => {
    if(onSelectLocation) {
      onSelectLocation(location);
    }
    else {
      navigateToPlanMap(location.name, navigation, route, userLocation, tempUserLocationQuery,);
    }
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onActivityCardPress}
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
          <LocationRating rating={location.rating} ratingTotal={location.user_ratings_total} />
          <View style={styles.viewMapBtn} onStartShouldSetResponder={onButtonPress}>
            <Button buttonStyle={styles.button} containerStyle={{width: 'auto'}} title={'Groupify It'} />
          </View>
        </View>
        
        <AppText style={styles.name}>{location.name}</AppText>
        <LocationAddress formattedAddress={location.formatted_address} />
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
  viewMapBtn: {
    marginLeft: 'auto'
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
