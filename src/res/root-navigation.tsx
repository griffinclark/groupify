import React from 'react';
import * as Analytics from 'expo-firebase-analytics';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { Home } from '../screens/Home';
import { PlanInvite } from '../screens/PlanInvite';
import { CreateAccount } from '../screens/CreateAccount';
import { LogIn } from '../screens/LogIn';
import { ImportContacts } from '../screens/ImportContacts';
import { ImportContactDetails } from '../screens/ImportContactDetails';
import { SendMessage } from '../screens/SendMessage';
import { SetAvailability } from '../screens/SetAvailability';
import { EditFriends } from '../screens/EditFriends';
import { Contact } from './dataModels';
import { PlanMap } from '../screens/PlanMap';
import { PlanDetails } from '../screens/PlanDetails';
import { PlanCreate } from '../screens/PlanCreate';
import { InvitedPlans } from '../screens/InvitedPlans';
import { InviteeList } from '../screens/inviteList';
import { ConfirmPlan } from '../screens/ConfirmPlan';
import { User, Plan } from '../models';
import { Profile } from '../screens/Profile';
import { ForgotPassword } from '../screens/ForgotPassword';
import { Welcome } from '../screens/Welcome';
import { PlanIndex } from '../screens/PlanIndex';
import { EditPlan } from '../screens/EditPlan';
import { ActivitySelector } from '../screens/ActivitySelector';
import { ActivityResults } from '../screens/ActivityResults';

export type RoutePropParams = {
  params: {
    userID: string;
    currentUser: User;
    currentUserPlan: Plan;
    step: string;
    phone: string;
    invitedPlans: Plan[];
    userPlans: Plan[];
    option: string;
    accountCreated: string;
    last: string;
    activity: string;
    data: {
      eventData: {
        friends: User[];
        contacts: Contact[];
        uuid: string;
        title: string;
        imageURL: string;
        description: string;
        tags: string[];
        date: string;
        time: string;
        location: string;
        showImage: string;
        placeId: string;
        message: string;
      };
    };
  };
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
  console.log('Initial route: ' + initialRoute);

  return (
    <NavigationContainer
      onReady={async () => {
        await Analytics.setCurrentScreen(initialRoute);
        await Analytics.logEvent(`Page_${initialRoute}`, {});
      }}
      onStateChange={async (state) => {
        if (!state) return null;
        const newRoute = state.routes[state.routes.length - 1].name;
        if (typeof newRoute === 'string') {
          await Analytics.setCurrentScreen(newRoute);
          await Analytics.logEvent(`Page_${newRoute}`, {});
        }
      }}
    >
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ animationEnabled: false }}>
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          initialParams={{ step: 'create' }}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LogIn} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} initialParams={initialParams} options={{ headerShown: false }} />
        <Stack.Screen name="PlanInvite" component={PlanInvite} options={{ headerShown: false }} />
        <Stack.Screen name="PlanCreate" component={PlanCreate} options={{ headerShown: false }} />
        <Stack.Screen name="ImportContacts" component={ImportContacts} options={{ headerShown: false }} />
        <Stack.Screen name="ImportContactDetails" component={ImportContactDetails} options={{ headerShown: false }} />
        <Stack.Screen name="SendMessage" component={SendMessage} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmPlan" component={ConfirmPlan} options={{ headerShown: false }} />
        <Stack.Screen name="SetAvailability" component={SetAvailability} options={{ headerShown: false }} />
        <Stack.Screen name="EditFriends" component={EditFriends} options={{ headerShown: false }} />
        <Stack.Screen name="PlanMap" component={PlanMap} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="PlanDetails" component={PlanDetails} options={{ headerShown: false }} />
        <Stack.Screen name="InvitedPlans" component={InvitedPlans} options={{ headerShown: false }} />
        <Stack.Screen name="InviteeList" component={InviteeList} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="ViewPlans" component={PlanIndex} options={{ headerShown: false }} />
        <Stack.Screen name="EditPlan" component={EditPlan} options={{ headerShown: false }} />
        <Stack.Screen name="ActivitySelector" component={ActivitySelector} options={{ headerShown: false }} />
        <Stack.Screen name="ActivityResults" component={ActivityResults} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
