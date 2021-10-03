import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet, View } from 'react-native';

import { AppText, Navbar, Screen } from '../atoms/AtomsExports';
import { HomeNavBar } from '../molecules/HomeNavBar';
import { getCurrentUser } from './../res/utilFunctions';
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
  const [tab, setTab] = useState('invited');
  const [currentUser, setCurrentUser] = useState<User>();
  const [invitedPlans, setInvitedPlans] = useState<Plan[]>([]);
  const [userPlans, setUserPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const awaitUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
      setInvitedPlans(route.params.invitedPlans);
      setUserPlans(route.params.userPlans);
    };
    awaitUser();
  }, []);

  interface RenderItemProps {
    item: Plan;
  }

  const renderPlanTile = ({ item }: RenderItemProps) => {
    return (
      <View>
        <ViewPlanTile plan={item} />
      </View>
    );
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
        <ScrollView>
          <View style={styles.plans}>
            <FlatList
              data={tab === 'invited' ? invitedPlans : userPlans}
              renderItem={renderPlanTile}
              keyExtractor={(item: Plan) => item.id}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.navbar}>
        <HomeNavBar user={currentUser} navigation={navigation} invitedPlans={invitedPlans} userPlans={userPlans} />
      </View>
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
    minHeight: Dimensions.get('window').height,
    width: '100%',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
