import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import IconConstants from "@/constants/images/IconConstants";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  
  return (
    <View>
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        className="absolute bottom-0 w-full justify-between flex-row rounded-t-[35px] p-4 overflow-hidden"
        intensity={100}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          // if (!route.name.includes("(tabs)")) return null;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              className="flex-1"
              onLongPress={onLongPress}
              key={index}
            >
              <View style={{ backgroundColor: isFocused? "#03d383" : "transparent" }} className=" rounded-3xl p-3 flex-row items-center justify-center flex-1">
                <Image source={IconConstants[label.toString().toLocaleLowerCase() as Label]} className="w-6 h-6 z-20" tintColor={isFocused ? "#FFFFFF" : "#03d383"}/>
                <Text className="font-regular text-base text-center text-white">
                  {isFocused? label.toString() : ""}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
};

export default TabBar;