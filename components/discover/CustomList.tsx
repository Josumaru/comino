import { View, Text } from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { Manga } from "mangadex-full-api";
import { getCover, getCustomList } from "@/lib/mangadex/mangadex";
import { ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface CustomListProps {
  id: string;
  bottom?: boolean;
  covers?: (cover: string[]) => void;
}

const CustomList: React.FC<CustomListProps> = ({
  id,
  bottom = false,
  covers,
}) => {
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [mangaCover, setMangaCover] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchManga = async () => {
    try {
      setIsLoading(true);
      const response = await getCustomList(id);
      const coverUrls: string[] = [];
      const mangaItems: Manga[] = [];
  
      for (let i = 0; i < response.length; i++) {
        const fileName = await response[i].getCovers();
        const cover = await getCover({id:response[i].id, fileName: fileName![0].fileName, size: 256});
        coverUrls.push(cover);
        mangaItems.push(response[i]);
      }
  
      setMangaCover(coverUrls);
      setMangaList(mangaItems);
  
      if (covers) {
        covers(coverUrls);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    setMangaList([]);
    setMangaList([]);
    fetchManga();
  }, []);
  return (
    <View style={{ paddingBottom: bottom ? 86 : 5 }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View className="flex px-5 gap-2 flex-row">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <View key={index}>
                  <View
                    style={{ width: 128, height: 192, backgroundColor: "#FFFFFF50", borderRadius: 8 }}
                  />
                  <Text>{"\n"}</Text>
                </View>
              ))
            : mangaList.map((manga, index) => (
                <TouchableOpacity
                  key={index}
                  style={{width: 128}}
                  onPress={() =>
                    router.push({
                      pathname: "/detail/[id]",
                      params: { id: manga.id },
                    })
                  }
                  activeOpacity={0.8}
                >
                  <Image
                    source={mangaCover[index]}
                    cachePolicy={"disk"}
                    style={{ width: 128, height: 192, backgroundColor: "#FFFFFF50", borderRadius: 8 }}
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

export default CustomList;
