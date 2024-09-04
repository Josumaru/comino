import { Alert, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import IconConstants from "@/constants/images/IconConstants";
import { signOut } from "@/lib/supabase/supabase";
import { useRouter } from "expo-router";

const LogoutButton = () => {
  const router = useRouter();
  const handlePress = async () => {
    const { error } = await signOut()
    if(error){
      Alert.alert('Error');
    } else {
      router.replace("/(auth)/sign-in")
    }
  };
  return (
    <TouchableOpacity
      className="flex-row gap-1 bg-red-500 border-1 border-red-600 items-center justify-center p-5 rounded-lg my-1"
      activeOpacity={0.45}
      onPress={handlePress}
    >
      <Image
        source={IconConstants.logout}
        style={{ height: 24, width: 24 }}
        tintColor={"white"}
      />
      <Text className="font-regular text-white">Log Out</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;
