import { View, Text } from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import BackgroundConstants from "@/constants/images/BackgroundConstants";
import { useAppSelector } from "@/lib/redux/hooks";

const ProfileBar = () => {
  const user = useAppSelector((state) => state.user.value);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    setCurrentUser(user);

    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, [user]);

  return (
    <View className="mx-5 mt-5 flex flex-row justify-between">
      <View className="flex">
        <Text className="font-regular text-xl">{`Hii, ${currentUser?.username} !👋`}</Text>
        <Text className="font-regular dark:color-white color-gray-500 text-sm">
          {`${greeting}, Kang Han's Sister just released`}
        </Text>
      </View>
      <Image
        cachePolicy={"disk"}
        source={BackgroundConstants.onboardingBackgroundImage}
        className="w-12 h-12 rounded-full"
      />
    </View>
  );
};

export default ProfileBar;