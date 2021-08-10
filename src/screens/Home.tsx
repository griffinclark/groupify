import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { globalStyles } from './../res/styles/GlobalStyles';
import { GREY_0, TEAL } from './../res/styles/Colors';
import { convertDateStringToDate, comparePlansByDate } from './../res/utilFunctions';
import { Screen, Button, NavButton } from '../atoms/AtomsExports';
import { MiniDataDisplay } from '../organisms/OrganismsExports';
import { Navbar, HomeNavBar } from '../molecules/MoleculesExports';
import { RoutePropParams } from '../res/root-navigation';
import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { User, Plan, Invitee } from '../models';
import { Icon } from 'react-native-elements/dist/icons/Icon';

interface Props {
  navigation: {
    CreateAccount: {
      step: string;
      email: string;
    };
    params: {
      Login: string;
    };
    navigate:
      | ((ev: string, a?: { step?: string; email?: string }) => void)
      | ((ev: string, a?: { data?: { prevAction?: string } }) => void)
      | ((ev: string, a?: { userID?: string }) => void)
      | ((ev: string, a?: { currentUser?: User }) => void);
    push: (ev: string, e: { email: string; step: string }) => void;
  };
  route: RoutePropParams;
}

export const Home: React.FC<Props> = ({ navigation, route }: Props) => {
  const [upcomingPlans, setUpcomingPlans] = useState<Plan[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [userPlans, setUserPlans] = useState<Plan[]>([]);
  const [invitedPlans, setInvitedPlans] = useState<Plan[]>([]);

  useEffect(() => {
    (async () => {
      if (route.params && route.params.userID) {
        const user = await DataStore.query(User, route.params.userID);
        if (user) {
          setCurrentUser(user);
          loadPlans(user);
        }
      }
    })();
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
    setUpcomingPlans(sortPlansByDate(filterUpcomingPlans(userPlans.concat(invitedPlans))));
    setUserPlans(sortPlansByDate(userPlans));
    setInvitedPlans(sortPlansByDate(invitedPlans));
    console.log('Finished loading plans');
  };

  const sortPlansByDate = (plans: Plan[], reverse = false) => {
    return plans.sort((planA, planB) => comparePlansByDate(planA, planB, reverse));
  };

  const removePastPlans = (plans: Plan[]) => {
    const currentDate = new Date();
    return plans.filter((plan) => {
      if (plan.date) {
        if (convertDateStringToDate(plan.date).valueOf() > currentDate.valueOf()) {
          return true;
        }
      }
      return false;
    });
  };

  const filterUpcomingPlans = (plans: Plan[]) => {
    const currentDate = new Date();
    const weekInMS = 604800000;
    return plans.filter((plan) => {
      if (plan.date) {
        if (convertDateStringToDate(plan.date).valueOf() - currentDate.valueOf() < weekInMS) {
          return true;
        }
      }
      return false;
    });
  };

  return (
    <Screen>
      <Text style={[globalStyles.superTitle, styles.greeting]}>Hello {currentUser?.name}</Text>
      <Icon
        name="refresh"
        type="font-awesome"
        size={30}
        color={TEAL}
        onPress={() => (currentUser ? loadPlans(currentUser) : 0)}
      />
      {/* <View style={styles.navbar}>
        <Navbar>
          <NavButton
            onPress={async () => {
              try {
                await DataStore.clear();
                await DataStore.stop();
                await DataStore.start();
                await Auth.signOut();
                console.log('successfully signed out');
                navigation.navigate('Welcome');
              } catch (err) {
                console.log('error signing out...', err);
              }
            }}
            title="Log Out"
          />
          <NavButton
            onPress={() => {
              navigation.navigate('SetAvailability', { userID: route.params.userID });
            }}
            title="Availability"
          />
          <NavButton
            onPress={() => {
              navigation.navigate('ImportContacts');
            }}
            title="Contacts"
          />
          <NavButton
            onPress={() => {
              navigation.navigate('EditFriends', { userID: route.params.userID });
            }}
            title="Friends"
          />
        </Navbar>
      </View> */}
      <View style={styles.feedContainer}>
        {userPlans.concat(invitedPlans).length > 0 ? (
          <View>
            <Text style={styles.label}>This Week</Text>
            <MiniDataDisplay data={upcomingPlans} />
            <View style={globalStyles.miniSpacer}></View>
            <Text style={styles.label}>Your Created Plans</Text>
            {/* <View style={styles.sortMenu}>
              <Text>Newest</Text>
              <Text>Oldest</Text>
            </View> */}
            <MiniDataDisplay data={userPlans} />
            <View style={globalStyles.miniSpacer}></View>
            <Text style={styles.label}>Your Invites</Text>
            <MiniDataDisplay data={invitedPlans} />
          </View>
        ) : (
          <View style={styles.title}>
            <Text style={globalStyles.superTitle}>When you create an event, it will show up here</Text>
          </View>
        )}
      </View>
      <View>
        <HomeNavBar navigation={navigation} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  greeting: {
    color: TEAL,
    marginTop: 25,
  },
  // navbar: {
  //   flex: 1.5,
  //   justifyContent: 'center',
  // },
  feedContainer: {
    flex: 10,
  },
  title: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 15,
    color: GREY_0,
  },
  button: {
    flex: 1.5,
    justifyContent: 'center',
  },
});
