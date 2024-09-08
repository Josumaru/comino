import { View, Text, TouchableOpacity, Image } from "react-native";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { Author, Manga } from "mangadex-full-api";
import { capitalizeFirstLetter } from "@/lib/utils/capitalizeFisrtLetter";
import IconConstants from "@/constants/images/IconConstants";
import {
  addArchive,
  getArchive,
  getHistory,
  removeArchive,
} from "@/lib/supabase/supabase";
import { useAppSelector } from "@/lib/redux/hooks";

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
  const [saved, setIsSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user.value);

  const handleAdd = async () => {
    setIsLoading(true);
    const data = await addArchive({
      title: manga?.localTitle,
      created_at: new Date(),
      manga_id: manga?.id,
      user_id: user?.id ?? "",
      cover: cover,
      author: author.name,
      rating: statistic?.rating.average ?? 0,
      synopsis: manga?.description.localString,
    });
    if (data) {
      setIsSaved(true);
    }
    setIsLoading(false);
  };
  const handleRemove = async () => {
    setIsLoading(true);
    const data = await removeArchive(user?.id!, manga.id);
    if (data) {
      setIsSaved(false);
    }
    setIsLoading(false);
  };
  const fetchData = async () => {
    setIsLoading(true);
    const data = await getArchive(user!.id);
    if (data.data) {
      console.log(data.data);
      setIsSaved(data.data.some((item) => item.manga_id === manga?.id));
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [manga]);
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
        {!saved ? (
          <TouchableOpacity
            disabled={isLoading}
            className="bg-primary-500 min-h-12 flex-row gap-2 justify-center items-center rounded-lg border border-primary-600"
            onPress={handleAdd}
          >
            <Image
              source={IconConstants.addArchive}
              className="h-6 w-6"
              tintColor={"white"}
            />
            <Text className="font-semibold text-xl text-white">
              Add to List
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={isLoading}
            className="bg-primary-500 min-h-12 flex-row gap-2 justify-center items-center rounded-lg border border-primary-600"
            onPress={handleRemove}
          >
            <Image
              source={IconConstants.removeArchive}
              className="h-6 w-6"
              tintColor={"white"}
            />
            <Text className="font-semibold text-xl text-white">
              Remove from List
            </Text>
          </TouchableOpacity>
        )}
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
