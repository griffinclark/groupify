import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ViewAll } from '../atoms/ViewAll';
import { Plan } from '../models';
import { CreatedPlanTile } from '../molecules/CreatedPlanTile';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
  userPlans: Plan[];
}

export const CreatedPlans: React.FC<Props> = ({ navigation, userPlans }: Props) => {
  const getUserPlans = () => {
    const plans = [];
    for (let i = 0; i < userPlans.length; i++) {
      const plan = userPlans[i];
      plans.push(<CreatedPlanTile navigation={navigation} destination={'PlanDetails'} plan={plan} />);
    }
    return plans;
  };
  return (
    <View>
      <ScrollView horizontal={true} style={styles.scrollContainer}>
        {userPlans.length > 0 && getUserPlans()}
      </ScrollView>
      <View style={styles.viewContainer}>
        <ViewAll navigation={navigation} destination={''} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'flex-end',
  },
  viewContainer: {
    width: '90%',
    alignSelf: 'center',
  },
});
