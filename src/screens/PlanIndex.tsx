import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';

import { AppText, Navbar } from '../atoms/AtomsExports';
import { HomeNavBar } from '../molecules/HomeNavBar';
import { getCurrentUser, isFuturePlan, sortPlansByDate } from './../res/utilFunctions';
import { User, Plan, Invitee } from '../models';
import { background, TEAL } from '../res/styles/Colors';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
}

export const PlanIndex: React.FC<Props> = ({ navigation }: Props) => {
  const [tab, setTab] = useState('invited');
  const [currentUser, setCurrentUser] = useState<User>();
  const [invitedPlans, setInvitedPlans] = useState<Plan[]>([]);
  const [userPlans, setUserPlans] = useState<Plan[]>([]);

  console.log(invitedPlans);
  console.log(userPlans);

  useEffect(() => {
    const awaitUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
      loadPlans(user);
    };
    awaitUser();
  }, []);

  const loadPlans = async (user: User) => {
    console.log('Loading plans');

    const userCreatedPlans = removePastPlans(await DataStore.query(Plan, (plan) => plan.creatorID('eq', user.id)));
    const invitees = await DataStore.query(Invitee, (invitee) => invitee.phoneNumber('eq', user.phoneNumber));
    const invitedPlans = removePastPlans(
      invitees
        .map((invitee) => {
          return invitee.plan;
        })
        .filter((item): item is Plan => item !== undefined),
    );
    setUserPlans(sortPlansByDate(userCreatedPlans));
    setInvitedPlans(sortPlansByDate(invitedPlans));
    console.log('Finished loading plans');
  };

  const removePastPlans = (plans: Plan[]) => {
    const currentDate = new Date();
    return plans.filter((plan) => {
      if (plan.date && plan.time) {
        return isFuturePlan(plan.date, currentDate);
      }
    });
  };

  return (
    <View testID="PlanIndexScreen" style={styles.planIndexContainer}>
      <ScrollView>
        <Navbar location={'Home'} navigation={navigation} title={'All Plans'} />
        <View style={styles.tabs}>
          <View style={tab === 'invited' ? styles.tabContainerSelected : styles.tabContainer}>
            <AppText
              onPress={() => setTab('invited')}
              style={tab === 'invited' ? styles.tabTextSelected : styles.tabText}
            >
              INVITED
            </AppText>
          </View>
          <View style={tab === 'created' ? styles.tabContainerSelected : styles.tabContainer}>
            <AppText
              onPress={() => setTab('created')}
              style={tab === 'created' ? styles.tabTextSelected : styles.tabText}
            >
              CREATED
            </AppText>
          </View>
        </View>

        <View style={styles.plans}>
          {/* <FlatList
            data={tab === 'invited' ? invitedPlans : userPlans}
            renderItem={({ item }) => <AppText>{item.title}</AppText>}
            keyExtractor={(item) => item.id}
          /> */}
        </View>
      </ScrollView>
      <View style={styles.navbar}>
        <HomeNavBar user={currentUser} navigation={navigation} plan={userPlans[0] ? userPlans[0] : invitedPlans[0]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  planIndexContainer: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
  },
  tabContainer: {
    alignItems: 'center',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    marginTop: 20,
    paddingBottom: 14,
    width: '50%',
  },
  tabContainerSelected: {
    alignItems: 'center',
    borderBottomColor: TEAL,
    borderBottomWidth: 3,
    marginTop: 20,
    paddingBottom: 14,
    width: '50%',
  },
  tabText: {
    color: '#8B8B8B',
    fontSize: 16,
    fontWeight: '700',
  },
  tabTextSelected: {
    color: TEAL,
    fontSize: 16,
    fontWeight: '700',
  },
  plans: {
    backgroundColor: background,
    flex: 1,
    minHeight: Dimensions.get('window').height,
    width: '100%',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
