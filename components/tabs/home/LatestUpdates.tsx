import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import TextConstants from "@/constants/strings/TextConstants";
import { Manga } from "mangadex-full-api";
import { getLatestUpdate } from "@/lib/mangadex/mangadex";

const LatestUpdate = () => {
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [mangaCover, setMangaCover] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);

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
    fetchManga();
  }, []);

  return (
    <View>
      <Text className="text-black dark:text-white z-20 mt-2 mx-5 font-semibold text-2xl">
        {TextConstants.latestUpdate}
      </Text>
      <View>
        {isLoading ? (
          <Text>Loading</Text>
        ) : (
          mangaList.map((manga, index) => {
            return (
              <View key={index} className="m-5 flex flex-row gap-5">
                <View className="flex-1 flex-row gap-2">
                  <Image
                    source={{ uri: mangaCover[index] }}
                    className="rounded-lg z-20 w-20 h-20"
                  />
                  <View>
                    <Text className="text-xl font-regular overflow-hidden text-black dark:text-white text-wrap line-clamp-2">
                      {manga.localTitle}
                    </Text>
                    {manga.tags.slice(0, 3).map((tag, index) => (
                      <View key={index}>
                        <Text className="text-gray-400 font-regular text-sm">
                          {tag.localName}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            );
          })
        )}
      </View>
    </View>
  );
};

export default LatestUpdate;
