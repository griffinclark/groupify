/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Auth, DataStore } from 'aws-amplify';
import { View, Text, SafeAreaView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { FontAwesome5, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { NavigationProps } from '../res/dataModels';
import { RoutePropParams } from '../res/root-navigation';
import { TopNavBar } from '../molecules/TopNavBar';
import { JOST } from '../res/styles/Fonts';
import { GREY_8, GREY_9, TEAL_8, WHITE } from '../res/styles/Colors';
import { copy } from '../res/groupifyCopy';

interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
}

export const ProfileScreen = ({ navigation, route }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar
        stickyHeader={false}
        navigation={navigation}
        displayGroupify={true}
        displayBackButton={true}
        displaySettings={false}
        route={route}
        targetScreen={'Home'}
      />
      <Text style={styles.settings}>{copy.settings}</Text>
      <View style={styles.notification}>
        <Text style={styles.text1}>{copy.notifications}</Text>
        <Text style={styles.notificationBtn}>{copy.comingSoon}</Text>
      </View>
      <View style={styles.section}>
        <TouchableOpacity
          onPress={() => navigation.push('ImportContacts', {})}
          style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 24 }}
        >
          <FontAwesome5 style={{ marginRight: 10 }} name="user" size={16} color={GREY_8} />
          <Text style={styles.text1}>{copy.friendsList}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://forms.gle/ysqh1hg5NhisEAcM7')} style={styles.button}>
          <MaterialIcons style={{ marginRight: 5 }} name="bug-report" size={22} color={GREY_8} />
          <Text style={styles.text1}>{copy.bugReport}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword', { step: 'phone' })}
          style={styles.button}
        >
          <MaterialIcons style={{ marginRight: 10 }} name="lock-open" size={20} color={GREY_8} />
          <Text style={styles.text1}>{copy.resetPassword}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            try {
              console.log('Attempting to sign out');
              await DataStore.clear();
              await DataStore.stop();
              await DataStore.start();
              await Auth.signOut({ global: true });
              console.log('Successfully signed out');
              navigation.navigate('Welcome', { currentUser: null });
            } catch (err) {
              console.log('error signing out...', err);
            }
          }}
          style={styles.button}
        >
          <SimpleLineIcons style={{ marginRight: 10 }} name="logout" size={18} color={GREY_8} />
          <Text style={styles.text1}>{copy.logout}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: GREY_9,
  },
  notification: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: GREY_9,
    paddingBottom: 24,
    alignItems: 'center',
  },
  text1: {
    fontSize: 16,
    fontFamily: JOST['400'],
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  settings: {
    fontSize: 16,
    fontFamily: JOST['500'],
    marginTop: 23,
    marginLeft: 20,
    marginBottom: 40,
  },
  notificationBtn: {
    fontFamily: JOST['500'],
    color: TEAL_8,
  },
});
