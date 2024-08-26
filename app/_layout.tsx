import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import React from "react";
import IconsConstants from "@/constants/images/IconConstants";
import TabConstants from "@/constants/strings/Tabs";
import TabBar from "@/components/navigation/TabBar";
import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const tabs = [
    {
      name: TabConstants.home,
      icon: IconsConstants.home,
    },
    {
      name: TabConstants.discover,
      icon: IconsConstants.discover,
    },
    {
      name: TabConstants.profile,
      icon: IconsConstants.profile,
    },
  ];
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

  return (
    <Provider store={store}>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        {tabs.map((tab, index) => (
          <Tabs.Screen
            key={index}
            name={`(tabs)/${tab.name.toLocaleLowerCase()}`}
            options={{
              title: tab.name,
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <tab.icon focused={focused} color={focused ? "red" : "blue"} />
              ),
            }}
          />
        ))}
        <Tabs.Screen
          name={`detail/[id]`}
          options={{
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name={`read/[id]`}
          options={{
            headerShown: false,
          }}
        />
      </Tabs>
    </Provider>
  );
}
