import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { MiniPlanTile } from '../molecules/MoleculesExports';
import { Plan } from '../models';

interface Props {
  data: Plan[];
}

export const MiniDataDisplay: React.FC<Props> = ({ data }: Props) => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return <MiniPlanTile plan={item} />;
        }}
        keyExtractor={(item) => item.id}
        horizontal={true}
      />
    </View>
  );
};

// const styles = StyleSheet.create({

// });
