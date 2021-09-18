import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { Home } from '../screens/Home';
import { SelectFriends } from '../screens/SelectFriends';
import { CreateCustomEvent } from '../screens/CreateCustomEvent';
import { CreateAccount } from '../screens/CreateAccount';
import { LogIn } from '../screens/LogIn';
import { ImportContacts } from '../screens/ImportContacts';
import { ImportContactDetails } from '../screens/ImportContactDetails';
import { SendMessage } from '../screens/SendMessage';
import { SetAvailability } from '../screens/SetAvailability';
import { EditFriends } from '../screens/EditFriends';
import { Contact } from './dataModels';
import { SearchPlace } from '../screens/SearchPlace';
import { PlanDetails } from '../screens/PlanDetails';
import { InvitedPlans } from '../screens/InvitedPlans';
import { InviteeList } from '../screens/inviteList';
// import { Attendees } from '../organisms/attendees';
// import { AcceptDecline } from '../organisms/acceptDecline';
import { User, Plan } from '../models';
import { Profile } from '../screens/Profile';
import { ForgotPassword } from '../screens/ForgotPassword';
import { Welcome } from '../screens/Welcome';

export type RoutePropParams = {
  params: {
    userID: string;
    currentUser: User;
    currentUserPlan: Plan;
    email: string;
    step: string;
    phone: string;
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          initialParams={{ step: 'create' }}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LogIn} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} initialParams={initialParams} options={{ headerShown: false }} />
        <Stack.Screen name="SelectFriends" component={SelectFriends} options={{ headerShown: false }} />
        <Stack.Screen name="CreateCustomEvent" component={CreateCustomEvent} options={{ headerShown: false }} />
        <Stack.Screen name="ImportContacts" component={ImportContacts} options={{ headerShown: false }} />
        <Stack.Screen name="ImportContactDetails" component={ImportContactDetails} options={{ headerShown: false }} />
        <Stack.Screen name="SendMessage" component={SendMessage} options={{ headerShown: false }} />
        <Stack.Screen name="SetAvailability" component={SetAvailability} options={{ headerShown: false }} />
        <Stack.Screen name="EditFriends" component={EditFriends} options={{ headerShown: false }} />
        <Stack.Screen name="SearchPlace" component={SearchPlace} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="PlanDetails" component={PlanDetails} options={{ headerShown: false }} />
        <Stack.Screen name="InvitedPlans" component={InvitedPlans} options={{ headerShown: false }} />
        <Stack.Screen name="InviteeList" component={InviteeList} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />

        {/* <Stack.Screen name="Attendees" component={Attendees} options={{ headerShown: false }} />
        <Stack.Screen name="AcceptDecline" component={AcceptDecline} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
