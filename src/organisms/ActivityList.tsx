import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { RoutePropParams } from '../res/root-navigation';
import { ActivityCard } from '../molecules/ActivityCard';

export interface Props {
  handleCreate: () => void;
  locations: any[];
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
}

export const ActivityList: React.FC<Props> = ({ locations, handleCreate, navigation, route }: Props) => {
  return (
    <View>
      <FlatList
        data={locations}
        renderItem={({ item }) => (
          <ActivityCard handleCreate={handleCreate} navigation={navigation} location={item} route={route} map={false} />
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
