import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "Lexend-Black": require("@/assets/fonts/Lexend-Black.ttf"),
    "Lexend-Bold": require("@/assets/fonts/Lexend-Bold.ttf"),
    "Lexend-ExtraBold": require("@/assets/fonts/Lexend-ExtraBold.ttf"),
    "Lexend-ExtraLight": require("@/assets/fonts/Lexend-ExtraLight.ttf"),
    "Lexend-Light": require("@/assets/fonts/Lexend-Light.ttf"),
    "Lexend-Medium": require("@/assets/fonts/Lexend-Medium.ttf"),
    "Lexend-Regular": require("@/assets/fonts/Lexend-Regular.ttf"),
    "Lexend-SemiBold": require("@/assets/fonts/Lexend-SemiBold.ttf"),
    "Lexend-Thin": require("@/assets/fonts/Lexend-Thin.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const screen = ["index", "(tabs)", "+not-found"];
  const option = { headerShown: false };

  return (
      <Stack>
        {screen.map((screenName) => <Stack.Screen key={screenName} name={screenName} options={option}/>)}
      </Stack>
  );
}