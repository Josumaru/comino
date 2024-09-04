import { View, Text, ImageSourcePropType } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

interface SettingButtonProps {
    icon: ImageSourcePropType;
    title: string;
    value?: string;
    onPress?: () => void;
}

const SettingButton: React.FC<SettingButtonProps> = ({icon, title, value, onPress}) => {
  return (
    <TouchableOpacity
      className="flex-row items-center p-5 rounded-lg mt-1 bg-[#ffffff4f] justify-between"
      activeOpacity={0.75}
      onPress={onPress}
    >
      <View className="flex-row gap-1 items-center">
        <Image
          source={icon}
          style={{ height: 24, width: 24 }}
        />
        <Text className="font-regular">{title}</Text>
      </View>
      <View className="flex-row">
        <Text className="font-regular">{value}</Text>
        <Ionicons name="chevron-forward" size={16} />
      </View>
    </TouchableOpacity>
  );
};

export default SettingButton;
