import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-elements/dist/image/Image';
import { ScrollView } from 'react-native-gesture-handler';
import { AppText } from '../atoms/AppText';
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
      plans.push(<CreatedPlanTile key={plan.id} navigation={navigation} destination={'PlanDetails'} plan={plan} />);
    }
    return plans;
  };
  return (
    <View>
      {userPlans.length > 0 ? (
        <ScrollView horizontal={true} style={styles.scrollContainer}>
          {getUserPlans()}
        </ScrollView>
      ) : (
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <AppText style={{ fontSize: 16, lineHeight: 22.88, marginVertical: 15 }}>
            When you create a plan, you will see them here. Create a plan to start building your experiences!
          </AppText>
          <TouchableOpacity onPress={() => navigation.navigate('SearchPlace', {})}>
            <Image style={{ width: 216, height: 168 }} source={require('../../assets/CreatePlanGraphic.png')} />
          </TouchableOpacity>
        </View>
      )}
      {/* <View style={styles.viewContainer}>
        <ViewAll navigation={navigation} destination={''} />
      </View> */}
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
