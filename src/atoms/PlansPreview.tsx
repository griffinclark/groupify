import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Plan, User } from '../models';
import { PlanCard } from './planCard';
import { NoPlansCard } from './NoPlansCard';
import { TEAL_0, GRAY_DARK, WHITE } from '../res/styles/Colors';
import { AllPlans } from '../res/root-navigation';
import { UserLocation } from '../res/dataModels';

export interface Props {
  all: AllPlans;
  user: User;
  navigation: {
    navigate: (ev: string, {}) => void;
    push: (ev: string, {}) => void;
  };
  userLocation: UserLocation;
  reload: boolean;
}

enum SelectedOption {
  all = 'ALL',
  pending = 'PENDING',
  accepted = 'ACCEPTED',
  created = 'CREATED',
  past = 'PAST',
}

export const PlansPreview: React.FC<Props> = ({ all, navigation, user, userLocation, reload }: Props) => {
  const [selectedTab, setSelectedTab] = useState<SelectedOption>(SelectedOption.all);
  const [selectedPlans, setSelectedPlans] = useState<Plan[]>(all.all); //initial state is all plans
  const [plansCard, setPlansCard] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const plansTab: JSX.Element[] = [];

    for (const planType in SelectedOption) {
      const planTypeEnum: SelectedOption = SelectedOption[planType as keyof typeof SelectedOption];
      const plans = all[planType as keyof AllPlans];
      plansTab.push(
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(planTypeEnum);
            setSelectedPlans(plans);
          }}
          key={planTypeEnum}
          style={[styles.selectedItem, { borderBottomColor: selectedTab === planTypeEnum ? TEAL_0 : 'transparent' }]}
        >
          <Text style={[styles.buttonText, { color: selectedTab === planTypeEnum ? TEAL_0 : GRAY_DARK }]}>
            {planTypeEnum} ({plans.length})
          </Text>
        </TouchableOpacity>,
      );
      setPlansCard(plansTab);
    }
  }, [selectedTab, reload]);

  return (
    <View>
      <View style={styles.scrollList}>
        <Text style={styles.header}>Your Plans</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {plansCard}
        </ScrollView>
      </View>

      {selectedPlans.length > 0 ? (
        selectedPlans.map((plan: Plan) => (
          <PlanCard
            key={plan.id}
            title={plan.title}
            date={plan.date}
            planId={plan.id}
            placeId={plan.placeID}
            location={plan.location}
            creator={true}
            creatorId={plan.creatorID}
            navigation={navigation}
            plan={plan}
          />
        ))
      ) : (
        <NoPlansCard user={user} navigation={navigation} userLocation={userLocation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedItem: {
    borderBottomWidth: 3,
    paddingHorizontal: 8,
    marginHorizontal: 8,
  },
  // container: {
  //   marginTop: 5,
  // },
  scrollList: {
    backgroundColor: WHITE,
  },
  header: {
    padding: 4,
    fontWeight: '600',
    fontSize: 20,
    marginLeft: 10,
    marginVertical: 6,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    paddingBottom: 5,
  },
});
