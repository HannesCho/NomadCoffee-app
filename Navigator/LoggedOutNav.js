import React from "react";
import LogIn from "../screens/LogIn";
import SignIn from "../screens/SignIn";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: true,
        headerBackTitleVisible: false,
        headerTitle: "",
        headerTransparent: true,
      }}
    >
      <Stack.Screen name="LogIn" component={LogIn}></Stack.Screen>
      <Stack.Screen name="SignIn" component={SignIn}></Stack.Screen>
    </Stack.Navigator>
  );
}
