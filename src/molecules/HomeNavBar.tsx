import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { TEAL, WHITE } from '../res/styles/Colors';
import { User, Plan } from '../models';
import { AppText } from '../atoms/AppText';
import { AnnounceIcon, SettingsIcon, CreatePlanIcon } from '../../assets/Icons/IconExports';
import * as Notifications from 'expo-notifications';
import { getBadgeCount } from '../res/notifications';

interface Props {
  user?: User;
  style?: Record<string, unknown>;
  invitedPlans: Plan[];
  userPlans: Plan[];
  navigation: {
    navigate: (ev: string, {}) => void;
  };
}

export const HomeNavBar: React.FC<Props> = ({ user, style, userPlans, invitedPlans, navigation }: Props) => {
  const [notifications, setNotifications] = useState<number>();
  const [trigger, setTrigger] = useState<boolean>();

  const queryNotifications = async () => {
    const numNotifications = await getBadgeCount();
    if (numNotifications != 0) {
      setNotifications(numNotifications);
    } else {
      setNotifications(undefined);
    }
  };

  const handleNotificationPress = async () => {
    await Notifications.setBadgeCountAsync(0);
    setTrigger(!trigger);
    navigation?.navigate('ViewPlans', {
      userPlans: userPlans,
      invitedPlans: invitedPlans,
    });
  };

  useEffect(() => {
    queryNotifications();
  }, [trigger]);

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <View style={[styles.nav, style]}>
        <TouchableOpacity style={{ width: '33%' }} onPress={handleNotificationPress}>
          <AnnounceIcon />
          <AppText style={styles.text}>Notifications</AppText>
          {notifications && (
            <View style={styles.notification}>
              <AppText style={styles.notificationText}>{notifications}</AppText>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '33%' }}
          onPress={() => {
            navigation.navigate('PlanCreate', { currentUser: user });
          }}
        >
          <CreatePlanIcon />
          <AppText style={styles.text}>Create Plan</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '33%' }}
          onPress={() => {
            navigation.navigate('Profile', {
              currentUser: user,
              currentUserPlan: userPlans[0] ? userPlans[0] : invitedPlans[0],
            });
          }}
        >
          <SettingsIcon />
          <AppText style={styles.text}>Settings</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  notification: {
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 15,
    justifyContent: 'center',
    position: 'absolute',
    right: 30,
    top: -15,
    height: 30,
    width: 30,
  },
  notificationText: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '700',
  },
});
