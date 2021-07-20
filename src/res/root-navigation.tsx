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
import { Contact } from './dataModels';
import { User } from '../models';

export type RoutePropParams = {
  params: {
    user: User;
    email: string;
    step: string;
    phone: string;
    data: {
      eventData: {
        friends: Contact[];
        uuid: string;
        title: string;
        imageURL: string;
        description: string;
        tags: string[];
        date: string;
        time: string;
        location: string;
        showImage: string;
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
}

const Stack = createStackNavigator();
export const RootNavigation: React.FC<RootProps> = ({ initialRoute }: RootProps) => {
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
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="SelectFriends" component={SelectFriends} options={{ headerShown: false }} />
        <Stack.Screen name="CreateCustomEvent" component={CreateCustomEvent} options={{ headerShown: false }} />
        <Stack.Screen name="ImportContacts" component={ImportContacts} options={{ headerShown: false }} />
        <Stack.Screen name="SendMessage" component={SendMessage} options={{ headerShown: false }} />
        <Stack.Screen name="SetAvailability" component={SetAvailability} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
