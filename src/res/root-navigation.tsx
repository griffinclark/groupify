// https://devlinduldulao.pro/react-native-typescript-and-react-navigation-v5-setup/
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import CreateAccount from './../screens/CreateAccount';
import MyProfile from './../screens/MyProfile';
import AddFriends from './../screens/AddFriends';
import Test from './../screens/Test';
import Home from "../screens/Home";


const Stack = createStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      {/* TODO the default screen needs to change based on whether a user is logged in or not */}
      <Stack.Navigator initialRouteName="Welcome"> 
        <Stack.Screen name="Welcome" component={Welcome}  options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="CreateAccount" component={CreateAccount}  options={{ headerShown: false }}/>
        <Stack.Screen name="MyProfile" component={MyProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="AddFriends" component={AddFriends} options={{ headerShown: false }}/>
        <Stack.Screen name="Test" component={Test} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="BuildEvent" component={Home} options={{ headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
