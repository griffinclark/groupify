import React from 'react';
import { StatusBar } from 'react-native';
import * as Analytics from 'expo-firebase-analytics';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { Home } from '../screens/Home';
import { LogIn } from '../screens/LogIn';
import { ImportContacts } from '../screens/ImportContacts';
import { ImportContactDetails } from '../screens/ImportContactDetails';
import { SendMessage } from '../screens/SendMessage';
import { SetAvailability } from '../screens/SetAvailability';
import { EditFriends } from '../screens/EditFriends';
import { GoogleLocation, UserLocation } from './dataModels';
import { PlanDetails } from '../screens/PlanDetails';
import { PlanCreate } from '../screens/PlanCreate';
import { PlanInvite } from '../screens/PlanInvite';
import { PlanSuccess } from '../screens/PlanSuccess';
import { InvitedPlans } from '../screens/InvitedPlans';
import { InviteeList } from '../screens/inviteList';
import { User, Plan } from '../models';
import { Profile } from '../screens/Profile';
import { ForgotPassword } from '../screens/ForgotPassword';
import { Welcome } from '../screens/Welcome';
import { PlanIndex } from '../screens/PlanIndex';
import { EditPlan } from '../screens/EditPlan';
import { OldActivitySelector } from '../screens/ActivitySelector';
import { SelectorMenu } from '../screens/SelectorMenu';
import { PlanMap } from '../screens/PlanMap';
import { TakeoverSearch } from '../screens/TakeoverSearch';
import { ContactList } from '../atoms/ContactList';
import { phoneVerificationScreen } from '../screens/phoneVerificationScreen';
import { createAccountForm } from '../screens/createAccountForm';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ValidateUser } from '../screens/ValidateUser';
import { PlanData } from '../res/dataModels';

export type RoutePropParams = {
  params: {
    userID: string;
    currentUser: User;
    currentUserPlan: Plan;
    step: string;
    phone: string;
    userLocation: UserLocation;
    invitedPlans: Plan[];
    userPlans: Plan[];
    option: string;
    accountCreated: string;
    last: string;
    activity: string;
    plan: Plan;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    place: any;
    data: {
      planData: PlanData;
      activitySearchData: {
        tempUserLocationQuery: string;
        tempUserLocation: UserLocation;
        placesUserWantsToGoQuery: string;
        placesUserWantsToGoResults: GoogleLocation[];
        fromButton: boolean;
      };
    };
  };
};

export type AllPlans = {
  all: Plan[];
  created: Plan[];
  pending: Plan[];
  accepted: Plan[];
  past: Plan[];
};

export interface StackProps {
  navigation?: StackNavigationProp<ParamListBase>;
  route?: ParamListBase;
}

interface RootProps {
  initialRoute: string;
  initialParams?: Record<string, unknown>;
}

const Stack = createStackNavigator();
export const RootNavigation: React.FC<RootProps> = ({ initialRoute, initialParams }: RootProps) => {
  return (
    <NavigationContainer
      onReady={async () => {
        await Analytics.setCurrentScreen(initialRoute, initialRoute);
        await Analytics.logEvent(`Page_${initialRoute}`, {});
      }}
      onStateChange={async (state) => {
        if (!state) return null;
        const newRoute = state.routes[state.routes.length - 1].name;
        if (typeof newRoute === 'string') {
          await Analytics.setCurrentScreen(newRoute, newRoute);
          await Analytics.logEvent(`Page_${newRoute}`, {});
        }
      }}
    >
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ animationEnabled: true, gestureResponseDistance: { horizontal: 20 } }}
      >
        <Stack.Screen name="Login" component={LogIn} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} initialParams={initialParams} options={{ headerShown: false }} />
        <Stack.Screen name="PlanInvite" component={PlanInvite} options={{ headerShown: false }} />
        <Stack.Screen name="PlanCreate" component={PlanCreate} options={{ headerShown: false }} />
        <Stack.Screen name="ImportContacts" component={ImportContacts} options={{ headerShown: false }} />
        <Stack.Screen name="ImportContactDetails" component={ImportContactDetails} options={{ headerShown: false }} />
        <Stack.Screen name="SendMessage" component={SendMessage} options={{ headerShown: false }} />
        <Stack.Screen name="SetAvailability" component={SetAvailability} options={{ headerShown: false }} />
        <Stack.Screen name="EditFriends" component={EditFriends} options={{ headerShown: false }} />
        <Stack.Screen name="PlanMap" component={PlanMap} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="PlanDetails" component={PlanDetails} options={{ headerShown: false }} />
        <Stack.Screen name="InvitedPlans" component={InvitedPlans} options={{ headerShown: false }} />
        <Stack.Screen name="InviteeList" component={InviteeList} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="ViewPlans" component={PlanIndex} options={{ headerShown: false }} />
        <Stack.Screen name="EditPlan" component={EditPlan} options={{ headerShown: false }} />
        <Stack.Screen name="ActivitySelector" component={OldActivitySelector} options={{ headerShown: false }} />
        <Stack.Screen
          name="SelectorMenu"
          component={SelectorMenu}
          initialParams={initialParams}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="TakeoverSearch" component={TakeoverSearch} options={{ headerShown: false }} />
        <Stack.Screen name="ContactList" component={ContactList} options={{ headerShown: false }} />
        <Stack.Screen name="PlanSuccess" component={PlanSuccess} options={{ headerShown: false }} />
        <Stack.Screen name="VerifyPhone" component={phoneVerificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="createAccountForm" component={createAccountForm} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ValidateUser" component={ValidateUser} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
