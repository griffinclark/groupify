import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { globalStyles } from './../res/styles/GlobalStyles';
import { GREY_0, TEAL } from './../res/styles/Colors';
import { convertDateStringToDate, comparePlansByDate } from './../res/utilFunctions';
import { Screen } from '../atoms/AtomsExports';
import { MediumDataDisplay } from '../organisms/OrganismsExports';
import { HomeNavBar } from '../molecules/MoleculesExports';
import { RoutePropParams } from '../res/root-navigation';
import { DataStore } from '@aws-amplify/datastore';
import { User, Plan, Invitee, Status } from '../models';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
}

export const InvitedPlans: React.FC<Props> = ({ navigation, route }: Props) => {
  const currentUser = route.params.currentUser;
  const [upcomingPlans, setUpcomingPlans] = useState<Plan[]>([]);
  const [pendingInvites, setPendingInvites] = useState<Plan[]>([]);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    const invitees = await DataStore.query(Invitee, (invitee) => invitee.phoneNumber('eq', currentUser.phoneNumber));
    const invitedPlans = removePastPlans(
      invitees
        .map((invitee) => {
          return invitee.plan;
        })
        .filter((item): item is Plan => item !== undefined),
    );
    setUpcomingPlans(filterUpcomingPlans(invitedPlans));
    setPendingInvites(await filterPendingInvites(currentUser.phoneNumber));
  };

  const removePastPlans = (plans: Plan[]) => {
    const currentDate = new Date();
    return plans.filter((plan) => {
      if (plan.date) {
        if (convertDateStringToDate(plan.date).getTime() > currentDate.getTime()) {
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
        if (convertDateStringToDate(plan.date).getTime() - currentDate.getTime() < weekInMS) {
          return true;
        }
      }
      return false;
    });
  };

  const filterPendingInvites = async (inviteePhoneNum: string) => {
    const invitees = await DataStore.query(Invitee, (invitee) =>
      invitee.phoneNumber('eq', inviteePhoneNum).status('eq', Status.PENDING),
    );
    const pendingInvites = removePastPlans(
      invitees
        .map((invitee) => {
          return invitee.plan;
        })
        .filter((item): item is Plan => item !== undefined),
    );
    return pendingInvites;
  };

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Icon name="arrow-left" type="font-awesome" size={30} onPress={() => navigation.goBack()} />
        </View>
        <Text style={[globalStyles.superTitle, styles.greeting]}>Your Invites</Text>
        <View style={styles.icon}>
          <Icon
            name="refresh"
            type="font-awesome"
            size={30}
            color={TEAL}
            onPress={() => (currentUser ? loadPlans() : 0)}
          />
        </View>
      </View>
      <View style={styles.feedContainer}>
        {upcomingPlans.concat(pendingInvites).length > 0 ? (
          <View>
            <Text style={styles.label}>This Week</Text>
            <MediumDataDisplay data={upcomingPlans} navigation={navigation} />
            <View style={globalStyles.miniSpacer}></View>
            <Text style={styles.label}>Pending Invites</Text>
            <MediumDataDisplay data={pendingInvites} navigation={navigation} />
          </View>
        ) : (
          <View style={styles.title}>
            <Text style={globalStyles.superTitle}>When you get invited to a plan, it will show up here</Text>
          </View>
        )}
      </View>
      <View style={styles.navbar}>
        <HomeNavBar user={currentUser} navigation={navigation} plan={upcomingPlans[0]} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  greeting: {
    color: TEAL,
    marginTop: 10,
  },
  icon: {
    top: 20,
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
