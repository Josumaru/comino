import { View, Text } from "react-native";
import React from "react";

interface ColoredTitleProps {
  firstText: string;
  secondText: string;
  type: "firstPrimary" | "secondPrimary";
}

const ColoredTitle: React.FC<ColoredTitleProps> = ({
  firstText,
  secondText,
  type,
}) => {
  return type === "firstPrimary" ? (
    <View className="flex-row flex gap-2">
      <Text className="text-primary-500 z-20 font-semibold text-2xl">
        {firstText}
      </Text>
      <Text className="text-black dark:text-white z-20 font-semibold text-2xl">
        {secondText}
      </Text>
    </View>
  ) : (
    <View className="flex-row flex gap-2">
      <Text className="text-black dark:text-white z-20 font-semibold text-2xl">
        {firstText}
      </Text>
      <Text className="text-primary-500 z-20 font-semibold text-2xl">
        {secondText}
      </Text>
    </View>
  );
};

export default ColoredTitle;
