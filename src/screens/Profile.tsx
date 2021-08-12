import { Auth, DataStore } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Screen } from '../atoms/AtomsExports';
import { RoutePropParams } from '../res/root-navigation';
import { formatTime } from '../res/utilFunctions';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
  route: RoutePropParams;
}

export const Profile: React.FC<Props> = ({ navigation, route }: Props) => {
  const currentUser = route.params.currentUser;
  const currentUserPlan = route.params.currentUserPlans;
  const [sundayAvailabilityStart, setSundayAvailabilityStart] = useState('');
  const [sundayAvailabilityEnd, setSundayAvailabilityEnd] = useState('');
  const [mondayAvailabilityStart, setMondayAvailabilityStart] = useState('');
  const [mondayAvailabilityEnd, setMondayAvailabilityEnd] = useState('');
  const [tuesdayAvailabilityStart, setTuesdayAvailabilityStart] = useState('');
  const [tuesdayAvailabilityEnd, setTuesdayAvailabilityEnd] = useState('');

  useEffect(() => {
    if (currentUser.availability?.Sunday) {
      setSundayAvailabilityStart(formatTime(currentUser.availability.Sunday[0]));
      setSundayAvailabilityEnd(formatTime(currentUser.availability.Sunday[1]));
      setMondayAvailabilityStart(formatTime(currentUser.availability.Monday[0]));
      setMondayAvailabilityEnd(formatTime(currentUser.availability.Monday[1]));
      setTuesdayAvailabilityStart(formatTime(currentUser.availability.Tuesday[0]));
      setTuesdayAvailabilityEnd(formatTime(currentUser.availability.Tuesday[1]));
    }
  }, []);

  return (
    <Screen>
      <View style={styles.detailContainer}>
        <Icon name="arrow-left" type="font-awesome" size={30} onPress={() => navigation.navigate('Home', {})} />
        <View style={styles.details}>
          <View style={styles.userPhoto}>
            <Text style={styles.text}>{currentUser.name.substring(0, 1)}</Text>
          </View>
          <Text style={styles.textName}>{currentUser.name}</Text>
        </View>
        <Icon
          name="logout"
          type="material"
          size={30}
          onPress={async () => {
            try {
              await DataStore.clear();
              await DataStore.stop();
              await DataStore.start();
              await Auth.signOut();
              console.log('Successfully signed out');
              navigation.navigate('Welcome', {});
            } catch (err) {
              console.log('error signing out...', err);
            }
          }}
        />
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.userActivity}>
          <TouchableOpacity style={styles.selector}>
            <Text style={styles.planTitle}>Invites/Plans</Text>
            <Icon name="chevron-forward-outline" size={30} type="ionicon" />
          </TouchableOpacity>
          {currentUserPlan && (
            <View style={styles.plan}>
              <Text style={styles.planTitle}>{currentUserPlan.title}</Text>
              <View style={styles.planBody}>
                <Text style={styles.planDate}>{currentUserPlan.date}</Text>
                <View style={{ borderRadius: 15, backgroundColor: '#31A59F' }}>
                  <Text style={styles.upcoming}>Upcoming</Text>
                </View>
              </View>
            </View>
          )}
        </View>
        <View style={styles.userActivity}>
          <TouchableOpacity onPress={() => navigation.navigate('SetAvailability', {})} style={styles.selector}>
            <Text style={styles.planTitle}>Availability</Text>
            <Icon name="chevron-forward-outline" size={30} type="ionicon" />
          </TouchableOpacity>
          <View style={styles.availability}>
            <View style={styles.availabilityDays}>
              <Text style={styles.availabilityText}>Sunday</Text>
              <Text style={styles.availabilityText}>
                <Text style={{ color: '#31A59F' }}>{sundayAvailabilityStart}</Text> to{' '}
                <Text style={{ color: '#31A59F' }}>{sundayAvailabilityEnd}</Text>
              </Text>
            </View>
            <View style={styles.availabilityDays}>
              <Text style={styles.availabilityText}>Monday</Text>
              <Text style={styles.availabilityText}>
                <Text style={{ color: '#31A59F' }}>{mondayAvailabilityStart}</Text> to{' '}
                <Text style={{ color: '#31A59F' }}>{mondayAvailabilityEnd}</Text>
              </Text>
            </View>
            <View style={styles.availabilityDays}>
              <Text style={styles.availabilityText}>Tuesday</Text>
              <Text style={styles.availabilityText}>
                <Text style={{ color: '#31A59F' }}>{tuesdayAvailabilityStart}</Text> to{' '}
                <Text style={{ color: '#31A59F' }}>{tuesdayAvailabilityEnd}</Text>
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://forms.gle/ysqh1hg5NhisEAcM7')}
          style={styles.bugReport}
        >
          <Text style={{ fontSize: 18 }}>Submit Bug Report</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  details: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  detailContainer: {
    elevation: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    backgroundColor: 'white',
    flex: 1,
    marginTop: -45,
  },
  userPhoto: {
    backgroundColor: '#C4C4C4',
    width: 150,
    height: 150,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#BE8C2C',
  },
  text: {
    fontSize: 60,
    fontWeight: '800',
    color: 'white',
  },
  bodyContainer: {
    flex: 2.5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textName: {
    fontWeight: '700',
    fontSize: 22,
    padding: 10,
  },
  bugReport: {
    paddingVertical: 15,
    width: 270,
    borderWidth: 1,
    borderColor: '#31A59F',
    borderRadius: 25,
    textAlignVertical: 'center',
    alignItems: 'center',
    margin: 20,
  },
  userActivity: {
    width: '90%',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#BE8C2C',
    margin: 20,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    marginHorizontal: 15,
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 0.5,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  plan: {
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  planBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planDate: {
    fontSize: 16,
    fontWeight: '400',
  },
  upcoming: {
    fontWeight: '400',
    fontSize: 12,
    padding: 6,
    color: 'white',
  },
  availability: {
    paddingHorizontal: 20,
  },
  availabilityDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  availabilityText: {
    fontSize: 16,
    fontWeight: '400',
  },
});
