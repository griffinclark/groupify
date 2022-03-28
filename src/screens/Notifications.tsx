import { DataStore, Predicates, SortDirection } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { AppText, Screen } from '../atoms/AtomsExports';
import { RoutePropParams } from '../res/root-navigation';
import { NavigationProps } from '../res/dataModels';
import { User } from '../models';
import { HomeNavBar } from '../molecules/HomeNavBar';
import { TopNavBar } from '../molecules/TopNavBar';
import { PartyIcon } from '../../assets/Icons/PartyIcon';
import { JOST } from '../res/styles/Fonts';
import { ScrollView } from 'react-native-gesture-handler';
import { GREY_10 } from '../res/styles/Colors';
import { NotificationFromTo } from '../models';

export interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
}

export const Notifications: React.FC<Props> = ({ navigation, route }: Props) => {
  const currentUser: User = route.params.currentUser;
  const [notifications, setNotifications] = useState<NotificationFromTo[]>();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setRefreshing(true);
    const allNotifs = await DataStore.query(NotificationFromTo, Predicates.ALL, {
      sort: (s) => s.createdAt(SortDirection.DESCENDING),
    });

    const userNotifs = allNotifs.filter((notif) => notif.recipient.id === currentUser.id);

    setNotifications(userNotifs);
    setRefreshing(false);
  };

  const returnCreatedTime = (time: string) => {
    let diffInMilliSeconds = Math.abs(new Date().valueOf() - new Date(time).valueOf()) / 1000;

    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    if (days > 0) {
      return days + 'd ago';
    }

    if (hours > 0) {
      return hours + 'h ago';
    }

    if (minutes > 0) {
      return minutes + 'm ago';
    }

    return 'Just Now';
  };

  return (
    <Screen>
      <TopNavBar
        stickyHeader={false}
        navigation={navigation}
        displayGroupify={true}
        displayBackButton={false}
        displaySettings={true}
        route={route}
        targetScreen={'SelectorMenu'}
      />
      {!notifications ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <ScrollView
          testID="NotificationsScreen"
          style={{ flex: 1 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadNotifications} />}
        >
          {notifications.length > 0 ? (
            notifications.map((notification: any) => (
              <View style={styles.notificationItem} key={`notification-${notification.id}`}>
                <AppText style={styles.notificationText}>{notification.notification.body}</AppText>
                <AppText style={styles.notificationTime}>
                  {returnCreatedTime(notification.notification.createdAt)}
                </AppText>

                <AppText>{notification.notificationId}</AppText>
              </View>
            ))
          ) : (
            <View style={{ flex: 1, marginTop: 111, alignItems: 'center' }}>
              <PartyIcon />
              <AppText
                style={{ marginTop: 20, fontSize: 20, lineHeight: 29, fontFamily: JOST[400], textAlign: 'center' }}
              >
                Nothing to see here! {'\n'}
                This page is still in development, {'\n'}
                Please wait for future updates.
              </AppText>
            </View>
          )}
        </ScrollView>
      )}
      <HomeNavBar
        user={route.params.currentUser}
        navigation={navigation}
        route={route}
        userLocation={route.params.userLocation}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    borderBottomColor: GREY_10,
    borderBottomWidth: 1,
    padding: 20,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  notificationText: {
    width: '85%',
    marginRight: 10,
    fontSize: 16,
    lineHeight: 23,
  },
  notificationTime: {
    color: GREY_10,
    fontSize: 12,
  },
});
