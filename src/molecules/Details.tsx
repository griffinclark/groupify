import React from 'react';
import { View } from 'react-native';
import { AppText } from '../atoms/AtomsExports';
import { Plan } from '../models';

interface Props {
  plan: Plan;
}

export const Details: React.FC<Props> = ({ plan }: Props) => {
  return (
    <View>
      {plan.description ? (
        <AppText
          style={{
            fontSize: 20,
            marginTop: 15,
            marginBottom: 25,
          }}
        >
          {plan.description}
        </AppText>
      ) : null}
    </View>
  );
};
