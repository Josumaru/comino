import { View, Text, Image } from "react-native";
import React from "react";
import ColoredTitle from "../common/ColoredTitle";
import IconConstants from "@/constants/images/IconConstants";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProfileMenu = () => {
  return (
    <View className="p-5 py-10 w-full">
      <View className="flex-row items-center justify-between">
        <View className="items-center justify-center w-1/3 rounded-lg">
          <TouchableOpacity className="flex justify-center items-center w-full flex-1">
            <View className="flex items-center justify-center">
              <Image source={IconConstants.apps} className="h-9 w-9" />
              <Text className="font-regular ">More Apps</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="items-center justify-center w-1/3 rounded-lg">
          <TouchableOpacity className="flex justify-center items-center w-full flex-1">
            <View className="flex items-center justify-center">
              <Image source={IconConstants.history} className="h-9 w-9" />
              <Text className="font-regular">History</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="items-center justify-center w-1/3 rounded-lg">
          <TouchableOpacity className="flex justify-center items-center w-full flex-1">
            <View className="flex items-center justify-center">
              <Image source={IconConstants.archive} className="h-9 w-9" />
              <Text className="font-regular">My List</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileMenu;
