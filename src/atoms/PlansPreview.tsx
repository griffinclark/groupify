import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Plan, User } from '../models';
import { PlanCard } from './planCard';
import { NoPlansCard } from './NoPlansCard';
import { TEAL, GRAY_DARK, WHITE } from '../res/styles/Colors';
import { AllPlans } from '../res/root-navigation';

export interface Props {
  all: AllPlans;
  user: User;
  navigation: {
    navigate: (ev: string, {}) => void;
    push: (ev: string, {}) => void;
  };
  reload: boolean;
}

enum SelectedOption {
  all = 'All',
  pending = 'Pending',
  accepted = 'Accepted',
  created = 'Created',
  past = 'Past',
}

export const PlansPreview: React.FC<Props> = ({ all, navigation, user, reload }: Props) => {
  const [selectedTab, setSelectedTab] = useState<SelectedOption>(SelectedOption.all);
  const [selectedPlans, setSelectedPlans] = useState<Plan[]>(all.all);
  const [plansCard, setPlansCard] = useState<Plan[]>([]);
  useEffect(() => {
    const plansTab: any = [];
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
          style={[styles.selectedItem, { borderBottomColor: selectedTab === planTypeEnum ? TEAL : 'transparent' }]}
        >
          <Text style={[styles.buttonText, { color: selectedTab === planTypeEnum ? TEAL : GRAY_DARK }]}>
            {planTypeEnum}({plans.length})
          </Text>
        </TouchableOpacity>,
      );
      setPlansCard(plansTab);
    }
  }, [selectedTab, reload]);

  return (
    <View style={styles.container}>
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
        <NoPlansCard user={user} navigation={navigation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedItem: {
    borderBottomWidth: 4,
    paddingHorizontal: 8,
    marginHorizontal: 8,
  },
  container: {
    marginTop: 5,
  },
  scrollList: {
    backgroundColor: WHITE,
  },
  header: {
    padding: 6,
    fontWeight: '600',
    fontSize: 20,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 19,
    fontWeight: '600',
    paddingBottom: 5,
  },
});
