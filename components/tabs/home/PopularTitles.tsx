import { getPopular } from "@/lib/mangadex/mangadex";
import { Manga } from "mangadex-full-api";
import { Image, Text, View } from "react-native";
import { useEffect, useState } from "react";
import PagerView from "react-native-pager-view";

const PopularTitles = () => {
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [mangaCover, setMangaCover] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const fetchManga = async () => {
    setIsLoading(true);
    const popularManga = await getPopular();
    for (let i = 0; i < popularManga.length; i++) {
      const cover = await popularManga[i].getCovers();
      setMangaCover((prevState) => [...prevState, cover[0].url]);
      setMangaList((precState) => [...precState, popularManga[i]]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setMangaList([]);
    setMangaCover([]);
    fetchManga();
  }, []);

  return (
    <View className="">
      <Text className="text-black dark:text-white z-20 mt-2 mx-5 font-semibold text-2xl">
        Popular Titles
      </Text>

      {!isLoading && (
        <Image
          src={mangaCover[currentPage]}
          className="absolute z-0 ease-in-out delay-500 w-full h-72 opacity-30"
          blurRadius={100}
        />
      )}

      <PagerView
        initialPage={0}
        style={{ height: 200 }}
        className="relative"
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        {mangaList.map((manga, index) => (
          <View key={index} className="m-5 flex flex-row gap-5">
            <Image
              src={mangaCover[index]}
              className="rounded-lg z-20 w-32 h-48"
            />
            <View className="flex-1">
              <Text className="text-2xl font-regular overflow-hidden text-black dark:text-white text-wrap line-clamp-2">
                {manga.localTitle}
              </Text>
              <View className="flex flex-row gap-2">
                {manga.tags.slice(0, 3).map((tag, index) => (
                  <View
                    key={index}
                    className="bg-gray-50 opacity-50 rounded-lg flex-1 items-center justify-center p-1"
                  >
                    <Text className="text-black dark:text-white font-regular opacity-100 line-clamp-1 text-wrap overflow-hidden text-xs">
                      {tag.localName}
                    </Text>
                  </View>
                ))}
              </View>
              <Text className="font-regular text-base overflow-hidden text-black dark:text-white text-wrap line-clamp-5">
                {manga.description.localString.replaceAll("_", "")}
              </Text>
            </View>
          </View>
        ))}
      </PagerView>
      <View className="px-5 flex-1 w-full justify-between flex-row items-center">
        <Text className="font-regular text-end text-black dark:text-white">{`${
          ((currentPage + 1) / 10) * 100
        }%`}</Text>
        <View className="w-[90%] relative flex items-start justify-center">
          <View className="bg-primary-100 rounded-lg w-full h-1 ease-in-out duration-300 absolute" />
          <View
            className="bg-primary-400 rounded-lg w-1 h-1 ease-in-out duration-300 absolute"
            style={{ width: `${((currentPage + 1) / 10) * 100}%` }}
          />
        </View>
      </View>
    </View>
  );
};

export default PopularTitles;
