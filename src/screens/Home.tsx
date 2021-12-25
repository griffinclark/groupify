/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { globalStyles } from './../res/styles/GlobalStyles';
import { background, GREY_0, TEAL_0 } from './../res/styles/Colors';
// eslint-disable-next-line unused-imports/no-unused-imports-ts
import { getCurrentUser, loadInviteeStatus } from './../res/utilFunctions';
import { Screen } from '../atoms/AtomsExports';
import { AppText } from '../atoms/AppText';
import { NextPlan, InvitedPreview, CreatedPlans } from '../organisms/OrganismsExports';
import { HomeNavBar } from '../molecules/MoleculesExports';
import { RoutePropParams } from '../res/root-navigation';
import { DataStore } from '@aws-amplify/datastore';
import { User, Plan, Invitee } from '../models';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native-elements/dist/image/Image';
import * as Location from 'expo-location';
import { copy } from '../res/groupifyCopy';
import { LocationAccuracy } from 'expo-location';
import { activities } from './SelectorMenu';
import { GoogleLocation } from '../res/dataModels';
import { LogBox } from 'react-native';
export interface Props {
  navigation: {
    CreateAccount: {
      step: string;
      email: string;
    };
    params: {
      Login: string;
    };
    navigate: (ev: string, {}) => void;
    push: (ev: string, {}) => void;
  };
  route: RoutePropParams;
}

export const Home: React.FC<Props> = ({ navigation, route }: Props) => {
  const [userPlans, setUserPlans] = useState<Plan[]>([]);
  const [invitedPlans, setInvitedPlans] = useState<Plan[]>([]);
  const [upcomingPlans, setUpcomingPlans] = useState<Plan[]>([]);
  const [locations, setLocations] = useState<GoogleLocation[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [trigger1, setTrigger1] = useState(false);
  const [trigger2, setTrigger2] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [state, setState] = useState('loading');
  const [userLocation, setUserLocation] = useState({}); // defaults to Los Angeles if user location is not provided and no place param
  const [region, setRegion] = useState({});

  useEffect(() => {
    getUserLocation();
    queryActivities();
    //
  }, []);

  useEffect(() => {
    const awaitUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
      await loadPlans(user);
      setTrigger2(!trigger2);
      setRefreshing(false);
      setState('done');
    };
    awaitUser();
  }, [trigger1]);

  const onHomeRefresh = () => {
    setRefreshing(true);
    setTrigger1(!trigger1);
  };

  const getUserLocation = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    } else {
      try {
        let location = await Location.getLastKnownPositionAsync();
        if (location === null) {
          location = await Location.getCurrentPositionAsync({ accuracy: LocationAccuracy.Highest });
        }
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
          default: false,
        });

        queryActivities();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const queryActivities = async () => {
    const GOOGLE_PLACES_API_KEY = 'AIzaSyBmEuQOANTG6Bfvy8Rf1NdBWgwleV7X0TY';
    const search =
      'https://maps.googleapis.com/maps/api/place/textsearch/json?' +
      `location=${userLocation.latitude},${userLocation.longitude}` +
      `&radius=${5000}` +
      `&query=${'climb'}` +
      `&key=${GOOGLE_PLACES_API_KEY}`;
    const response = await fetch(search);
    const detail = await response.json();
    setLocations(detail.results);
  };

  const loadPlans = async (user: User) => {
    const createdPlanOnDb = await DataStore.query(Plan, (plan) => plan.creatorID('eq', user.id));
    const createdPlans = createdPlanOnDb.map((plan) => plan);
    const invitees = await DataStore.query(Invitee, (invitee) => invitee.phoneNumber('eq', user.phoneNumber));
    let invitedPlans = invitees.map((invitee) => invitee.plan).filter((item): item is Plan => item !== undefined); //removePastPlans(
    // );
    const upcoming = invitedPlans;
    if (currentUser) invitedPlans = invitedPlans.filter((item): item is Plan => item.creatorID !== currentUser.id);

    const accepted = [];
    for (const plan of upcoming) {
      const status = await loadInviteeStatus(plan);
      if (status === 'ACCEPTED') {
        accepted.push(plan);
      }
    }

    setUpcomingPlans(accepted);
    setUserPlans(createdPlans);
    setInvitedPlans(invitedPlans);
  };

  const createGreeting = () => {
    if (currentUser) {
      const firstName = currentUser.name.includes(' ')
        ? currentUser.name.substr(0, currentUser.name.indexOf(' '))
        : currentUser.name;
      return copy.helloNameMessage + firstName;
    }
  };

  return (
    <Screen style={{ backgroundColor: background }}>
      {state === 'loading' ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onHomeRefresh} />}>
          <View style={styles.header} testID="HomeScreen">
            <AppText maxFontSizeMultiplier={1} style={[globalStyles.superTitle, styles.greeting]}>
              {createGreeting()}
            </AppText>
            <View></View>
          </View>
          <View style={styles.feedContainer}>
            {(upcomingPlans.length > 0 || invitedPlans.length) > 0 ? (
              <View>
                {upcomingPlans.length > 0 && (
                  <View>
                    <AppText style={styles.label}>{copy.upcomingPlansTitle}</AppText>
                    <NextPlan reload={trigger2} navigation={navigation} plan={upcomingPlans[0]} />
                  </View>
                )}
                <View style={globalStyles.miniSpacer}></View>
                <View>
                  {invitedPlans.length > 0 && (
                    <>
                      <AppText style={styles.label}>{copy.yourPlansTitle}</AppText>
                      <InvitedPreview
                        reload={trigger2}
                        navigation={navigation}
                        invitedPlans={invitedPlans}
                        userPlans={userPlans}
                      />
                    </>
                  )}
                  <View style={globalStyles.miniSpacer}></View>
                </View>
                <View style={{ height: userPlans.length > 0 ? 360 : 420 }}>
                  <AppText style={styles.label}>{copy.createdPlansTitle}</AppText>
                  <CreatedPlans
                    user={currentUser}
                    navigation={navigation}
                    userPlans={userPlans}
                    invitedPlans={invitedPlans}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.noPlan}>
                <Text maxFontSizeMultiplier={1} style={styles.noPlanText}>
                  {copy.createdPlansDescription}
                </Text>
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <Image
                    source={require('../../assets/homepage-graphic.png')}
                    style={{ width: 335, height: 280 }}
                    resizeMode={'contain'}
                  />
                </View>
                <View>
                  <Text maxFontSizeMultiplier={1} style={[styles.noPlanText, { textAlign: 'center', width: '70%' }]}>
                    {copy.createFirstPlanText}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      )}

      <View style={styles.navbar}>
        <HomeNavBar
          locations={locations}
          user={currentUser}
          navigation={navigation}
          userPlans={userPlans}
          invitedPlans={invitedPlans}
          userLocation={userLocation}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 12,
  },
  greeting: {
    color: TEAL_0,
  },
  navbar: {
    // position: 'absolute',
    // bottom: 0,
    // alignSelf: 'center',
  },
  feedContainer: {
    height: '118%',
  },
  noPlan: {
    flex: 1,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    color: GREY_0,
    marginLeft: '5%',
    marginBottom: 5,
  },
  noPlanText: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28.6,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
});
