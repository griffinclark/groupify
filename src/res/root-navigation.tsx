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
import ImportContacts from "../screens/ImportContacts";


const Stack = createStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      {/* TODO the default screen needs to change based on whether a user is logged in or not */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Welcome" component={Welcome}  options={{ headerShown: false }}/>
        <Stack.Screen name="MyProfile" component={MyProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="Test" component={Test} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="SelectTags" component={SelectTags} options={{ headerShown: false }}/>
        <Stack.Screen name="SelectFriends" component={SelectFriends} options={{ headerShown: false }}/>
        <Stack.Screen name="ConfirmEvent" component={ConfirmEvent} options={{ headerShown: false }}/>
        <Stack.Screen name="SuggestedEvents" component={SuggestedEvents} options={{ headerShown: false }}/>
        <Stack.Screen name="CreateCustomEvent" component={CreateCustomEvent} options={{ headerShown: false }}/>
        <Stack.Screen name="EventDetails" component={EventDetails} options={{ headerShown: false }}/>
        <Stack.Screen name="ImportContacts" component={ImportContacts} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
