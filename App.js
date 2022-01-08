import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useState } from "react";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { darkTheme, lightTheme } from "./theme";
import { ThemeProvider } from "styled-components/native";
import SharedTabNav from "./Navigator/SharedTabNav";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { darkMode, isLoggedInVar, tokenVar } from "./apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const onFinish = () => setLoading(false);
  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/logo.png")];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    Promise.all(...fontPromises, ...imagePromises);
  };
  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    return preloadAssets();
  };
  if (colorScheme === "dark") {
    darkMode(true);
  }
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }
  return (
    <ApolloProvider client={client}>
      <AppearanceProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <NavigationContainer>
            <SharedTabNav isLoggedIn={isLoggedIn} />
          </NavigationContainer>
        </ThemeProvider>
      </AppearanceProvider>
    </ApolloProvider>
  );
}
