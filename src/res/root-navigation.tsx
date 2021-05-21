// https://devlinduldulao.pro/react-native-typescript-and-react-navigation-v5-setup/
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import React from 'react';
import Welcome from 'screens/Welcome';
import { Home } from 'screens/Home';
import SelectFriends from 'screens/SelectFriends';
import { CreateCustomEvent } from 'screens/CreateCustomEvent';
import { EventDetails } from 'screens/EventDetails';
import { CreateAccount } from 'screens/CreateAccount';
import { LogIn } from 'screens/LogIn';
import { ImportContacts } from 'screens/ImportContacts';
import SendMessage from 'screens/SendMessage';

export type RootStackParamList = {
  CreateAccount: {
    step: string;
    email: string;
  };
  params: {
    Login: string;
  };
  navigate: (ev: string) => void;
  push: (ev: string, e: { email: string; step: string }) => void;
};

export type RoutePropParams = {
  params: {
    email: string;
    step: string;
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
      {/* TODO the default screen needs to change based on whether a user is logged in or not */}
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
        <Stack.Screen name="EventDetails" component={EventDetails} options={{ headerShown: false }} />
        <Stack.Screen name="ImportContacts" component={ImportContacts} options={{ headerShown: false }} />
        <Stack.Screen name="SendMessage" component={SendMessage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
