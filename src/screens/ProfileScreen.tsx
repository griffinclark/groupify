/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Auth, DataStore } from 'aws-amplify';
import { View, Text, SafeAreaView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { Header } from '../atoms/Header';
import { FontAwesome5, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    push: (ev: any, {}) => void;
    goBack: () => void;
  };
}

export const ProfileScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header navigation={navigation} />
      <Text style={{ fontSize: 20, fontWeight: '500', padding: 15 }}>Settings</Text>
      <View style={styles.notification}>
        <Text style={styles.text1}>Notifications</Text>
        <Text style={{ fontWeight: '600', color: '#31A59F' }}>coming soon!</Text>
      </View>
      <View style={styles.section}>
        <TouchableOpacity
          onPress={() => navigation.push('ImportContacts', {})}
          style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 30 }}
        >
          <FontAwesome5 style={{ marginRight: 10 }} name="user" size={20} color="#797979" />
          <Text style={styles.text1}>Edit Friends List</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://forms.gle/ysqh1hg5NhisEAcM7')} style={styles.button}>
          <MaterialIcons style={{ marginRight: 5 }} name="bug-report" size={22} color="#797979" />
          <Text style={styles.text1}>Submit Bug Report</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword', { step: 'phone' })}
          style={styles.button}
        >
          <MaterialIcons style={{ marginRight: 10 }} name="lock-open" size={20} color="#797979" />
          <Text style={styles.text1}>Reset Password</Text>
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
          <SimpleLineIcons style={{ marginRight: 10 }} name="logout" size={22} color="#797979" />
          <Text style={styles.text1}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 15,
  },
  notification: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 15,
    alignItems: 'center',
  },
  text1: {
    fontSize: 18,
    fontWeight: '400',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
});
