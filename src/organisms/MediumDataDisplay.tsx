import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { MediumPlanTile } from '../molecules/MoleculesExports';
import { Plan } from '../models';

interface Props {
  data: Plan[];
  navigation: {
    navigate: (ev: string, {}) => void;
  };
}

export const MediumDataDisplay: React.FC<Props> = ({ data, navigation }: Props) => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <MediumPlanTile
              plan={item}
              onPress={() => {
                if (navigation) {
                  navigation.navigate('PlanDetails', { plan: item });
                }
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
