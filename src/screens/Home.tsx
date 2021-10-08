import React, { useEffect, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { globalStyles } from './../res/styles/GlobalStyles';
import { background, GREY_0, TEAL } from './../res/styles/Colors';
import { getCurrentUser, isFuturePlan, sortPlansByDate } from './../res/utilFunctions';
import { Screen } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { NextPlan, InvitedPreview, CreatedPlans } from '../organisms/OrganismsExports';
import { HomeNavBar } from '../molecules/MoleculesExports';
import { RoutePropParams } from '../res/root-navigation';
import { DataStore } from '@aws-amplify/datastore';
import { User, Plan, Invitee } from '../models';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native-elements/dist/image/Image';

interface Props {
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
  const [currentUser, setCurrentUser] = useState<User>();
  const [trigger1, setTrigger1] = useState(false);
  const [trigger2, setTrigger2] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    console.log('hey');
    const awaitUser = async () => {
      const user = await getCurrentUser();
      console.log(user);
      setCurrentUser(user);
      await loadPlans(user);
      setTrigger2(!trigger2);
      setRefreshing(false);
    };
    awaitUser();
  }, [trigger1]);

  const onHomeRefresh = () => {
    setRefreshing(true);
    setTrigger1(!trigger1);
  };

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

  const createGreeting = () => {
    if (currentUser) {
      const firstName = currentUser.name.includes(' ')
        ? currentUser.name.substr(0, currentUser.name.indexOf(' '))
        : currentUser.name;
      return `Hello, ${firstName}!`;
    }
  };
  console.log(userPlans.concat(invitedPlans));

  return (
    <Screen style={{ backgroundColor: background }}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onHomeRefresh} />}>
        <View style={styles.header}>
          <AppText style={[globalStyles.superTitle, styles.greeting]}>{createGreeting()}</AppText>
          <View></View>
        </View>
        <View style={styles.feedContainer}>
          {userPlans.concat(invitedPlans).length > 0 ? (
            <View>
              <View>
                <AppText style={styles.label}>COMING UP NEXT</AppText>
                <NextPlan reload={trigger2} navigation={navigation} plan={userPlans.concat(invitedPlans)[0]} />
              </View>
              <View style={globalStyles.miniSpacer}></View>
              <View>
                <AppText style={styles.label}>YOU&apos;RE INVITED...</AppText>
                <InvitedPreview
                  reload={trigger2}
                  navigation={navigation}
                  invitedPlans={invitedPlans}
                  userPlans={userPlans}
                />
                <View style={globalStyles.miniSpacer}></View>
              </View>
              <View style={{ height: userPlans.length > 0 ? 360 : 420 }}>
                <AppText style={styles.label}>CREATED PLANS</AppText>
                <CreatedPlans navigation={navigation} userPlans={userPlans} invitedPlans={invitedPlans} />
              </View>
            </View>
          ) : (
            <View style={styles.noPlan}>
              <AppText style={styles.noPlanText}>
                Welcome to your plan dashboard. This is where you will see a round-up of plans you’ve created, and
                things you&apos;re invited to.
              </AppText>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <Image
                  source={require('../../assets/homepage-graphic.png')}
                  style={{ width: 335, height: 280 }}
                  resizeMode={'contain'}
                />
              </View>
              <View>
                <AppText style={[styles.noPlanText, { textAlign: 'center', width: '70%' }]}>
                  Create your first plan with the button below
                </AppText>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.navbar}>
        <HomeNavBar user={currentUser} navigation={navigation} userPlans={userPlans} invitedPlans={invitedPlans} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 12,
  },
  greeting: {
    color: TEAL,
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  feedContainer: {
    height: '118%',
  },
  noPlan: {
    flex: 1,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    color: GREY_0,
    marginLeft: '5%',
    marginBottom: 5,
  },
  noPlanText: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28.6,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
});
