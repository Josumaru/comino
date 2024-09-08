import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import TabBar from "@/components/navigation/TabBar";
import IconsConstants from "@/constants/images/IconConstants";
import TabConstants from "@/constants/strings/Tabs";

const TabLayout = () => {
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
      name: TabConstants.archive,
      icon: IconsConstants.archive,
    },
    {
      name: TabConstants.profile,
      icon: IconsConstants.profile,
    },
  ];
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {tabs.map((tab, index) => (
        <Tabs.Screen
          key={index}
          name={`${tab.name.toLocaleLowerCase()}`}
          options={{
            title: tab.name,
            headerShown: false,
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
