import React, { useEffect, useState } from "react";
import { RoutePropParams } from '../res/root-navigation';
import { StyleSheet, View, ActivityIndicator, FlatList } from "react-native";
import { AppText, BottomButton, Button, Navbar, SearchBar, Screen } from '../atoms/AtomsExports';
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
import { API, Auth } from 'aws-amplify';
import { User } from '../models';
import { GRAY_LIGHT, TEAL, WHITE } from '../res/styles/Colors';
import Constants from 'expo-constants';
import * as queries from '../graphql/queries';
import { getAllImportedContacts } from "../res/storageFunctions";
import { AnnounceIcon, SettingsIcon, CreatePlanIcon } from '../../assets/Icons/IconExports';
import { setCurrentScreen } from "expo-firebase-analytics";
import { setAutoServerRegistrationEnabledAsync } from "expo-notifications";
import { DataStore } from '@aws-amplify/datastore';


export interface Props {
    navigation: {
        navigate: (ev: string, {}) => void;
    };
    route: RoutePropParams;
}

export const Notifications: React.FC<Props> = ({ navigation, route }: Props) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [menuItemSelected, setMenuItemSelected] = useState('notifications');
    const [currentUser, setCurrentUser] = useState<User>();
    const [state, setState] = useState('loading');

    useEffect(() => {
        const awaitUser = async () => {
            const user = await getCurrentUser();
            setCurrentUser(user);
            loadNotifications(user);
            setRefreshing(false);
            setState('done');
        };
        awaitUser();
    }, []);

    const loadNotifications = async (user: User) => {
        console.log('Loading notifications');

        const notifications = await DataStore.query(Notification, (notification) => notification.user('eq', user.phoneNumber);)
        setNotifications(notifications);
        
        console.log('Finished loading notifications');
    };

    const menuSelection = (item: string) => {
        setMenuItemSelected(item);
    };

    interface RenderItemProps {
        item: Notification;
    }

    const renderNotificationTile = ({ item }: RenderItemProps) => {
        return <ViewNotificationTile navigation={navigation} notification={item} />;
    };

    return (
        <Screen>
            <View testID="NotificationsScreen" style={styles.notificationsContainer}>
                <Navbar location={'Notifications'} navigation={navigation} title={'Notifications'} />
                {state === 'loading' ? (
                    <>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={'large'} />
                        </View>
                    </>
                    ) : (
                    <>
                        {notifications.length ? (
                            <View style={styles.notifications}>
                                <FlatList
                                    data={notifications}
                                    renderItem={renderNotificationTile}
                                    style={{ marginBottom: 40 }}
                                />
                            </View>)
                            :
                            (
                            <View style={styles.noNotications}>
                                <AppText>
                                    Nothing to see here!
                                </AppText>
                                <AppText style={styles.greyText}>
                                    This page is still in development,
                                    Please wait for future updates.
                                </AppText>
                            </View>
                        )}
                        
                    </>
                )}
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
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    notificationsContainer: {
        flex: 1
    },
    notifications: {
        paddingBottom: 120,
        width: '100%'
    },
    navbar: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
    }
});