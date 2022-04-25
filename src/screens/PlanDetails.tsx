import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { StyleSheet, View, TouchableOpacity, FlatList, ScrollView, RefreshControl } from 'react-native';
import { Screen, AppText, PlanImageTile } from '../atoms/AtomsExports';
import { TEAL_0, GRAY_LIGHT } from '../res/styles/Colors';
import { Plan, Invitee, Status } from '../models';
import { PlanDetailsTile, Details } from '../molecules/MoleculesExports';
import { WhiteButton } from '../atoms/WhiteButton';
import { getCurrentUser, respondToPlan } from '../res/utilFunctions';
import { copy } from '../res/groupifyCopy';
import { TopNavBar } from '../molecules/TopNavBar';
import { NavigationProps } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { User } from '../models';

interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
}

export const PlanDetails: React.FC<Props> = ({ navigation, route }: Props) => {
  const plan = route.params.plan;
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  const [userInvitee, setUserInvitee] = useState<Invitee>();
  const [refreshAttendeeList, setRefreshAttendeeList] = useState(false);
  const [selectorOption, setSelectorOption] = useState('ACCEPTED');
  const [hostName, setHostName] = useState<string>('');
  const [planCreator, setPlanCreator] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getPlanHost(plan.creatorID);
    loadInvitees();
    isCreator();
  }, [refreshAttendeeList]);

  const getPlanHost = async (id: string) => {
    const users = await DataStore.query(User, (user) => user.id('eq', id), { limit: 1 });
    if (users.length > 0) {
      setHostName(users[0].name);
    }
  };

  const onPlanDetailsRefresh = () => {
    setRefreshing(true);
    setRefreshAttendeeList(!refreshAttendeeList);
  };

  const loadInvitees = async () => {
    const invitees = (await DataStore.query(Invitee)).filter((invitee) => invitee.plan?.id === plan.id);
    setInvitees(invitees);
    const userInfo = await Auth.currentUserInfo();
    for (const invitee of invitees) {
      if (invitee.phoneNumber === userInfo.attributes.phone_number) {
        setUserInvitee(invitee);
        break;
      }
    }
    setRefreshing(false);
  };

  const isCreator = async () => {
    const user = await getCurrentUser();
    if (user.id === plan.creatorID) {
      setPlanCreator(true);
    }
  };

  const renderInvitee = ({ item }: { item: Invitee }) => {
    let backgroundColor = '#969393';
    if (item.status === Status.ACCEPTED) {
      backgroundColor = TEAL_0;
    } else if (item.status === Status.DECLINED) {
      backgroundColor = '#969393';
    }
    if (selectorOption === item.status) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={[styles.sphere, { backgroundColor: backgroundColor }]}>
            <AppText maxFontSizeMultiplier={1} style={{ fontSize: 24, fontWeight: '700', color: 'white' }}>
              {item.name.slice(0, 1)}
            </AppText>
          </View>
          <AppText style={{ fontSize: 18 }}>{item.name}</AppText>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <Screen>
      <TopNavBar
        stickyHeader={false}
        navigation={navigation}
        displayGroupify={true}
        displayBackButton={true}
        displaySettings={true}
        route={route}
        targetScreen={'Home'}
      />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onPlanDetailsRefresh} />}>
        <View style={styles.bodyContainer}>
          <PlanImageTile plan={plan} />
          <Details plan={plan} />
          <PlanDetailsTile navigation={navigation} hostName={hostName} creator={planCreator} plan={plan} />
          <AppText style={{ fontSize: 16, fontWeight: '700' }}>{copy.whosGoing}</AppText>
        </View>
        <View style={styles.inviteeListContainer}>
          <View style={styles.selector}>
            <TouchableOpacity
              onPress={() => setSelectorOption('ACCEPTED')}
              style={[styles.selectorOption, selectorOption == 'ACCEPTED' ? styles.active : styles.inactive]}
            >
              <AppText
                style={[
                  { fontSize: 16, fontWeight: '700' },
                  selectorOption == 'ACCEPTED' ? styles.activeText : styles.inactiveText,
                ]}
              >
                ACCEPTED
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectorOption('PENDING')}
              style={[styles.selectorOption, selectorOption == 'PENDING' ? styles.active : styles.inactive]}
            >
              <AppText
                style={[
                  { fontSize: 16, fontWeight: '700' },
                  selectorOption == 'PENDING' ? styles.activeText : styles.inactiveText,
                ]}
              >
                {copy.pendingTitle}
              </AppText>
            </TouchableOpacity>
          </View>
          <View style={styles.flatlist}>
            <FlatList data={invitees} renderItem={renderInvitee} />
          </View>
          <View style={{ alignSelf: 'center' }}>
            {planCreator ? (
              <WhiteButton
                onPress={() => {
                  navigation.push('Home', {});
                  DataStore.delete(Plan, (currentPlan) => currentPlan.id('eq', plan.id));
                }}
                text={'Delete Plan'}
              />
            ) : (
              <WhiteButton
                text={userInvitee?.status === 'ACCEPTED' ? 'Decline this plan' : 'Accept Plan'}
                onPress={() => {
                  respondToPlan(userInvitee?.status === 'ACCEPTED' ? false : true, plan).then(() => {
                    setRefreshAttendeeList(!refreshAttendeeList);
                    navigation.push('Home', {});
                  });
                }}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingLeft: 15,
    fontSize: 30,
    color: TEAL_0,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderColor: GRAY_LIGHT,
  },
  bodyContainer: {
    marginTop: 30,
    width: '85%',
    alignSelf: 'center',
    marginBottom: 30,
  },
  inviteeListContainer: {
    flex: 1,
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectorOption: {
    paddingBottom: 5,
    borderBottomWidth: 3,
    width: '42.5%',
    alignItems: 'center',
  },
  active: {
    borderBottomColor: TEAL_0,
  },
  activeText: {
    color: TEAL_0,
  },
  inactive: {
    borderBottomColor: '#E5E5E5',
  },
  inactiveText: {
    color: '#8B8B8B',
  },
  sphere: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginRight: 15,
  },
  flatlist: {
    width: '85%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
    paddingVertical: 15,
  },
  button: {
    width: 182,
    height: 49,
    borderWidth: 2,
    borderColor: TEAL_0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    alignSelf: 'center',
    marginTop: 10,
  },
});
