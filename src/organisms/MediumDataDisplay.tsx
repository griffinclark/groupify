import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { MediumPlanTile } from '../molecules/MoleculesExports';
import { Plan } from '../models';
import { StackProps } from '../res/root-navigation';

interface Props extends StackProps {
  data: Plan[];
}

export const MediumDataDisplay: React.FC<Props> = (props: Props) => {
  return (
    <View>
      <FlatList
        data={props.data}
        renderItem={({ item }) => {
          return (
            <MediumPlanTile
              plan={item}
              onPress={() => {
                if (props.navigation) {
                  props.navigation?.navigate('PlanDetails', { plan: item });
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