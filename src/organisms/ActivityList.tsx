import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { RoutePropParams } from '../res/root-navigation';
import { ActivityCard, ActivitySlider } from '../molecules/MoleculesExports';

export interface Props {
  handleCreate: (loc: any) => void;
  locations: any[];
  favorites: any[];
  distance: number;
  setDistance: any;
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
}

export const ActivityList: React.FC<Props> = ({
  distance,
  setDistance,
  favorites,
  locations,
  handleCreate,
  navigation,
  route,
}: Props) => {
  return (
    <View>
      <ActivitySlider distance={distance} setDistance={setDistance} />
      <FlatList
        data={locations}
        renderItem={({ item }) => (
          <ActivityCard
            favorites={favorites}
            handleCreate={handleCreate}
            navigation={navigation}
            location={item}
            route={route}
            map={false}
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
