import { GoogleLocation, NavigationProps, Photo, UserLocation } from '../res/dataModels';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Screen } from '../atoms/Screen';
import { TopNavBar } from '../molecules/TopNavBar';
import { ScrollView } from 'react-native-gesture-handler';
import { MagnifyingGlassIcon } from '../../assets/Icons/MagnifyingGlass';
import { SearchBar } from '../atoms/SearchBar';
import { RoutePropParams } from '../res/root-navigation';
import { SearchSuggestionTile } from '../molecules/SearchSuggestionTile';
import { BLACK, WHITE } from '../res/styles/Colors';
import { MapLinkIcon } from '../../assets/Icons/MapLink';
import { googlePlacesQuery, GooglePlacesQueryOptions } from '../res/utilFunctions';

interface Props {
  locationQuery: string;
  userLocation: UserLocation;
  tempUserLocation: UserLocation;
  navigation: NavigationProps;
  route: RoutePropParams;
}

export const TakeoverSearch: React.FC<Props> = ({ navigation, route }: Props) => {
  enum Dataset {
    ChangeUserLocation = 'CHANGELOCATION',
    SelectLocation = 'SELECTLOCATION',
  }
  const [placesUserWantsToGoResults, setPlacesUserWantsToGoResults] = useState<GoogleLocation[]>([]);
  const [tempUserLocationResults, setTempUserLocationResults] = useState<GoogleLocation[]>([]);
  const [dataset, setDataset] = useState(Dataset.SelectLocation);
  const [tempUserLocation, setTempUserLocation] = useState<UserLocation>(route.params.tempUserLocation);
  const [placesUserWantsToGoQuery, setPlacesUserWantsToGoQuery] = useState('');
  const [tempUserLocationQuery, setTempUserLocationQuery] = useState('');

  useEffect(() => {
    setDataset(Dataset.SelectLocation);
    setPlacesUserWantsToGoQuery(route.params.placesUserWantsToGoQuery);
    setTempUserLocationQuery(route.params.tempUserLocationQuery);
    if (route.params.tempUserLocationQuery.length == 0) {
      setTempUserLocationQuery('Current Location');
    }
    setTempUserLocation(route.params.tempUserLocation);
  }, []);

  const navigateToPlanMap = async (query: string) => {
    // rerun the query with the name of the selected venue so all venues with the same name show up on the map
    const results = await googlePlacesQuery(query, route.params.tempUserLocation, GooglePlacesQueryOptions.Activity);
    navigation.navigate('PlanMap', {
      navigation: { navigation },
      route: { route },
      placesUserWantsToGoResults: results,
      tempUserLocation: tempUserLocation,
      tempUserLocationQuery: tempUserLocationQuery,
      placesUserWantsToGoQuery: query,
    });
  };

  const getDataSet: () => GoogleLocation[] = () => {
    switch (dataset) {
      case Dataset.ChangeUserLocation:
        return tempUserLocationResults;
      case Dataset.SelectLocation:
        return placesUserWantsToGoResults;
      default:
        console.log('Error selecting dataset');
        return [];
    }
  };

  const placehodlerPhoto: Photo = {
    height: -1,
    width: -1,
    html_attributions: ['none'],
    photo_reference:
      'Aap_uEAaObHoUCrr6U-GNsZoP3Hl_pOvGmPU4VKM2loAQ7mPp_-mo4HqjNG2mE4rW-RBHbjNul-uN-b6djsWbcAroHqFbQE-aAGIwZ6HRbbKaGHc71aHddczUS4pA1xHtebC-2rnSnQG5k-lHfz-1vzBJdjPhxvgQ8aTlGELmfhWC_Yn317M',
  };
  const origionalUserLocation: GoogleLocation = {
    // I have not tested whether or not viewport{} works, but I've added it so we have a complete object
    geometry: {
      location: {
        lng: route.params.tempUserLocation.longitude,
        lat: route.params.tempUserLocation.latitude,
      },
      viewport: {
        northeast: {
          lng: route.params.tempUserLocation.longitude,
          lat: route.params.tempUserLocation.latitude,
        },
        southwest: {
          lng: route.params.tempUserLocation.longitude,
          lat: route.params.tempUserLocation.latitude,
        },
      },
    },
    name: 'Current Location',
    place_id: 'manually entered search tile',
    photos: [placehodlerPhoto],
    // All data below here should never be accessed
    business_status: 'null',
    icon: 'null',
    icon_background_color: 'null',
    icon_mask_base_uri: 'null',
    plusCode: { compound_code: 'null', global_code: 'null' },
    opening_hours: { open_now: false },
    formatted_address: 'null',
    rating: -1,
    user_ratings_total: -1,
    price_level: -1,
    reference: 'null',
    types: ['null'],
  };

  return (
    <Screen>
      <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[1]}>
        <TopNavBar
          displayGroupify={false}
          targetScreen={'SelectorMenu'}
          title={'DO SOMETHING'}
          navigation={navigation}
          route={route}
          placesUserWantsToGoQuery={placesUserWantsToGoQuery}
          tempUserLocationQuery={tempUserLocationQuery}
        />
        <View style={styles.stickySearchContainer}>
          <View style={styles.serachBar}>
            <SearchBar
              leftIcon={<MagnifyingGlassIcon />}
              onPressOut={() => {
                Keyboard.dismiss();
              }}
              testID={'searchForLocationSearchbar'}
              onSubmitEditing={() => {
                navigateToPlanMap(placesUserWantsToGoQuery);
              }}
              onPressIn={async () => {
                setDataset(Dataset.SelectLocation);
                setPlacesUserWantsToGoResults(
                  await googlePlacesQuery(
                    placesUserWantsToGoQuery,
                    tempUserLocation,
                    GooglePlacesQueryOptions.Activity,
                  ),
                );
              }}
              placeholder="Search for food, parks, coffee, etc"
              autoFocus={true}
              defaultValue={placesUserWantsToGoQuery}
              onChangeText={async (text: string) => {
                setPlacesUserWantsToGoQuery(text);
                setDataset(Dataset.SelectLocation);
                setPlacesUserWantsToGoResults(
                  await googlePlacesQuery(text, tempUserLocation, GooglePlacesQueryOptions.Activity),
                );
              }}
            />
          </View>
          <View style={styles.serachBar}>
            <SearchBar
              // style={styles.input}
              leftIcon={<MapLinkIcon />}
              placeholder={'@Joni what do I put here?'}
              onChangeText={async (text) => {
                setDataset(Dataset.ChangeUserLocation);
                // FIXME indicate to the user that they have not changed their location until a location is selected from the list
                setTempUserLocationQuery(text);
                const noCurrentLocationArr = await googlePlacesQuery(
                  text,
                  tempUserLocation,
                  GooglePlacesQueryOptions.ChangeLocation,
                );
                const currentLocation0Arr: GoogleLocation[] = [origionalUserLocation];
                noCurrentLocationArr.forEach((location) => {
                  currentLocation0Arr.push(location);
                });
                setTempUserLocationResults(currentLocation0Arr);
              }}
              testID={'changeLocationSearchBar'}
              onPressOut={async () => {
                Keyboard.dismiss();
                setTempUserLocationResults(
                  await googlePlacesQuery(
                    tempUserLocationQuery,
                    tempUserLocation,
                    GooglePlacesQueryOptions.ChangeLocation,
                  ),
                );
                // TODO users have to tap twice to get out of search. Yuck
              }}
              // testID="SearchBar"
              onPressIn={() => {
                if (tempUserLocationQuery == 'Current Location') {
                  setTempUserLocationQuery('');
                  setTempUserLocation(route.params.userLocation);
                  setTempUserLocationResults([origionalUserLocation]);
                }
                setDataset(Dataset.ChangeUserLocation);
              }}
              defaultValue={tempUserLocationQuery}
              selectTextOnFocus={true}
            />
          </View>
        </View>
        {getDataSet().map((location: GoogleLocation) => {
          return (
            <>
              {dataset == Dataset.ChangeUserLocation ? (
                <SearchSuggestionTile
                  image={true}
                  key={location.place_id}
                  location={location}
                  onPress={async () => {
                    const newLocation: UserLocation = {
                      longitude: location.geometry.location.lng,
                      latitude: location.geometry.location.lat,
                    };
                    setTempUserLocation(newLocation);
                    setTempUserLocationQuery(location.name);
                    setPlacesUserWantsToGoResults(
                      await googlePlacesQuery(placesUserWantsToGoQuery, newLocation, GooglePlacesQueryOptions.Activity),
                    );
                    setDataset(Dataset.SelectLocation);
                  }}
                />
              ) : (
                <SearchSuggestionTile
                  image={true}
                  key={location.place_id}
                  location={location}
                  onPress={() => {
                    navigateToPlanMap(location.name);
                  }}
                />
              )}
            </>
          );
        })}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginBottom: 50,
  },
  serachBar: {
    width: '100%',
    height: 45,
    marginTop: 19,
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: GOLD_0,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingRight: 10,
    marginLeft: 5,
    color: BLACK,
  },
  stickySearchContainer: {
    backgroundColor: WHITE,
    height: 142,
  },
});