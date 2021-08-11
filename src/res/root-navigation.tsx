import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { Welcome } from '../screens/Welcome';
import { Home } from '../screens/Home';
import { SelectFriends } from '../screens/SelectFriends';
import { CreateCustomEvent } from '../screens/CreateCustomEvent';
import { CreateAccount } from '../screens/CreateAccount';
import { LogIn } from '../screens/LogIn';
import { ImportContacts } from '../screens/ImportContacts';
import { SendMessage } from '../screens/SendMessage';
import { SetAvailability } from '../screens/SetAvailability';
import { EditFriends } from '../screens/EditFriends';
import { Contact } from './dataModels';
import { SearchPlace } from '../screens/SearchPlace';
import { PlanDetails } from '../screens/PlanDetails';
// import { Attendees } from '../organisms/attendees';
// import { AcceptDecline } from '../organisms/acceptDecline';
import { User } from '../models';

export type RoutePropParams = {
  params: {
    userID: string;
    currentUser: User;
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
        fullDate: Date;
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
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
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
        <Stack.Screen name="SendMessage" component={SendMessage} options={{ headerShown: false }} />
        <Stack.Screen name="SetAvailability" component={SetAvailability} options={{ headerShown: false }} />
        <Stack.Screen name="EditFriends" component={EditFriends} options={{ headerShown: false }} />
        <Stack.Screen name="SearchPlace" component={SearchPlace} options={{ headerShown: false }} />
        <Stack.Screen name="PlanDetails" component={PlanDetails} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Attendees" component={Attendees} options={{ headerShown: false }} />
        <Stack.Screen name="AcceptDecline" component={AcceptDecline} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
