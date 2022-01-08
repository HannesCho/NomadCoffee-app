import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Photo from "../screens/Photo";
import Profile from "../screens/Profile";
import Home from "../screens/Home";
import Search from "../screens/Search";
import { Image, View } from "react-native";
import Comments from "../screens/Comments";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          borderBottomColor: "rgba(255, 255, 255, 0.3)",
          shadowColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: "black",
        },
      }}
    >
      {screenName === "Home" ? (
        <Stack.Screen
          name={"Home"}
          component={Home}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 120,
                  height: 40,
                }}
                resizeMode="contain"
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen
          name={"Search"}
          component={Search}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 120,
                  height: 40,
                }}
                resizeMode="contain"
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Camera" ? (
        <Stack.Screen
          name={"Camera"}
          component={View}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 120,
                  height: 40,
                }}
                resizeMode="contain"
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
    </Stack.Navigator>
  );
}
