import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { MiniPlanTile } from '../molecules/MoleculesExports';
import { Plan } from '../models';

interface Props {
  data: Plan[];
  navigation: {
    navigate: (ev: string, {}) => void;
  };
}

export const MiniDataDisplay: React.FC<Props> = ({ data, navigation }: Props) => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <MiniPlanTile
              plan={item}
              onPress={() => {
                navigation.navigate('PlanDetails', { plan: item });
              }}
            />
          );
        }}
        keyExtractor={(item) => item.id}
        horizontal={true}
      />
    </View>
  );
};
