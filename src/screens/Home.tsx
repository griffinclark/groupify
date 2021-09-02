import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { globalStyles } from './../res/styles/GlobalStyles';
import { background, GREY_0, TEAL } from './../res/styles/Colors';
import { getCurrentUser, isFuturePlan, sortPlansByDate } from './../res/utilFunctions';
import { Screen } from '../atoms/AtomsExports';
import { MiniDataDisplay, NextPlan, InvitedPreview } from '../organisms/OrganismsExports';
import { HomeNavBar } from '../molecules/MoleculesExports';
import { RoutePropParams } from '../res/root-navigation';
import { DataStore } from '@aws-amplify/datastore';
import { User, Plan, Invitee } from '../models';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

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

    const userPlans = removePastPlans(await DataStore.query(Plan, (plan) => plan.creatorID('eq', user.id)));

    const invitees = await DataStore.query(Invitee, (invitee) => invitee.phoneNumber('eq', user.phoneNumber));
    const invitedPlans = removePastPlans(
      invitees
        .map((invitee) => {
          return invitee.plan;
        })
        .filter((item): item is Plan => item !== undefined),
    );
    // setUpcomingPlans(sortPlansByDate(filterUpcomingPlans(userPlans.concat(invitedPlans))));
    setUserPlans(sortPlansByDate(userPlans));
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

  // const filterUpcomingPlans = (plans: Plan[]) => {
  //   const currentDate = new Date();
  //   const weekInMS = 604800000;
  //   return plans.filter((plan) => {
  //     console.log(plan.date);
  //     if (plan.date) {
  //       if (convertDateStringToDate(plan.date).getTime() - currentDate.getTime() < weekInMS) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   });
  // };

  const createGreeting = () => {
    if (currentUser) {
      const firstName = currentUser.name.includes(' ')
        ? currentUser.name.substr(0, currentUser.name.indexOf(' '))
        : currentUser?.name;
      return `Hello, ${firstName}!`;
    }
  };


  return (
    <Screen style={{backgroundColor: background}}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={[globalStyles.superTitle, styles.greeting]}>{createGreeting()}</Text>
          <View></View>
        </View>
        <View style={styles.feedContainer}>
          {userPlans.concat(invitedPlans).length > 0 ? (
            <View>
              <View>
                <Text style={styles.label}>COMING UP NEXT</Text>
                <NextPlan navigation={navigation} plan={userPlans[0]} />
              </View>
              <View style={globalStyles.miniSpacer}></View>
              {invitedPlans.length > 0 && (
                <View style={styles.invitedPlans}>
                  <Text style={styles.label}>YOU'RE INVITED...</Text>
                  <InvitedPreview navigation={navigation} invitedPlans={invitedPlans} />
                  <View style={globalStyles.miniSpacer}></View>
                </View>
              )}
              <Text style={styles.label}>CREATED PLANS</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('InvitedPlans', { currentUser: currentUser });
                }}
              >
                <Text style={styles.selector}>See All</Text>
              </TouchableOpacity>
              <MiniDataDisplay navigation={navigation} data={userPlans} />
            </View>
          ) : (
            <View style={styles.title}>
              <Text style={globalStyles.superTitle}>Looks like you don&apos;t have any plans.</Text>
              <Text style={globalStyles.superTitle}>Lets create one together!</Text>
              <Text style={[globalStyles.title, { textAlign: 'center' }]}>
                Create your first plan with the button below
              </Text>
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
    flex: 10,
  },
  title: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    color: GREY_0,
    marginLeft: '5%',
    marginBottom: 5,
  },
  button: {
    flex: 1.5,
    justifyContent: 'center',
  },
  selector: {
    marginLeft: 15,
    textDecorationLine: 'underline',
    color: TEAL,
  },
  invitedPlans: {
    backgroundColor: 'white',
  }
});
