import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { AppText, Navbar, Screen, AlertModal } from '../atoms/AtomsExports';
import { HomeNavBar } from '../molecules/HomeNavBar';
import {
  formatDayOfWeekDate,
  formatTime,
  getCurrentUser,
  loadInviteeStatus,
  removePastPlans,
  respondToPlan,
  sortPlansByDate,
} from './../res/utilFunctions';
import { User, Plan, Invitee } from '../models';
import { TEAL, WHITE } from '../res/styles/Colors';
import { ViewPlanTile } from '../organisms/ViewPlanTile';
import { RoutePropParams } from '../res/root-navigation';
import { DataStore } from '@aws-amplify/datastore';
import GestureRecognizerView from 'rn-swipe-gestures';
import { AnnounceIcon, SettingsIcon, CreatePlanIcon } from '../../assets/Icons/IconExports';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
  route: RoutePropParams;
}

export const PlanIndex: React.FC<Props> = ({ navigation, route }: Props) => {
  const [tab, setTab] = useState(route.params.option || 'invited');
  const [currentUser, setCurrentUser] = useState<User>();
  const [invitedPlans, setInvitedPlans] = useState<Plan[]>([]);
  const [userPlans, setUserPlans] = useState<Plan[]>([]);
  const [modal, setModal] = useState(<View style={{ display: 'none' }} />);
  const [reload, setReload] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [state, setState] = useState('loading');

  useEffect(() => {
    const awaitUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
      loadPlans(user);
      setRefreshing(false);
      setState('done');
    };
    awaitUser();
  }, [reload]);

  const loadPlans = async (user: User) => {
    console.log('Loading plans');

    const userCreatedPlans = removePastPlans(await DataStore.query(Plan, (plan) => plan.creatorID('eq', user.id)));
    const invitees = await DataStore.query(Invitee, (invitee) => invitee.phoneNumber('eq', user.phoneNumber));
    let invitedPlans = removePastPlans(
      invitees
        .map((invitee) => {
          return invitee.plan;
        })
        .filter((item): item is Plan => item !== undefined),
    );

    if (currentUser) invitedPlans = invitedPlans.filter((item): item is Plan => item.creatorID !== currentUser.id);

    setUserPlans(sortPlansByDate(userCreatedPlans));
    reorder(sortPlansByDate(invitedPlans));
    console.log('Finished loading plans');
  };

  const reorder = (plans: Plan[]) => {
    const notificationList: Plan[] = [];
    const list: Plan[] = [];
    for (const plan of plans) {
      loadInviteeStatus(plan).then((status) => {
        if (status === 'PENDING') {
          notificationList.push(plan);
        } else {
          list.push(plan);
        }
        setInvitedPlans(notificationList.concat(list));
      });
    }
  };
  interface RenderItemProps {
    item: Plan;
  }

  const renderPlanTile = ({ item }: RenderItemProps) => {
    return <ViewPlanTile reload={reload} navigation={navigation} plan={item} modal={modals} />;
  };

  const modals = (payload: string, plan: Plan) => {
    if (payload === 'accept') {
      setModal(
        <AlertModal
          onButton1Press={() => {
            setModal(<View style={{ display: 'none' }} />);
            respondToPlan(true, plan).then(() => setReload(!reload));
          }}
          button1Text="Woot!"
          message="You’ve accepted an invite!"
          message2={`${plan.description ? plan.description : plan.title}\n${
            plan.date && formatDayOfWeekDate(plan.date)
          }\n${plan.time && formatTime(plan.time)}`}
        />,
      );
    }
    if (payload === 'reject') {
      setModal(
        <AlertModal
          onButton1Press={() => {
            setConfirmRejectModal(plan);
          }}
          onButton2Press={() => {
            setModal(<View style={{ display: 'none' }} />);
          }}
          button1Text="Yes, Decline"
          button2Text="No"
          message="Are you sure you’d like to decline this invitation?"
          message2={`${plan.description}\n${plan.date && formatDayOfWeekDate(plan.date)}\n${
            plan.time && formatTime(plan.time)
          }`}
        />,
      );
    }
  };

  const setConfirmRejectModal = (plan: Plan) => {
    setModal(
      <AlertModal
        onButton1Press={() => {
          respondToPlan(false, plan).then(() => setReload(!reload));
          setModal(<View style={{ display: 'none' }} />);
        }}
        button1Text="Okay"
        message="Invite has been declined."
        message2={`${plan.description}\n${plan.date && formatDayOfWeekDate(plan.date)}\n${
          plan.time && formatTime(plan.time)
        }`}
      />,
    );
  };

  const onPlanIndexRefresh = () => {
    setRefreshing(true);
    setReload(!reload);
  };

  return (
    <Screen>
      <View testID="PlanIndexScreen" style={styles.planIndexContainer}>
        <Navbar location={'Home'} navigation={navigation} title={'All Plans'} />
        <View style={styles.tabs}>
          <View style={tab === 'invited' ? styles.tabContainerSelected : styles.tabContainer}>
            <AppText
              onPress={() => setTab('invited')}
              style={tab === 'invited' ? styles.tabTextSelected : styles.tabText}
            >
              INVITED
            </AppText>
          </View>
          <View style={tab === 'created' ? styles.tabContainerSelected : styles.tabContainer}>
            <AppText
              onPress={() => setTab('created')}
              style={tab === 'created' ? styles.tabTextSelected : styles.tabText}
            >
              CREATED
            </AppText>
          </View>
        </View>
        {state === 'loading' ? (
          <>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size={'large'} />
            </View>
          </>
        ) : (
          <>
            <GestureRecognizerView
            /* eslint-disable */
            // @ts-expect-error
            config={{ detectSwipeDown: false, detectSwipeUp: false }}
            /* eslint-enable */
              onSwipeLeft={() => setTab('created')}
              onSwipeRight={() => setTab('invited')}
            >
              <View style={styles.plans}>
                <FlatList
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onPlanIndexRefresh} />}
                  data={tab === 'invited' ? invitedPlans : userPlans}
                  renderItem={renderPlanTile}
                  style={{ marginBottom: 40 }}
                />
              </View>
            </GestureRecognizerView>
          </>
        )}
      </View>
      {state === 'loading' ? (
        <View style={styles.navbar}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <View style={styles.nav}>
              <View style={styles.navalign}>
                <AnnounceIcon />
                <AppText style={styles.text}>Notifications</AppText>
              </View>
              <View style={styles.navalign}>
                <CreatePlanIcon />
                <AppText style={styles.text}>Create Plan</AppText>
              </View>
              <View style={styles.navalign}>
                <SettingsIcon />
                <AppText style={styles.text}>Settings</AppText>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.navbar}>
          <HomeNavBar user={currentUser} navigation={navigation} invitedPlans={invitedPlans} userPlans={userPlans} />
        </View>
      )}
      {modal ? modal : null}
    </Screen>
  );
};

const styles = StyleSheet.create({
  planIndexContainer: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
  },
  tabContainer: {
    alignItems: 'center',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    marginTop: 20,
    paddingBottom: 14,
    width: '50%',
  },
  tabContainerSelected: {
    alignItems: 'center',
    borderBottomColor: TEAL,
    borderBottomWidth: 3,
    marginTop: 20,
    paddingBottom: 14,
    width: '50%',
  },
  tabText: {
    color: '#8B8B8B',
    fontSize: 16,
    fontWeight: '700',
  },
  tabTextSelected: {
    color: TEAL,
    fontSize: 16,
    fontWeight: '700',
  },
  plans: {
    //flex: 1,
    paddingBottom: 120,
    width: '100%',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  nav: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: TEAL,
  },
  text: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
    color: WHITE,
    textAlign: 'center',
  },
  navalign: { flexDirection: 'column', width: '33%' },
});
