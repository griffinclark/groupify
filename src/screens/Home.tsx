/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet, View } from 'react-native';
import { getCurrentUser, loadInviteeStatus, removePastPlans, addPastPlans } from './../res/utilFunctions';
import { Screen } from '../atoms/AtomsExports';
import { HomeNavBar } from '../molecules/MoleculesExports';
import { DataStore } from '@aws-amplify/datastore';
import { User, Plan, Invitee } from '../models';
import { AllPlans } from '../res/root-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { Header } from '../atoms/Header';
import { PlansPreview } from '../atoms/PlansPreview';
import { ImportContactTile } from '../atoms/ImportContactTile';
import { Banner } from '../atoms/Banner';
import { WHITE } from '../res/styles/Colors';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    push: (ev: string, {}) => void;
    goBack: () => void;
  };
}
enum LoadingState {
  Loading,
  Loaded,
}
export const Home: React.FC<Props> = ({ navigation }: Props) => {
  const [createdPlans, setCreatedPlans] = useState<Plan[]>([]);
  const [acceptedPlans, setAcceptedPlans] = useState<Plan[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [trigger1, setTrigger1] = useState(false);
  const [trigger2, setTrigger2] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [allPlans, setAllPlans] = useState<AllPlans>();
  const [pastPlans, setPastPlans] = useState<Plan[]>([]);
  const [pendingPlans, setPendingPlans] = useState<Plan[]>([]);
  const [state, setState] = useState(LoadingState.Loading);

  useEffect(() => {
    const awaitUser = async () => {
      const user = await getCurrentUser();
      await loadPlans(user);
      setCurrentUser(user);
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
    console.log('Loading plans');
    const createdPlanOnDb = removePastPlans(await DataStore.query(Plan, (plan) => plan.creatorID('eq', user.id)));
    const createdPlans = createdPlanOnDb.map((plan) => plan);
    const invitees = await DataStore.query(Invitee, (invitee) => invitee.phoneNumber('eq', user.phoneNumber));
    const pastCreatedPlans = addPastPlans(await DataStore.query(Plan, (plan) => plan.creatorID('eq', user.id)));

    const invitedPlans = removePastPlans(
      invitees.map((invitee) => invitee.plan).filter((item): item is Plan => item !== undefined),
    );
    const pastInvitedPlans = addPastPlans(
      invitees.map((invitee) => invitee.plan).filter((item): item is Plan => item !== undefined),
    );
    const pastPlanArr = [...pastCreatedPlans, ...pastInvitedPlans];
    const pastPlan = pastPlanArr.filter((plan, index) => pastPlanArr.indexOf(plan) === index);

    const upcoming = invitedPlans.filter((item): item is Plan => item.creatorID !== user.id);

    const pending = [];
    for (const plan of upcoming) {
      const status = await loadInviteeStatus(plan);
      if (status === 'PENDING') {
        pending.push(plan);
      }
    }

    const accepted = [];
    for (const plan of upcoming) {
      const status = await loadInviteeStatus(plan);
      //TODO probably not fixable now, but status should be an enum not a string
      if (status === 'ACCEPTED') {
        accepted.push(plan);
      }
    }

    // const allPlans = [...createdPlans, ...pending, ...accepted];
    setPendingPlans(pending);
    setAcceptedPlans(accepted);
    setCreatedPlans(createdPlans);
    setPastPlans(pastPlan);

    setAllPlans({
      all: [...createdPlans, ...pending, ...accepted],
      created: createdPlans,
      pending: pendingPlans,
      accepted: acceptedPlans,
      past: pastPlans,
    });
  };

  return (
    <Screen style={styles.container}>
      {state === LoadingState.Loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <>
          <Header navigation={navigation} home={true} />
          <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onHomeRefresh} />}>
            <View>
              {acceptedPlans.length > 0 || createdPlans.length > 0 ? (
                <Banner reload={trigger2} navigation={navigation} plan={acceptedPlans[0] || createdPlans[0]} />
              ) : null}
              <PlansPreview all={allPlans!} reload={trigger2} navigation={navigation} user={currentUser!} />
              <ImportContactTile navigation={navigation} />
            </View>
            <View style={{ height: 70, backgroundColor: WHITE }}></View>
          </ScrollView>
        </>
      )}

      <View style={styles.navbar}>
        <HomeNavBar
          user={currentUser}
          navigation={navigation}
          userPlans={createdPlans}
          invitedPlans={[...acceptedPlans, ...pendingPlans]}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ececec',
  },
  navbar: {
    //TODO I'll fix this in my PR but navbar should have its own styling
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
