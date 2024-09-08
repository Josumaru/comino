import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { getHistory } from "@/lib/supabase/supabase";
import { Image } from "expo-image";
import Button from "../common/Button";
import { TouchableOpacity } from "react-native";
import ColoredTitle from "../common/ColoredTitle";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface LastReadProps {
  onRefresh: boolean;
  history: HistoryParams[];
}

const LastRead = ({ onRefresh, history }: LastReadProps) => {
  const [lastIndex, setLastIndex] = useState<number>(-1);
  const router = useRouter();

  const fetchHistory = async () => {
    if (history) {
      setLastIndex(history.length - 1);
    }
  };
  useEffect(() => {
    fetchHistory();
  }, [history]);

  return (
    lastIndex != -1 && (
      <View className="p-5 w-full">
        <TouchableOpacity className="pb-5 flex-row items-end justify-between">
          <ColoredTitle
            firstText="Continue"
            secondText="Reading"
            type="secondPrimary"
          />
          <View className="flex-row items-end justify-end">
            <Text className="font-regular text-gray-500">See more</Text>
            {/* <Ionicons name={"chevron-forward-outline"} size={12}/> */}
          </View>
        </TouchableOpacity>
        <View className="flex-row gap-2">
          <View>
            <Image
              source={history[lastIndex].cover}
              style={{ height: 192, width: 128, borderRadius: 8 }}
            />
          </View>
          <View className="flex-1 justify-between">
            <View className="justify-between">
              <Text className="font-semibold text-xl text-wrap line-clamp-4 flex-1 w-full overflow-ellipsis">
                {history[lastIndex].title}
              </Text>
              <View className="flex-row gap-2 flex-1">
                <Text className="font-regular opacity-50">
                  Ch. {history[lastIndex].chapter}
                </Text>
                <Text className="font-regular opacity-50">
                  Vol. {history[lastIndex].volume}
                </Text>
              </View>
              <Text className="font-regular text-gray-800">
                  {history[lastIndex].author}
                </Text>
              <View></View>
            </View>
            <View>
              <Text className="font-regular text-xl text-primary-500">{Math.ceil(history[lastIndex].current_page / history[lastIndex].pages * 100)}%</Text>
              <View className="">
                <View
                  className="bg-primary-100 rounded-xl mb-1"
                  style={{ width: "100%", height: 5 }}
                ></View>
                <View
                  className="bg-primary-500 rounded-xl mb-1 absolute"
                  style={{ width: `${Math.ceil(history[lastIndex].current_page / history[lastIndex].pages * 100)}%`, height: 5 }}
                ></View>
              </View>
              <TouchableOpacity className="bg-primary-500 min-h-12  flex justify-center items-center rounded-lg border border-primary-600" onPress={()=>router.push({pathname: "/read/[id]", params: {id: history[lastIndex].chapter_id!}})}>
                <Text className="font-semibold text-xl text-white">Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  );
};

export default LastRead;
