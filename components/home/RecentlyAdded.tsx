import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Manga } from "mangadex-full-api";
import { getCover, getRecentlyAdded } from "@/lib/mangadex/mangadex";
import { ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const RecentlyAdded = () => {
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [mangaCover, setMangaCover] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const fetchManga = async () => {
    const response = await getRecentlyAdded();
    for (let i = 0; i < response.length; i++) {
      const fileName = await response[i].getCovers();
      const cover = await getCover({id:response[i].id, fileName: fileName[0].fileName, size: 512});
      setMangaCover((prevState) => [...prevState, cover]);
      setMangaList((precState) => [...precState, response[i]]);
    }
  };
  useEffect(() => {
    setMangaList([]);
    setMangaList([]);
    fetchManga();
    setIsLoading(false);
  }, []);
  return (
    <View className="pb-24">
      <Text className="text-black dark:text-white z-20 mt-2 mx-5 font-semibold text-2xl">
        Popular Titles
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View className="flex mt-5 px-5 gap-2 flex-row">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <View key={index}>
                <Image
                  src={""}
                  className="h-48 w-32 rounded-lg bg-[#FFFFFF50]"
                />
                <Text>{"\n"}</Text>
              </View>
            ))
          ) : (
            mangaList.map((manga, index) => (
              <TouchableOpacity
                key={index}
                className="w-32"
                onPress={() =>
                  router.push({
                    pathname: "/detail/[id]",
                    params: { id: manga.id },
                  })
                }
                activeOpacity={0.8}
              >
                <Image
                  src={mangaCover[index]}
                  className="h-48 w-32 rounded-lg bg-[#FFFFFF50]"
                />
                <Text className="text-black dark:text-white overflow-clip line-clamp-2 font-regular">
                  {manga.localTitle}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default RecentlyAdded;
