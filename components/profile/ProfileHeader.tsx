import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { TouchableOpacity } from "react-native";
import { getCurrentUser, supabase } from "@/lib/supabase/supabase";

interface ProfileHeaderProps {
  history: HistoryParams[];
}

const ProfileHeader = ({ history }: ProfileHeaderProps) => {
  const user = useAppSelector((state) => state.user.value);
  const [date, setDate] = useState<Date>();
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data) {
        setDate(new Date(data.user?.created_at!));
      }
    };
    fetchUser();
  }, []);
  return (
    <View className="flex-row m-5 gap-5 items-center justify-center">
      <View className="items-center justify-center w-32 h-32 bg-[#000000] rounded-full">
        <Text className="text-white font-regular text-3xl">
          {user?.username![0].toUpperCase()}
        </Text>
      </View>
      <View className="justify-center flex-1">
        <Text className="font-regular text-2xl">{user?.username}</Text>
        <View className="flex-1 flex-row justify-between items-center gap-5">
          <View className="items-end justify-center flex-row">
            <Text className="font-regular text-center text-2xl">
              {history.length}
            </Text>
            <Text className="font-regular text-xs px-1 color-[#00000050]">
              Ch
            </Text>
          </View>
          <View className="items-end justify-center flex-row">
            <Text className="font-regular text-2xl">
              {history.reduce((total, page) => total + page.current_page, 0)}
            </Text>
            <Text className="font-regular text-xs px-1 color-[#00000050]">
              Pages
            </Text>
          </View>
          <View className="items-end justify-center flex-row">
            <Text className="font-regular text-2xl">{date ? new Date().getDate() - date.getDate() : ""}</Text>
            <Text className="font-regular text-xs px-1 color-[#00000050]">
              Days
            </Text>
          </View>
        </View>
        {/* <View className="w-full flex-row justify-between">
          <Text className="font-regular dark:text-[#FFFFFF] opacity-70">
            Beginer
          </Text>
          <Text className="font-regular dark:text-[#FFFFFF] opacity-30">
            129 PTS
          </Text>
        </View> */}
        <View className="relative mt-1">
          {/* <View className="w-full bg-primary-100 h-2 rounded-md absolute" />
          <View
            className=" bg-primary-500 h-2 rounded-md absolute"
            style={{ width: "90%" }}
          /> */}
          <TouchableOpacity className="bg-primary-500 min-h-12 flex justify-center items-center rounded-lg border border-primary-600">
            <Text className="font-semibold text-xl text-white">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
