import { View, Text, TouchableOpacity, Image } from "react-native";
import { BlurView } from "expo-blur";
import React from "react";
import { Author, Manga } from "mangadex-full-api";
import { capitalizeFirstLetter } from "@/lib/utils/capitalizeFisrtLetter";

interface OverviewProps {
  author: Author;
  manga: Manga;
  cover: string;
  statistic: Statistic;
}

const Overview: React.FC<OverviewProps> = ({
  author,
  manga,
  cover,
  statistic,
}) => {
  return (
    <View className="flex flex-row gap-2 w-full pt-5 pl-5 pr-5">
      <View className="flex-1" style={{ height: 230 }}>
        <Text className="text-wrap overflow-hidden w-full line-clamp-5 text-2xl font-semibold">
          {manga?.localTitle}
        </Text>
        <Text className="text-wrap overflow-hidden w-full line-clamp-2 text-base font-regular color-gray-400">
          {author?.name ? `By ${author?.name}` : ""}
        </Text>
        <Text className="text-wrap overflow-hidden w-full line-clamp-2 text-base font-regular color-gray-700">
          {capitalizeFirstLetter(manga?.status)}
        </Text>
        <Text className="text-wrap overflow-hidden w-full line-clamp-3 flex-1 text-base font-regular color-gray-400">
          {author?.imageUrl}
        </Text>
        <TouchableOpacity className="bg-primary-500 min-h-12 flex justify-center items-center rounded-lg border border-primary-600">
          <Text className="font-semibold text-xl text-white">Read</Text>
        </TouchableOpacity>
      </View>
      <View className="relative">
        <Image
          src={cover}
          className="rounded-lg"
          style={{ width: 150, height: 230 }}
        />
        <BlurView
          className="absolute rounded-md overflow-hidden items-center justify-center right-0 m-2 px-2 z-20"
          intensity={75}
          experimentalBlurMethod="dimezisBlurView"
        >
          <Text className="font-bold color-primary-500 text-xl">
            {statistic?.rating.average?.toString().slice(0, 3)}
          </Text>
        </BlurView>
      </View>
    </View>
  );
};

export default Overview;
