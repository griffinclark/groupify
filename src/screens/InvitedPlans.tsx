import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { globalStyles } from './../res/styles/GlobalStyles';
import { GREY_0, TEAL_0 } from './../res/styles/Colors';
import { convertDateStringToDate, getCurrentUser, isFuturePlan, sortPlansByDate } from './../res/utilFunctions';
import { Screen } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { MediumDataDisplay } from '../organisms/OrganismsExports';
import { RoutePropParams } from '../res/root-navigation';
import { DataStore } from '@aws-amplify/datastore';
import { Plan, Invitee, Status } from '../models';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { ScrollView } from 'react-native-gesture-handler';
import { copy } from '../res/groupifyCopy';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
}

export const InvitedPlans: React.FC<Props> = ({ navigation }: Props) => {
  const [upcomingPlans, setUpcomingPlans] = useState<Plan[]>([]);
  const [pendingInvites, setPendingInvites] = useState<Plan[]>([]);
  const [pastPlans, setPastPlans] = useState<Plan[]>([]);
  // const [user, setUser] = useState<User>();

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    const currentUser = await getCurrentUser();
    // setUser(currentUser);
    const invitees = await DataStore.query(Invitee, (invitee) => invitee.phoneNumber('eq', currentUser.phoneNumber));
    const invitedPlans = removePastPlans(
      invitees
        .map((invitee) => {
          return invitee.plan;
        })
        .filter((item): item is Plan => item !== undefined),
    );
    const userCreatedPastPlans = getPastPlans(
      await DataStore.query(Plan, (plan) => plan.creatorID('eq', currentUser.id)),
    );
    const invitedPastPlans = getPastPlans(
      invitees
        .map((invitee) => {
          return invitee.plan;
        })
        .filter((item): item is Plan => item !== undefined),
    );
    setPastPlans(sortPlansByDate(userCreatedPastPlans.concat(invitedPastPlans), true));
    setUpcomingPlans(sortPlansByDate(filterUpcomingPlans(invitedPlans)));
    setPendingInvites(sortPlansByDate(await filterPendingInvites(currentUser.phoneNumber)));
  };

  const getPastPlans = (plans: Plan[]) => {
    const currentDate = new Date();
    return plans.filter((plan) => {
      if (plan.date && plan.time) {
        return !isFuturePlan(plan.date, plan.time, currentDate);
      }
    });
  };

  const removePastPlans = (plans: Plan[]) => {
    const currentDate = new Date();
    return plans.filter((plan) => {
      if (plan.date && plan.time) {
        return isFuturePlan(plan.date, plan.time, currentDate);
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
        <AppText style={[globalStyles.superTitle, styles.greeting]}>{copy.yourInvitees}</AppText>
        <View style={styles.icon}>
          <Icon name="refresh" type="font-awesome" size={30} color={TEAL_0} onPress={() => loadPlans()} />
        </View>
      </View>
      <View style={styles.feedContainer}>
        {upcomingPlans.concat(pendingInvites).length > 0 ? (
          <ScrollView>
            <AppText style={styles.label}>{copy.thisWeek}</AppText>
            <MediumDataDisplay data={upcomingPlans} navigation={navigation} />
            <View style={globalStyles.miniSpacer}></View>
            <AppText style={styles.label}>{copy.pendingInvites}</AppText>
            <MediumDataDisplay data={pendingInvites} navigation={navigation} />
            <View style={globalStyles.miniSpacer}></View>
            <AppText style={styles.label}>{copy.pastPlans}</AppText>
            <MediumDataDisplay data={pastPlans} navigation={navigation} />
          </ScrollView>
        ) : (
          <View style={styles.title}>
            <AppText style={globalStyles.superTitle}>{copy.whenInvitedToPlanTitle}</AppText>
          </View>
        )}
      </View>
      {/* <View style={styles.navbar}>
        <HomeNavBar user={user} navigation={navigation} plan={upcomingPlans[0]} />
      </View> */}
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
    color: TEAL_0,
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
    color: TEAL_0,
  },
});
