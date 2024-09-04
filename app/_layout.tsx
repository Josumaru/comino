import { useFonts } from "expo-font";
import { Stack, Tabs } from "expo-router";
import { Text } from "moti";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import React, { useEffect } from "react";
import "../global.css";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
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
      // SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "ios",
            }}
          >
            <Stack.Screen name="index" options={{ title: "" }} />
            <Stack.Screen name="(auth)" options={{ title: "" }} />
            <Stack.Screen name="(tabs)" options={{ title: "" }} />
            <Stack.Screen name="detail/[id]" options={{ title: "" }} />
            <Stack.Screen name="read/[id]" options={{ title: "" }} />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
