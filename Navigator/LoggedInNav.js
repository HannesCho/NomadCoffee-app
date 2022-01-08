import React from "react";
import MyProfile from "../screens/MyProfile";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function LoggedInNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: true,
        headerBackTitleVisible: false,
        headerTitle: "",
        headerTransparent: true,
      }}
    >
      <Stack.Screen name="MyProfile" component={MyProfile}></Stack.Screen>
    </Stack.Navigator>
  );
}
