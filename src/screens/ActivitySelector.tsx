import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BackChevronIcon, SettingsCogIcon } from '../../assets/Icons/IconExports';
import { RoutePropParams } from '../res/root-navigation';
import { AppText, Screen } from '../atoms/AtomsExports';
import { User, Plan, Invitee } from '../models';
import { getCurrentUser, removePastPlans } from './../res/utilFunctions';
import { DataStore } from '@aws-amplify/datastore';
import { ActivityModal } from '../molecules/ActivityModal';
import GestureRecognizerView from 'rn-swipe-gestures';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
}

export const ActivitySelector: React.FC<Props> = ({ navigation, route }: Props) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [plan, setPlan] = useState<Plan>();
  const [modal, setModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const awaitUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);

      const userCreatedPlans = removePastPlans(await DataStore.query(Plan, (plan) => plan.creatorID('eq', user.id)));

      if (userCreatedPlans[0]) {
        setPlan(userCreatedPlans[0]);
      } else {
        const invitees = await DataStore.query(Invitee, (invitee) => invitee.phoneNumber('eq', user.phoneNumber));
        let invitedPlans = removePastPlans(
          invitees
            .map((invitee) => {
              return invitee.plan;
            })
            .filter((item): item is Plan => item !== undefined),
        );
        if (currentUser) invitedPlans = invitedPlans.filter((item): item is Plan => item.creatorID !== currentUser.id);
        setPlan(invitedPlans[0]);
      }
    };
    awaitUser();
  }, []);

  const handleSwipe = (dir: string) => {
    if (modal) {
      if (dir === 'left') {
        setPage(2);
      } else {
        setPage(1);
      }
    }
  };

  return (
    <GestureRecognizerView
      /* eslint-disable */
      // @ts-expect-error
      config={{ detectSwipeDown: false, detectSwipeUp: false }}
      /* eslint-enable */
      onSwipeLeft={() => handleSwipe('left')}
      onSwipeRight={() => handleSwipe('right')}
    >
      <ScrollView testID="ActivitySelectorScreen">
        <Screen>
          <View style={styles.activitySelectorContainer}>
            <View style={styles.navbar}>
              <BackChevronIcon
                onPress={() => {
                  navigation.goBack();
                }}
                height="15"
                width="7.5"
              />
              <AppText style={styles.navbarText}>CREATE A PLAN</AppText>
              <SettingsCogIcon
                onPress={() => {
                  navigation.navigate('Profile', {
                    currentUser: currentUser,
                    currentUserPlan: plan,
                  });
                }}
              />
            </View>
            <Image source={require('../../assets/activity-selector.png')} />
            {/* <View style={styles.description}>
            <AppText style={styles.descriptionText}>What do you want to do today?</AppText>
          </View> */}
            <View style={styles.activitySelector}>
              <View style={styles.activities}>
                <TouchableOpacity onPress={() => setModal(true)} style={styles.question}>
                  <AppText style={styles.questionText}>?</AppText>
                </TouchableOpacity>

                <View style={styles.activitiesRow}>
                  <TouchableOpacity>
                    <Image source={require('../../assets/activity-food.png')} />
                    <AppText style={styles.activityText}>Get Food</AppText>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require('../../assets/activity-outside.png')} />
                    <AppText style={styles.activityText}>Go Outside</AppText>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require('../../assets/activity-gym.png')} />
                    <AppText style={styles.activityText}>Get Fit</AppText>
                  </TouchableOpacity>
                </View>
                <View style={styles.activitiesRow}>
                  <TouchableOpacity>
                    <Image source={require('../../assets/activity-shopping.png')} />
                    <AppText style={styles.activityText}>Get Shopping</AppText>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require('../../assets/activity-coffee.png')} />
                    <AppText style={styles.activityText}>Get Coffee</AppText>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require('../../assets/activity-relax.png')} />
                    <AppText style={styles.activityText}>Get Relaxed</AppText>
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <View style={styles.dividerRow}>
                  <View style={styles.divider} />
                  <AppText style={styles.dividerText}>or</AppText>
                  <View style={styles.divider} />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('PlanCreate', { currentUser: currentUser });
                  }}
                >
                  <AppText style={styles.activityLowerLink}>Plan Custom Event</AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {modal && <ActivityModal modal={modal} setModal={setModal} page={page} />}
        </Screen>
      </ScrollView>
    </GestureRecognizerView>
  );
};

const styles = StyleSheet.create({
  activitySelectorContainer: {},
  navbar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: 'rgba(139, 139, 139, .3)',
    borderBottomWidth: 1,
  },
  navbarText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 23,
  },
  description: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 190,
    paddingHorizontal: 50,

    backgroundColor: 'salmon',
  },
  descriptionText: {
    fontSize: 30,
    lineHeight: 44,
  },
  activitySelector: {},
  activities: {},
  question: {
    alignItems: 'center',
    backgroundColor: '#31A59F',
    borderRadius: 31.5,
    justifyContent: 'center',
    height: 63,
    position: 'absolute',
    right: 41,
    top: -40,
    width: 63,
  },
  questionText: {
    color: '#ffffff',
    fontSize: 64,
    fontWeight: '700',
    lineHeight: 0,
    position: 'absolute',
    top: -12,
  },
  activitiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  activityText: {
    fontSize: 20,
    marginBottom: 15,
    marginTop: 10,
    textAlign: 'center',
  },
  // activityLower: { backgroundColor: 'red' },
  dividerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  divider: {
    backgroundColor: '#8b8b8b',
    height: 2,
    width: 110,
  },
  dividerText: {
    color: '#8b8b8b',
    fontSize: 24,
    lineHeight: 34,
  },
  activityLowerLink: {
    color: '#31A59F',
    fontSize: 20,
    lineHeight: 29,
    marginTop: 20,
    marginBottom: 46,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
