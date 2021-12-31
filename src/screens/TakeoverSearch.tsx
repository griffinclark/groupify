import { GoogleLocation, XYLocation } from '../res/dataModels';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Screen } from '../atoms/Screen';
import { TopNavBar } from '../molecules/TopNavBar';
import { ScrollView } from 'react-native-gesture-handler';
import { MagnifyingGlassIcon } from '../../assets/Icons/MagnifyingGlass';
import { SearchBar } from '../atoms/SearchBar';
import { googlePlacesQuery } from './SelectorMenu';
import { RoutePropParams } from '../res/root-navigation';
import { SearchSuggestionTile } from '../molecules/SearchSuggestionTile';
import { BLACK, WHITE } from '../res/styles/Colors';
import { MapLinkIcon } from '../../assets/Icons/MapLink';

interface Props {
  locationQuery: string;
  userLocation: XYLocation;
  tempUserLocation: XYLocation;
  navigation: {
    goBack: () => void;
    navigate: (ev: string, {}) => void;
  };
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
  const [tempUserLocation, setTempUserLocation] = useState<XYLocation>();
  const [placesUserWantsToGoQuery, setPlacesUserWantsToGoQuery] = useState<string>();
  const [tempUserLocationQuery, setTempUserLocationQuery] = useState<string>();

  useEffect(() => {
    setDataset(Dataset.SelectLocation); // defualt
    if (route.params.tempUserLocationQuery == undefined) {
      setTempUserLocationQuery('Current Location');
    } else {
      setTempUserLocationQuery(route.params.tempUserLocationQuery);
    }
    setTempUserLocation(route.params.tempUserLocation);
  }, []);

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

  const getOnPressFunc = (location: GoogleLocation) => {
    switch (dataset) {
      case Dataset.ChangeUserLocation:
        return () => {
          const newLocation: XYLocation = {
            lng: location.geometry.location.lng,
            lat: location.geometry.location.lat,
          };
          setTempUserLocation(newLocation);
          console.log('User override location ');
          console.log(userOverrideLocation);
          setLocationSearchInput(location.name);
          setDataset(Dataset.SelectLocation);
        };

      case Dataset.SelectLocation:
        return () => {
          // navigation.navigate('PlanMap', {
          //   navigation: navigation,
          //   locationSearchInput: locationSearchInput,
          //   route: route,
          //   locations: [location],
          // });
          const locationsToPass: GoogleLocation[] = [];
          locationsToPass.push(location);
          console.log(locationsToPass);
          navigation.navigate('PlanMap', {
            navigation: { navigation },
            route: { route },
            locations: { locationsToPass },
            userLocation: userOverrideLocation,
          });
        };
      default:
        console.log('Error selecting function');
        return () => console.log('failed to generate function');
    }
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
        />
        <View style={styles.stickySearchContainer}>
          <View style={styles.serachBar}>
            <SearchBar
              leftIcon={<MagnifyingGlassIcon />}
              onPressOut={() => {
                Keyboard.dismiss();
              }}
              testID={'searchForLocationSearchbar'}
              onPressIn={async () => {
                setDataset(Dataset.SelectLocation);
                setSelectLocationDataset(await googlePlacesQuery(location, userOverrideLocation));
              }}
              placeholder="Search for food, parks, coffee, etc"
              autoFocus={true}
              defaultValue={location}
              onChangeText={async (text: string) => {
                setLocation(text);
                setSelectLocationDataset(await googlePlacesQuery(text, userOverrideLocation));
                if (text.length == 0) {
                  setSelectLocationDataset([]);
                }
              }}
            />
          </View>
          <View style={styles.serachBar}>
            <SearchBar
              // style={styles.input}
              leftIcon={<MapLinkIcon />}
              placeholder={'placeholder'}
              onChangeText={async (text) => {
                setLocationSearchInput(text);
                setChangeUserLocations(await googlePlacesQuery(text, userOverrideLocation));
                if (text.length == 0) {
                  setChangeUserLocations([]);
                }
              }}
              testID={'changeLocationSearchBar'}
              onPressOut={async () => {
                Keyboard.dismiss();
                setChangeUserLocations(await googlePlacesQuery(locationSearchInput, userOverrideLocation));
                // TODO users have to tap twice to get out of search. Yuck
              }}
              // testID="SearchBar"
              onPressIn={() => setDataset(Dataset.ChangeUserLocation)}
              defaultValue={locationSearchInput}
              selectTextOnFocus={true}
            />
          </View>
        </View>
        {getDataSet().map((location: GoogleLocation) => {
          return (
            <SearchSuggestionTile
              image={true}
              key={location.place_id}
              location={location}
              onPress={getOnPressFunc(location)}
            />
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
