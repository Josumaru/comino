import { getPopular } from "@/lib/mangadex/mangadex";
import { Manga } from "mangadex-full-api";
import {
  Image,
  NativeSyntheticEvent,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import { useRouter } from "expo-router";
import ColoredTitle from "../common/ColoredTitle";

interface PopularTitlesProps {
  onChange: (cover: string) => void;
}

const PopularTitles = ({ onChange }: PopularTitlesProps) => {
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [mangaCover, setMangaCover] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const router = useRouter();
  const pagerRef = useRef<PagerView>(null);

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (pagerRef.current) {
        const nextPage = currentPage + 1 < 10 ? currentPage + 1 : 0;
        pagerRef.current.setPage(nextPage);
        setCurrentPage(nextPage);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentPage]);

  const onPageSelected = (
    e: NativeSyntheticEvent<Readonly<{ position: number }>>
  ) => {
    setCurrentPage(e.nativeEvent.position);
    onChange(mangaCover[e.nativeEvent.position]);
  };

  return (
    <View className="">
      <View className="mx-5">
        <ColoredTitle firstText="Popular" secondText="Titles" type="firstPrimary"/>
      </View>
      <PagerView
        ref={pagerRef}
        initialPage={0}
        style={{ height: 200 }}
        className="relative"
        onPageSelected={onPageSelected}
      >
        {mangaList.map((manga, index) => (
          <TouchableOpacity
            key={index}
            className="mx-5 flex flex-row gap-5"
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
              className="rounded-lg z-20 w-32 h-48 bg-[#FFFFFF50]"
            />
            <View className="flex-1">
              <Text className="text-2xl font-regular overflow-hidden text-black dark:text-white text-wrap line-clamp-2">
                {manga.localTitle}
              </Text>
              <View className="flex flex-row gap-2">
                {manga.tags.slice(0, 3).map((tag, index) => (
                  <View
                    key={index}
                    className="bg-[#FFFFFF50] opacity-50 rounded-lg flex-1 items-center justify-center p-1"
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
          </TouchableOpacity>
        ))}
      </PagerView>
      {/* <View className="px-5 flex-1 w-full justify-between flex-row items-center">
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
      </View> */}
    </View>
  );
};

export default PopularTitles;
