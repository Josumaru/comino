import { getCover, getPopular } from "@/lib/mangadex/mangadex";
import { Manga } from "mangadex-full-api";
import { Image } from "expo-image";
import {
  NativeSyntheticEvent,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import { useRouter } from "expo-router";
import ColoredTitle from "../common/ColoredTitle";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setCovers } from "@/lib/redux/features/cover/coverSlice";

interface PopularTitlesProps {
  onChange: (cover: string) => void;
  onRefresh: number;
}

const PopularTitles = ({ onChange, onRefresh }: PopularTitlesProps) => {
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [mangaCover, setMangaCover] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const router = useRouter();
  const pagerRef = useRef<PagerView>(null);
  const dispatch = useAppDispatch();

  const fetchManga = async () => {
    setIsLoading(true);
    const popularManga = await getPopular();
    for (let i = 0; i < popularManga.length; i++) {
      const fileName = await popularManga[i].getCovers();
      const cover = await getCover({id:popularManga[i].id, fileName: fileName[0].fileName, size: 512});
      setMangaCover((prevState) => [...prevState, cover]);
      setMangaList((precState) => [...precState, popularManga[i]]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (mangaCover) {
      dispatch(setCovers(mangaCover));
    } else {
      dispatch(setCovers(null))
    }
  }, [mangaCover])

  useEffect(() => {
    console.log('====================================');
    console.log("das");
    console.log('====================================');
    setMangaList([]);
    setMangaCover([]);
    fetchManga();
  }, [onRefresh]);

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
    isLoading ? <View className="">
    <View className="mx-5">
      <ColoredTitle firstText={"Popular"} secondText="Titles" type="firstPrimary"/>
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
          onPress={() => {}}
          activeOpacity={0.8}
        >
          <View
            style={{width: 128, height: 192, backgroundColor: "#FFFFFF50", borderRadius: 8 }}
          />
          <View className="flex-1">
            <View className="bg-[#FFFFFF50] opacity-50 rounded-lg mb-1 dark:bg-white text-wrap line-clamp-2 p-3 w-full h-4">
            </View>
            <View className="flex flex-row gap-2">
              {manga.tags.slice(0, 3).map((tag, index) => (
                <View
                  key={index}
                  className="bg-[#FFFFFF50] opacity-50 rounded-lg flex-1 items-center justify-center p-1"
                >
                  <View className="text-black dark:text-gray-500 font-regular opacity-100 line-clamp-1 text-wrap overflow-hidden text-xs p-2">
                  </View>
                </View>
              ))}
            </View>
            <View className="bg-[#FFFFFF50] opacity-50 rounded-lg mt-1 mb-2 dark:bg-white text-wrap line-clamp-2 p-3 w-full flex-1"/>
          </View>
        </TouchableOpacity>
      ))}
    </PagerView>
  </View>: 
    <View className="">
      <View className="mx-5">
        <ColoredTitle firstText={"Popular"} secondText="Titles" type="firstPrimary"/>
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
              cachePolicy={"disk"}
              source={mangaCover[index]}
              style={{width: 128, height: 192, backgroundColor: "#FFFFFF50", borderRadius: 8 }}
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
