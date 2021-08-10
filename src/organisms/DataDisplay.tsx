import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { EventTile } from '../molecules/MoleculesExports';
import { Event } from '../res/dataModels';

interface Props {
  data: Event[];
}

export const DataDisplay: React.FC<Props> = ({ data }: Props) => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return <EventTile event={item} />;
        }}
        keyExtractor={(item) => item.uuid}
      />
    </View>
  );
};
