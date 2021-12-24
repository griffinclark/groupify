import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityCard } from '../molecules/MoleculesExports';
import { GoogleLocation } from '../res/dataModels';
import { GREY_4 } from '../res/styles/Colors';
import { getFavorites } from '../res/utilFavorites';

export interface Props {
  handleCreate: (loc: GoogleLocation) => void;
  locations: GoogleLocation[];
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
  onPress: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRegion?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  region?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTrigger?: any;
}

export const ActivityList: React.FC<Props> = ({
  locations,
  handleCreate,
  navigation,
  setRegion,
  region,
  image,
  trigger,
  setTrigger,
  onPress,
}: Props) => {
  const [favoritesArr, setFavoritesArr] = useState([]);

  useEffect(() => {
    queryFavorites();
  }, []);

  const queryFavorites = async () => {
    const favorites = await getFavorites();
    const favArr = favorites.map((ele: GoogleLocation) => ele.place_id);
    setFavoritesArr(favArr);
  };

  const handleRegion = (location: GoogleLocation) => {
    const newRegion = {
      latitude: location.geometry.location.lat,
      longitude: location.geometry.location.lng,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
      default: false,
    };

    if (setRegion) {
      setRegion(newRegion);
    } else {
      navigation.navigate('ActivityResults', {
        place: newRegion,
      });
    }
  };

  return (
    <View style={{ paddingBottom: 200 }}>
      <FlatList
        data={locations}
        renderItem={({ item }) => (
          <ActivityCard
            favoritesArr={favoritesArr}
            setFavoritesArr={setFavoritesArr}
            handleCreate={handleCreate}
            navigation={navigation}
            location={item}
            map={false}
            handleRegion={handleRegion}
            region={region}
            image={image}
            trigger={trigger}
            setTrigger={setTrigger}
            onPress={onPress}
          />
        )}
        keyExtractor={(item) => item.place_id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: GREY_4,
    height: 2,
  },
});
