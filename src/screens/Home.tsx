import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { globalStyles } from './../res/styles/GlobalStyles';
import { GREY_0, TEAL } from './../res/styles/Colors';
import { convertDateStringToDate, getCurrentUser, isFuturePlan, sortPlansByDate } from './../res/utilFunctions';
import { Screen } from '../atoms/AtomsExports';
import { MiniDataDisplay } from '../organisms/OrganismsExports';
import { HomeNavBar } from '../molecules/MoleculesExports';
import { RoutePropParams } from '../res/root-navigation';
import { DataStore } from '@aws-amplify/datastore';
import { User, Plan, Invitee } from '../models';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
  const [upcomingPlans, setUpcomingPlans] = useState<Plan[]>([]);
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
    setUpcomingPlans(sortPlansByDate(filterUpcomingPlans(userPlans.concat(invitedPlans))));
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

  const filterUpcomingPlans = (plans: Plan[]) => {
    const currentDate = new Date();
    const weekInMS = 604800000;
    return plans.filter((plan) => {
      if (plan.date) {
        if (convertDateStringToDate(plan.date).getTime() - currentDate.getTime() < weekInMS) {
          return true;
        }
      }
      return false;
    });
  };

  const createGreeting = () => {
    if (currentUser) {
      const firstName = currentUser.name.includes(' ')
        ? currentUser.name.substr(0, currentUser.name.indexOf(' '))
        : currentUser?.name;
      return `Hello, ${firstName}`;
    }
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={[globalStyles.superTitle, styles.greeting]}>{createGreeting()}</Text>
        <View style={styles.icon}>
          <Icon
            name="refresh"
            type="font-awesome"
            size={30}
            color={TEAL}
            onPress={() => (currentUser ? loadPlans(currentUser) : 0)}
          />
        </View>
      </View>
      <View style={styles.feedContainer}>
        {userPlans.concat(invitedPlans).length > 0 ? (
          <View>
            <Text style={styles.label}>This Week</Text>
            <MiniDataDisplay navigation={navigation} data={upcomingPlans} />
            <View style={globalStyles.miniSpacer}></View>
            <Text style={styles.label}>Your Created Plans</Text>
            {/* <View style={styles.sortMenu}>
              <Text>Newest</Text>
              <Text>Oldest</Text>
            </View> */}
            <MiniDataDisplay navigation={navigation} data={userPlans} />
            <View style={globalStyles.miniSpacer}></View>
            <Text style={styles.label}>Your Invites</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('InvitedPlans', { currentUser: currentUser });
              }}
            >
              <Text style={styles.selector}>See All</Text>
            </TouchableOpacity>
            <MiniDataDisplay navigation={navigation} data={invitedPlans} />
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
      <View style={styles.navbar}>
        <HomeNavBar user={currentUser} navigation={navigation} plan={userPlans[0] ? userPlans[0] : invitedPlans[0]} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  greeting: {
    color: TEAL,
    marginTop: 10,
  },
  icon: {
    position: 'absolute',
    top: 20,
    right: 25,
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
  selector: {
    marginLeft: 15,
    textDecorationLine: 'underline',
    color: TEAL,
  },
});
