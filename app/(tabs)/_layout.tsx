import { Tabs } from "expo-router";
import React from "react";

import TabBarIcon from "@/components/navigation/TabBarIcon";
import IconsConstants from "@/constants/images/IconConstants";
import TabConstants from "@/constants/strings/Tabs";
import TabScreenOptionConstants from "@/constants/TabScreens";
export default function TabLayout() {
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

  return (
    <Tabs
      screenOptions={TabScreenOptionConstants}
    >
      {tabs.map((tab, index) => (
        <Tabs.Screen
          key={index}
          name={tab.name.toLocaleLowerCase()}
          options={{
            title: tab.name,
            headerShown: false,

            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                image={tab.icon}
                color={color}
                focused={focused}
                title={tab.name}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
