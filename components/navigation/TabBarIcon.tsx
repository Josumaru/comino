import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";

type Props = {
  image: ImageSourcePropType;
  color: string;
  title: string;
  focused: boolean;
};
const TabBarIcon = (props: Props) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={props.image}
        resizeMode="contain"
        tintColor={props.color}
        className="w-6 h-6"
      />
      <Text className={`${props.focused ? "font-semibold" : "font-regular"} text-xs`}style={{ color: props.color }}>
        {props.title}
      </Text>
    </View>
  );
};

export default TabBarIcon;
