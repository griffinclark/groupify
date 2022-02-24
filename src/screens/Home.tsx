/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState, useMemo } from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet, View } from 'react-native';
import { loadInviteeStatus, removePastPlans, addPastPlans, sortPlansByDate } from './../res/utilFunctions';
import { Screen } from '../atoms/AtomsExports';
import { HomeNavBar } from '../molecules/MoleculesExports';
import { DataStore } from '@aws-amplify/datastore';
import { User, Plan, Invitee } from '../models';
import { AllPlans } from '../res/root-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { PlansPreview } from '../atoms/PlansPreview';
import { Banner } from '../atoms/Banner';
import { RoutePropParams } from '../res/root-navigation';
import { TopNavBar } from '../molecules/TopNavBar';

export interface Props {
  navigation: {
    CreateAccount: {
      step: string;
      email: string;
    };
    params: {
      Login: string;
    };
    navigate: (ev: string, {}) => void;
    push: (ev: string, {}) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
}
enum LoadingState {
  Loading,
  Loaded,
}
export const Home: React.FC<Props> = ({ navigation, route }: Props) => {
  const [trigger1, setTrigger1] = useState(false);
  const [trigger2, setTrigger2] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [dbPlans, setDbPlans] = useState<Plan[]>([]);

  const [state, setState] = useState(LoadingState.Loading);
  const [invitedPlans, setInvitedPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const awaitUser = async () => {
      await loadPlans(route.params.currentUser);
      setTrigger2(!trigger2);
      setRefreshing(false);
      setState(LoadingState.Loaded);
    };
    awaitUser();
  }, [trigger1]);

  const onHomeRefresh = () => {
    setRefreshing(true);
    setTrigger1(!trigger1);
  };

  const loadPlans = async (user: User) => {
    const getPlans = await DataStore.query(Plan, (plan) => plan.creatorID('eq', user.id));
    setDbPlans(sortPlansByDate(getPlans));

    const invitees = await DataStore.query(Invitee, (invitee) => invitee.phoneNumber('eq', user.phoneNumber));

    const allInvitedPlans = invitees.map((invitee) => invitee.plan).filter((item): item is Plan => item !== undefined);
    setInvitedPlans(allInvitedPlans);
  };

  const createdPlans = useMemo(() => {
    const createdPlanOnDb = removePastPlans(dbPlans);
    const createdPlans = createdPlanOnDb.map((plan) => plan);

    return createdPlans;
  }, [dbPlans]);

  const pastPlans = useMemo(() => {
    const pastCreatedPlans = addPastPlans(dbPlans);

    const pastInvitedPlans = addPastPlans(invitedPlans);

    const combinedArr = [...pastCreatedPlans, ...pastInvitedPlans];

    const pastPlan = combinedArr.filter((plan, index) => combinedArr.indexOf(plan) === index);

    return sortPlansByDate(pastPlan);
  }, [dbPlans, invitedPlans]);

  const upcomingPlans = useMemo(() => {
    const upcomingInvited = removePastPlans(invitedPlans);

    return upcomingInvited.filter((item): item is Plan => item.creatorID !== route.params.currentUser.id);
  }, [invitedPlans]);

  const acceptedAndPendingPlans = useMemo(() => {
    const accepted: Plan[] = [];
    const pending: Plan[] = [];

    async () => {
      for (const plan of upcomingPlans) {
        const status = await loadInviteeStatus(plan);

        if (status === 'PENDING') {
          accepted.push(plan);
        } else if (status === 'ACCEPTED') {
          pending.push(plan);
        }
      }
    };

    return { accepted: accepted, pending: pending };
  }, [upcomingPlans]);

  const allPlans: AllPlans = useMemo(() => {
    return {
      all: sortPlansByDate([...createdPlans, ...acceptedAndPendingPlans.accepted, ...acceptedAndPendingPlans.pending]),
      created: createdPlans,
      pending: acceptedAndPendingPlans.pending,
      accepted: acceptedAndPendingPlans.accepted,
      past: pastPlans,
    };
  }, [createdPlans, acceptedAndPendingPlans, pastPlans]);

  return (
    <Screen style={styles.container}>
      {state === LoadingState.Loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <>
          <TopNavBar
            stickyHeader={false}
            navigation={navigation}
            displayGroupify={true}
            displayBackButton={false}
            displaySettings={true}
            route={route}
            targetScreen={'SelectorMenu'}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onHomeRefresh} />}
          >
            <View>
              {acceptedAndPendingPlans.accepted.length > 0 || createdPlans.length > 0 ? (
                <Banner
                  route={route}
                  reload={trigger2}
                  navigation={navigation}
                  plan={acceptedAndPendingPlans.accepted[0] || createdPlans[0]}
                />
              ) : null}
              <PlansPreview
                all={allPlans!}
                reload={trigger2}
                navigation={navigation}
                user={route.params.currentUser!}
                userLocation={route.params.userLocation}
                route={route}
              />
              <View style={{ height: 43 }} />
            </View>
          </ScrollView>
        </>
      )}

      <HomeNavBar
        user={route.params.currentUser}
        navigation={navigation}
        route={route}
        userLocation={route.params.userLocation}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
