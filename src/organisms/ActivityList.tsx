import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { RoutePropParams } from '../res/root-navigation';
import { ActivityCard, ActivitySlider } from '../molecules/MoleculesExports';

export interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleCreate: (loc: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locations: any[];
  // favorites: any[];
  distance: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setDistance: any;
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRegion?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  region: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
}

export const ActivityList: React.FC<Props> = ({
  distance,
  setDistance,
  // favorites,
  locations,
  handleCreate,
  navigation,
  route,
  setRegion,
  region,
  image,
}: Props) => {
  return (
    <View style={{ paddingBottom: 200 }}>
      <ActivitySlider distance={distance} setDistance={setDistance} />
      <FlatList
        data={locations}
        renderItem={({ item }) => (
          <ActivityCard
            // favorites={favorites}
            handleCreate={handleCreate}
            navigation={navigation}
            location={item}
            route={route}
            map={false}
            setRegion={setRegion}
            region={region}
            image={image}
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
