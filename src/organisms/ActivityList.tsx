import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityCard } from '../molecules/MoleculesExports';
import { getFavorites } from '../res/utilFavorites';

export interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleCreate: (loc: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locations: any[];
  // favorites: any[];
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
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
}: Props) => {
  const [favoritesArr, setFavoritesArr] = useState([]);

  useEffect(() => {
    queryFavorites();
  }, []);

  const queryFavorites = async () => {
    const favorites = await getFavorites();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const favArr = favorites.map((ele: any) => ele.place_id);
    setFavoritesArr(favArr);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRegion = (location: any) => {
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
    backgroundColor: 'rgba(0,0,0,.1)',
    height: 1,
  },
});
