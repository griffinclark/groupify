import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet, View } from 'react-native';
import { getCurrentUser, loadInviteeStatus, removePastPlans } from './../res/utilFunctions';
import { Screen } from '../atoms/AtomsExports';
import { HomeNavBar } from '../molecules/MoleculesExports';
import { RoutePropParams } from '../res/root-navigation';
import { DataStore } from '@aws-amplify/datastore';
import { User, Plan, Invitee } from '../models';
import { ScrollView } from 'react-native-gesture-handler';
import { Header } from '../atoms/Header';
import { PlansPreview } from '../atoms/PlansPreview';
import { ImportContactTile } from '../atoms/ImportContactTile';
import FooterCard from '../atoms/FooterCard';
import { Banner } from '../atoms/Banner';

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
  };
  route: RoutePropParams;
}

export const Home: React.FC<Props> = ({ navigation }: Props) => {
  const [userPlans, setUserPlans] = useState<Plan[]>([]);
  const [invitedPlans, setInvitedPlans] = useState<Plan[]>([]);
  const [upcomingPlans, setUpcomingPlans] = useState<Plan[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [trigger1, setTrigger1] = useState(false);
  const [trigger2, setTrigger2] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [state, setState] = useState('loading');

  useEffect(() => {
    const awaitUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
      await loadPlans(user);
      setTrigger2(!trigger2);
      setRefreshing(false);
      setState('done');
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
    console.log('createdPlans', createdPlans);

    let invitedPlans = removePastPlans(
      invitees.map((invitee) => invitee.plan).filter((item): item is Plan => item !== undefined),
    );

    const upcoming = invitedPlans;
    if (currentUser) invitedPlans = invitedPlans.filter((item): item is Plan => item.creatorID !== currentUser.id);

    const accepted = [];
    for (const plan of upcoming) {
      const status = await loadInviteeStatus(plan);
      if (status === 'ACCEPTED') {
        accepted.push(plan);
      }
    }

    setUpcomingPlans(accepted);
    setUserPlans(createdPlans);
    setInvitedPlans(invitedPlans);
    console.log('Finished loading plans');
  };

  return (
    <Screen>
      {state === 'loading' ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <>
          <Header home={true} />
          <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onHomeRefresh} />}>
            <View>
              {upcomingPlans.length > 0 && <Banner reload={trigger2} navigation={navigation} plan={upcomingPlans[0]} />}
              <PlansPreview />
              <ImportContactTile navigation={navigation} />
              <FooterCard />
            </View>
          </ScrollView>
        </>
      )}

      <View style={styles.navbar}>
        <HomeNavBar user={currentUser} navigation={navigation} userPlans={userPlans} invitedPlans={invitedPlans} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
