import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { globalStyles } from './../res/styles/GlobalStyles';
import { background, GREY_0, TEAL } from './../res/styles/Colors';
import { getCurrentUser, isFuturePlan, loadInviteeStatus, sortPlansByDate } from './../res/utilFunctions';
import { AppText, Screen } from '../atoms/AtomsExports';
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
    push: (ev: string, e: { email: string; step: string }) => void;
  };
  route: RoutePropParams;
}

export const Home: React.FC<Props> = ({ navigation }: Props) => {
  const [userPlans, setUserPlans] = useState<Plan[]>([]);
  const [invitedPlans, setInvitedPlans] = useState<Plan[]>([]);
  const [pendingInvitedPlans, setPendingInvitedPlans] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>();

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
    for (let i = 0; i < invitedPlans.length; i++) {
      const plan = invitedPlans[i];
      const status = await loadInviteeStatus(plan);
      if (status === 'ACCEPTED' || status === 'PENDING') {
        setPendingInvitedPlans(true);
        break;
      }
    }
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

  return (
    <Screen style={{ backgroundColor: background }}>
      <ScrollView>
        <View style={styles.header}>
          <AppText style={[globalStyles.superTitle, styles.greeting]}>{createGreeting()}</AppText>
          <View></View>
        </View>
        <View style={styles.feedContainer}>
          {userPlans.concat(invitedPlans).length > 0 ? (
            <View>
              <View>
                <AppText style={styles.label}>COMING UP NEXT</AppText>
                <NextPlan navigation={navigation} plan={userPlans.concat(invitedPlans)[0]} />
              </View>
              <View style={globalStyles.miniSpacer}></View>
              {invitedPlans.length > 0 && pendingInvitedPlans && (
                <View style={styles.invitedPlans}>
                  <AppText style={styles.label}>YOU&apos;RE INVITED...</AppText>
                  <InvitedPreview navigation={navigation} invitedPlans={invitedPlans} />
                  <View style={globalStyles.miniSpacer}></View>
                </View>
              )}
              {userPlans.length > 0 && (
                <View>
                  <AppText style={styles.label}>CREATED PLANS</AppText>
                  <CreatedPlans navigation={navigation} userPlans={userPlans} />
                </View>
              )}
              <View style={{ height: 50 }} />
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
        <HomeNavBar user={currentUser} navigation={navigation} plan={userPlans[0] ? userPlans[0] : invitedPlans[0]} />
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
  invitedPlans: {
    backgroundColor: 'white',
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
