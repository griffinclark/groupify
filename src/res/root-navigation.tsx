// https://devlinduldulao.pro/react-native-typescript-and-react-navigation-v5-setup/
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Welcome from "../screens/Welcome";
import MyProfile from './../screens/MyProfile';
import Test from './../screens/Test';
import Home from "../screens/Home";
import SelectTags from '../screens/SelectTags';
import SelectFriends from './../screens/SelectFriends';
import ConfirmEvent from './../screens/ConfirmEvent';
import SuggestedEvents from './../screens/SuggestedEvents';
import CreateCustomEvent from "./../screens/CreateCustomEvent";
import EventDetails from "./../screens/EventDetails";
import { CreateAccount } from "../screens/CreateAccount";
import { LogIn } from "../screens/LogIn";

export interface Props { //TODO: interfaces should never have any WTF is the point of typescript otherwise???
  navigation: any;
  route: any;
}
interface RootProps {
  initialRoute: string
}

const Stack = createStackNavigator();

export const RootNavigation = ({initialRoute}: RootProps) => {
  console.log("Initial route: " + initialRoute);
  return (
    <NavigationContainer>
      {/* TODO the default screen needs to change based on whether a user is logged in or not */}
      <Stack.Navigator initialRouteName={initialRoute}> 
        <Stack.Screen name="Welcome" component={Welcome}  options={{ headerShown: false }}/>
        <Stack.Screen name="CreateAccount" component={CreateAccount} initialParams={{ step: 'create' }} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LogIn} options={{ headerShown: false }}/>
        <Stack.Screen name="MyProfile" component={MyProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="Test" component={Test} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="SelectTags" component={SelectTags} options={{ headerShown: false }}/>
        <Stack.Screen name="SelectFriends" component={SelectFriends} options={{ headerShown: false }}/>
        <Stack.Screen name="ConfirmEvent" component={ConfirmEvent} options={{ headerShown: false }}/>
        <Stack.Screen name="SuggestedEvents" component={SuggestedEvents} options={{ headerShown: false }}/>
        <Stack.Screen name="CreateCustomEvent" component={CreateCustomEvent} options={{ headerShown: false }}/>
        <Stack.Screen name="EventDetails" component={EventDetails} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
