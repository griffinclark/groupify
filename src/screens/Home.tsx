/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet, View } from 'react-native';
import { getCurrentUser, loadInviteeStatus, removePastPlans, addPastPlans } from './../res/utilFunctions';
import { Screen } from '../atoms/AtomsExports';
import { HomeNavBar } from '../molecules/MoleculesExports';
import { DataStore } from '@aws-amplify/datastore';
import { User, Plan, Invitee } from '../models';
import { AllPlans } from '../res/root-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { TopNavBar } from '../molecules/TopNavBar';
import { PlansPreview } from '../atoms/PlansPreview';
import { ImportContactTile } from '../atoms/ImportContactTile';
import { FooterCard } from '../atoms/FooterCard';
import { Banner } from '../atoms/Banner';
import * as Location from 'expo-location';
import { RoutePropParams } from '../res/root-navigation';
import { LocationAccuracy } from 'expo-location';
import { activities } from './SelectorMenu';
import { GoogleLocation } from '../res/dataModels';
import { LogBox } from 'react-native';
import { globalStyles } from '../res/styles/GlobalStyles';

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
enum LoadingState {
  Loading,
  Loaded,
}
export const Home: React.FC<Props> = ({ navigation, route }: Props) => {
  const [createdPlans, setCreatedPlans] = useState<Plan[]>([]);
  const [acceptedPlans, setAcceptedPlans] = useState<Plan[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [trigger1, setTrigger1] = useState(false);
  const [trigger2, setTrigger2] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [allPlans, setAllPlans] = useState<AllPlans>();
  const [pastPlans, setPastPlans] = useState<Plan[]>([]);
  const [pendingPlans, setPendingPlans] = useState<Plan[]>([]);
  const [state, setState] = useState(LoadingState.Loading);
  const [userLocation, setUserLocation] = useState({}); // defaults to Los Angeles if user location is not provided and no place param
  const [region, setRegion] = useState({});
  const [locations, setLocations] = useState<GoogleLocation[]>([]);


  useEffect(() => {
    getUserLocation();
    queryActivities();
  }, []);

  useEffect(() => {
    const awaitUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
      await loadPlans(user);
      setTrigger2(!trigger2);
      setRefreshing(false);
      setState(LoadingState.Loaded);
    };
    awaitUser();
  }, [trigger1]);

  const getUserLocation = async () => {
    const { status } = await Location.requestPermissionsAsync();
    
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    } else {
      try {
        let location = await Location.getLastKnownPositionAsync();

        console.log(location);

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


  const onHomeRefresh = () => {
    setRefreshing(true);
    setTrigger1(!trigger1);
  };

  const loadPlans = async (user: User) => {
    const createdPlanOnDb = removePastPlans(await DataStore.query(Plan, (plan) => plan.creatorID('eq', user.id)));
    const createdPlans = createdPlanOnDb.map((plan) => plan);
    const invitees = await DataStore.query(Invitee, (invitee) => invitee.phoneNumber('eq', user.phoneNumber));
    const pastCreatedPlans = addPastPlans(await DataStore.query(Plan, (plan) => plan.creatorID('eq', user.id)));

    const invitedPlans = removePastPlans(
      invitees.map((invitee) => invitee.plan).filter((item): item is Plan => item !== undefined),
    );
    const pastInvitedPlans = addPastPlans(
      invitees.map((invitee) => invitee.plan).filter((item): item is Plan => item !== undefined),
    );
    const pastPlanArr = [...pastCreatedPlans, ...pastInvitedPlans];
    const pastPlan = pastPlanArr.filter((plan, index) => pastPlanArr.indexOf(plan) === index);

    const upcoming = invitedPlans.filter((item): item is Plan => item.creatorID !== user.id);

    const pending = [];
    for (const plan of upcoming) {
      const status = await loadInviteeStatus(plan);
      if (status === 'PENDING') {
        pending.push(plan);
      }
    }

    const accepted = [];
    for (const plan of upcoming) {
      const status = await loadInviteeStatus(plan);
      //TODO probably not fixable now, but status should be an enum not a string
      if (status === 'ACCEPTED') {
        accepted.push(plan);
      }
    }

    console.log(createdPlans);
    // const allPlans = [...createdPlans, ...pending, ...accepted];
    setPendingPlans(pending);
    setAcceptedPlans(accepted);
    setCreatedPlans(createdPlans);
    setPastPlans(pastPlan);

    setAllPlans({
      all: [...createdPlans, ...pending, ...accepted],
      created: createdPlans,
      pending: pendingPlans,
      accepted: acceptedPlans,
      past: pastPlans,
    });
  };

  return (
    <Screen style={styles.container}>
      {state === LoadingState.Loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <>
          <TopNavBar title="" navigation={navigation} displayGroupify={true} displayBackButton={false} route={route} targetScreen={'Home'} />
          <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onHomeRefresh} />}>
            <View style={[globalStyles.containerWithHeader, globalStyles.containerWithFooter]}>
              {acceptedPlans.length > 0 || createdPlans.length > 0 ? (
                <Banner reload={trigger2} navigation={navigation} plan={acceptedPlans[0] || createdPlans[0]} />
              ) : null}
              <PlansPreview all={allPlans!} reload={trigger2} navigation={navigation} user={currentUser!} userLocation={userLocation} />
              <ImportContactTile navigation={navigation} />
              <FooterCard />
            </View>
          </ScrollView>
        </>
      )}

      <HomeNavBar
        user={currentUser}
        navigation={navigation}
        userPlans={createdPlans}
        invitedPlans={[...acceptedPlans, ...pendingPlans]}
        userLocation={userLocation}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ececec'
  },
});