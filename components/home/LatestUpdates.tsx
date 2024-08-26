import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import TextConstants from "@/constants/strings/TextConstants";
import { Chapter, Manga } from "mangadex-full-api";
import { getLatestUpdate } from "@/lib/mangadex/mangadex";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addManga, setManga } from "@/lib/redux/features/manga/mangaSlice";
import { formatTime } from "@/lib/utils/timeFormater";
import { BlurView } from "expo-blur";
import ColoredTitle from "../common/ColoredTitle";

const LatestUpdate = () => {
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [mangaCover, setMangaCover] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const manga = useAppSelector((state) => state.manga);
  const dispatch = useAppDispatch();

  const fetchManga = async () => {
    setIsLoading(true);
    const latestUpdate = await getLatestUpdate();
    for (let i = 0; i < latestUpdate.length; i++) {
      const cover = await latestUpdate[i].getCovers();
      setMangaCover((prevState) => [...prevState, cover[0].url]);
      setMangaList((precState) => [...precState, latestUpdate[i]]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setMangaList([]);
    fetchManga();
  }, []);



  return (
    <View>
      <View className="z-20 mt-2 mx-5">
        <ColoredTitle firstText={TextConstants.latestUpdate.split(" ")[0]} secondText={TextConstants.latestUpdate.split(" ")[1]} type="secondPrimary"/>
      </View>
      <View>
        {isLoading ? (
          Array.from({length: 3}).map((_, index) => (
            <View key={index} className="h-32 bg-[#FFFFFF50] flex-1 rounded-lg mx-5 my-1"></View>
          ))
        ) : (
          mangaList.map((manga, index) => {
            const currentTime = new Date();
            const updateTime = new Date(manga.updatedAt);
            const diffTime = Math.abs(
              currentTime.getTime() - updateTime.getTime()
            );
            const formatedTime = formatTime(diffTime);

            return (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/detail/[id]",
                    params: { id: manga.id },
                  })
                }
                activeOpacity={0.7}
                key={index}
              >
                <BlurView
                  className="mx-5 my-1 flex flex-row gap-5 rounded-lg bg-opacity-10 bg-gray-100 blur-lg overflow-hidden"
                  intensity={70}
                  experimentalBlurMethod="dimezisBlurView"
                >
                  <View className="flex-1 flex-row gap-2">
                    <Image
                      source={{ uri: mangaCover[index] }}
                      resizeMode="cover"
                      className="rounded-lg z-20 w-20 h-32 bg-[#FFFFFF50]"
                    />
                    <View className="flex-1">
                      <Text className="text-gray-400">{formatedTime}</Text>
                      <Text className="text-xl font-regular overflow-hidden text-black dark:text-white text-wrap line-clamp-2 w-full">
                        {manga.localTitle}
                      </Text>
                      <View className="flex flex-row gap-1">
                        {manga.tags.slice(0, 1).map((tag, index) => (
                          <View key={index}>
                            <Text className="text-gray-400 font-regular text-sm">
                              {tag.localName}
                            </Text>
                          </View>
                        ))}
                        <Text className="text-sm font-regular overflow-hidden text-gray-400 text-wrap line-clamp-2">
                          {` - ${manga.contentRating.replace(
                            manga.contentRating[0][0],
                            manga.contentRating[0][0].toUpperCase()
                          )}`}
                        </Text>
                      </View>
                      <Text className="text-black dark:text-white font-regular">
                        {manga.originalLanguage.toUpperCase()}
                      </Text>
                      <View className="flex flex-row gap-1">
                        <Text className="text-black dark:text-white font-regular">
                          {manga.lastChapter}
                        </Text>
                      </View>
                    </View>
                  </View>
                </BlurView>
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </View>
  );
};

export default LatestUpdate;
