import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { AppText, Navbar, Screen, AlertModal } from '../atoms/AtomsExports';
import { HomeNavBar } from '../molecules/HomeNavBar';
import {
  formatDayOfWeekDate,
  formatTime,
  getCurrentUser,
  loadInviteeStatus,
  respondToPlan,
} from './../res/utilFunctions';
import { User, Plan } from '../models';
import { TEAL } from '../res/styles/Colors';
import { ViewPlanTile } from '../organisms/ViewPlanTile';
import { RoutePropParams } from '../res/root-navigation';

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

  useEffect(() => {
    const awaitUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
      reorder(route.params.invitedPlans);
      setUserPlans(route.params.userPlans);
      setRefreshing(false);
    };
    awaitUser();
  }, [reload]);

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
        <View style={styles.plans}>
          <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onPlanIndexRefresh} />}
            data={tab === 'invited' ? invitedPlans : userPlans}
            renderItem={renderPlanTile}
            style={{ marginBottom: 40 }}
          />
        </View>
      </View>
      <View style={styles.navbar}>
        <HomeNavBar user={currentUser} navigation={navigation} invitedPlans={invitedPlans} userPlans={userPlans} />
      </View>
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
    flex: 1,
    width: '100%',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
