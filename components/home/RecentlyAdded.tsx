import { View, Text } from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { Manga } from "mangadex-full-api";
import { getCover, getRecentlyAdded } from "@/lib/mangadex/mangadex";
import { ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import ColoredTitle from "../common/ColoredTitle";

interface RecentlyAddedProps {
  bottom?: boolean;
  onRefresh: number;
}

const RecentlyAdded: React.FC<RecentlyAddedProps> = ({
  bottom = false,
  onRefresh,
}) => {
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [mangaCover, setMangaCover] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const fetchManga = async () => {
    setIsLoading(true);
    try {
      const response = await getRecentlyAdded();
      for (let i = 0; i < response.length; i++) {
        const fileName = await response[i].getCovers();
        const cover = await getCover({
          id: response[i].id,
          fileName: fileName[0].fileName,
          size: 256,
        });
        setMangaCover((prevState) => [...prevState, cover]);
        setMangaList((precState) => [...precState, response[i]]);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setMangaList([]);
    setMangaList([]);
    fetchManga();
  }, [onRefresh]);
  return (
    <View style={{ paddingBottom: bottom ? 100 : 0 }}>
      <View className="mx-5">
        <ColoredTitle
          firstText="Recently"
          secondText="Added"
          type="firstPrimary"
        />
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View className="flex mt-5 px-5 gap-2 flex-row">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <View key={index}>
                  <View
                    style={{
                      width: 128,
                      height: 192,
                      backgroundColor: "#FFFFFF50",
                      borderRadius: 8,
                    }}
                  />
                  <Text>{"\n"}</Text>
                </View>
              ))
            : mangaList.map((manga, index) => (
                <TouchableOpacity
                  key={index}
                  style={{ width: 128 }}
                  onPress={() =>
                    router.push({
                      pathname: "/detail/[id]",
                      params: { id: manga.id },
                    })
                  }
                  activeOpacity={0.8}
                >
                  <Image
                    cachePolicy={"disk"}
                    source={mangaCover[index]}
                    style={{
                      width: 128,
                      height: 192,
                      backgroundColor: "#FFFFFF50",
                      borderRadius: 8,
                    }}
                  />
                  <Text className="text-black dark:text-white overflow-clip line-clamp-2 font-regular">
                    {manga.localTitle}
                  </Text>
                </TouchableOpacity>
              ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default RecentlyAdded;
