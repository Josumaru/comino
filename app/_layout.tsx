import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Lexend: require("@/assets/fonts/Lexend-Regular.ttf"),
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