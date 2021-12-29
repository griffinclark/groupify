import { GoogleLocation, UserLocation } from '../res/dataModels';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Keyboard } from 'react-native';
import { Screen } from '../atoms/Screen';
import { TopNavBar } from '../molecules/TopNavBar';
import { ScrollView } from 'react-native-gesture-handler';
import { MagnifyingGlassIcon } from '../../assets/Icons/MagnifyingGlass';
import { SearchBar } from '../atoms/SearchBar';
import { googlePlacesQuery } from './SelectorMenu';
import { RoutePropParams } from '../res/root-navigation';
import { SearchSuggestionTile } from '../molecules/SearchSuggestionTile';
import { BLACK, GOLD_0, GREY_6, WHITE } from '../res/styles/Colors';
import { TEAL_0 } from './../res/styles/Colors';
import { MapLinkIcon } from '../../assets/Icons/MapLink';

interface Props {
  locationQuery: string;
  userLocation: UserLocation;
  overrideLocation: UserLocation;
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
  const [location, setLocation] = useState(route.params.locationQuery);
  const [changeUserLocations, setChangeUserLocations] = useState<GoogleLocation[]>([]);
  const [selectLocationDataset, setSelectLocationDataset] = useState<GoogleLocation[]>([]);
  const [dataset, setDataset] = useState(Dataset.SelectLocation);
  const [userOverrideLocation, setUserOverrideLocation] = useState(route.params.overrideLocation);
  const [locationSearchInput, setLocationSearchInput] = useState('Current Location');

  useEffect(() => {
    setDataset(Dataset.SelectLocation);
    if (userOverrideLocation) {
      setUserOverrideLocation(route.params.overrideLocation);
    }
  }, []);

  const getDataSet: () => GoogleLocation[] = () => {
    switch (dataset) {
      case Dataset.ChangeUserLocation:
        return changeUserLocations;
      case Dataset.SelectLocation:
        return selectLocationDataset;
      default:
        console.log('Error selecting dataset');
        return [];
    }
  };

  const getOnPressFunc = (location: GoogleLocation) => {
    switch (dataset) {
      case Dataset.ChangeUserLocation:
        return () => {
          const newLocation: UserLocation = {
            longitude: location.geometry.location.lng,
            latitude: location.geometry.location.lat,
          };
          setUserOverrideLocation(newLocation);
          setLocationSearchInput(location.name);
          setDataset(Dataset.SelectLocation);
        };

      case Dataset.SelectLocation:
        return () => {
          navigation.navigate('PlanMap', {
            navigation: navigation,
            route: route,
            locations: [location],
          });
        };
      default:
        console.log('Error selecting function');
        return () => console.log('failed to generate function');
    }
  };

  // TODO if myLocation != phone.getLocation, display the name of the location. Otherwise, display "Current Location"
  return (
    <Screen>
      <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[1]}>
        <TopNavBar displayGroupify={false} title={'DO SOMETHING'} navigation={navigation} />
        <View style={styles.stickySearchContainer}>
          <View style={styles.serachBar}>
            <MagnifyingGlassIcon />
            <TextInput
              onPressOut={() => {
                Keyboard.dismiss();
              }}
              style={styles.input}
              onPressIn={() => setDataset(Dataset.SelectLocation)}
              placeholder="Search for food, parks, coffee, etc"
              autoFocus
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
            <MapLinkIcon />
            <TextInput
              style={styles.input}
              placeholder={'placeholder'}
              onChangeText={async (text) => {
                setLocationSearchInput(text);
                setChangeUserLocations(await googlePlacesQuery(text, userOverrideLocation));
                if (text.length == 0) {
                  setChangeUserLocations([]);
                }
              }}
              onPressOut={async () => {
                Keyboard.dismiss();
                setChangeUserLocations(await googlePlacesQuery(locationSearchInput, userOverrideLocation));
                // TODO users have to tap twice to get out of search. Yuck
              }}
              testID="SearchBar"
              onPressIn={() => setDataset(Dataset.ChangeUserLocation)}
              defaultValue={locationSearchInput}
              selectTextOnFocus
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
    width: 334,
    height: 45,
    marginTop: 19,
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: GREY_6,
    // backgroundColor: GOLD_0,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
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
