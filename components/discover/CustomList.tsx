import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Cover, Manga } from "mangadex-full-api";
import { getCustomList, getManga } from "@/lib/mangadex/mangadex";
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
      for (let i = 0; i < response.length; i++) {
        const cover = await response[i].getCovers();
        setMangaCover((prevState) => [...prevState, cover[0].url]);
        setMangaList((precState) => [...precState, response[i]]);
        if (covers) {
          covers([...mangaCover, cover[0].url]);
        }
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
  }, []);
  return (
    <View style={{ paddingBottom: bottom ? 86 : 5 }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View className="flex px-5 gap-2 flex-row">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <View key={index}>
                  <Image
                    src={""}
                    className="h-48 w-32 rounded-lg bg-[#FFFFFF50]"
                  />
                  <Text>{"\n"}</Text>
                </View>
              ))
            : mangaList.map((manga, index) => (
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
              ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CustomList;
