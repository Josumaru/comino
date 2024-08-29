import Button from "@/components/common/Button";
import ChapterList from "@/components/detail/ChapterList";
import DetailTab from "@/components/detail/DetailTab";
import Overview from "@/components/detail/Overview";
import { Pagination } from "@/components/detail/Pagination";
import { getCover, getManga } from "@/lib/mangadex/mangadex";
import { formatTime } from "@/lib/utils/timeFormater";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Author, Chapter, Manga } from "mangadex-full-api";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Detail = () => {
  const { id } = useLocalSearchParams();
  const [manga, setManga] = useState<Manga | null>(null);
  const [cover, setCover] = useState<string>("");
  const [author, setAuthor] = useState<Author | null>();
  const [chapters, setChapters] = useState<Chapter[] | null>();
  const [statistic, setStatistic] = useState<Statistic | null>();
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { height } = Dimensions.get("window");

  const fetchManga = async () => {
    try {
      setIsLoading(true);
      const manga = await getManga(id.toString());
      const fileName = await manga?.getCovers();
      const cover = await getCover({
        id: id.toString(),
        fileName: fileName![0].fileName,
        size: 512,
      });
      const author = await Author.getByQuery({
        ids: [manga!.authors[0].id],
      });
      const statistic = await manga?.getStatistics();
      const chapters = await manga?.getFeed({
        limit: Infinity,
        offset: 0,
        includes: ["scanlation_group", "user"],
        order: {
          volume: "desc",
          chapter: "desc",
        },
        contentRating: ["safe", "suggestive", "erotica", "pornographic"],
      });
      setChapters(chapters);
      setStatistic(statistic);
      setAuthor(author);
      setCover(cover);
      setManga(manga);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setChapters([]);
    fetchManga();
  }, [id]);

  return isLoading ? (
    <ImageBackground
      className="flex-1"
      src={cover}
      blurRadius={55}
      imageStyle={{ opacity: 0.25 }}
    >
      <SafeAreaView className="flex-1">
        <View className="flex flex-row gap-2 w-full pt-5 pl-5 pr-5">
          <View className="flex-1" style={{ height: 230 }}>
            <View className="text-wrap h-5 rounded-lg bg-[#FFFFFF50] overflow-hidden w-full line-clamp-5 text-2xl font-semibold" />
            <View className="text-wrap h-5 mt-1 rounded-lg bg-[#FFFFFF50] overflow-hidden w-full line-clamp-5 text-2xl font-semibold" />
            <View className="text-wrap h-5 mt-1 rounded-lg w-2/3 bg-[#FFFFFF50] overflow-hidden line-clamp-5 text-2xl font-semibold" />
            <Text className="text-wrap overflow-hidden w-full line-clamp-3 flex-1 text-base font-regular color-gray-400"></Text>
            <View className="bg-[#FFFFFF50] min-h-12 flex justify-center items-center rounded-lg border border-[#FFFFFF80]" />
          </View>
          <View className="relative">
            <Image
              cachePolicy={"disk"}
              className="rounded-lg bg-[#FFFFFF50]"
              style={{ width: 150, height: 230 }}
            />
          </View>
        </View>
        <View className="flex flex-row justify-between mx-5 mt-5 gap-5">
          <TouchableOpacity onPress={() => setCurrentTab(0)} className="flex-1">
            <View className="font-regular text-center bg-[#FFFFFF50] h-4 rounded-lg" />
            <View className="h-1 rounded-lg mt-5" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentTab(0)} className="flex-1">
            <View className="font-regular text-center bg-[#FFFFFF50] h-4 rounded-lg" />
            <View className="h-1 rounded-lg mt-5 bg-[#FFFFFF50]" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentTab(0)} className="flex-1">
            <View className="font-regular text-center bg-[#FFFFFF50] h-4 rounded-lg" />
            <View className="h-1 rounded-lg mt-5" />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: height - 300 }}
        >
          <View>
            <View className="flex flex-col pb-24">
              <View className="my-1 rounded-lg mx-5 w-14 h-4 bg-[#FFFFFF50]" />
              <ScrollView
                className="flex-row "
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {Array.from({ length: 10 }).map((_, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`min-h-0 bg-[#FFFFFF50] border w-20 border-[#FFFFFF80] rounded-lg p-2 py-[13px] ${
                      index === 0 ? "ml-5 mr-2" : "mr-2"
                    } ${index === 9 ? "mr-5" : ""}`}
                    activeOpacity={0.5}
                  ></TouchableOpacity>
                ))}
              </ScrollView>
              <View className="my-1 rounded-lg mx-5 w-32 h-4 bg-[#FFFFFF50]" />
              <View className="my-1 rounded-lg mx-5 flex-1 h-3 bg-[#FFFFFF50]" />
              <View className="my-1 rounded-lg mx-5 flex-1 h-3 bg-[#FFFFFF50]" />
              <View className="my-1 rounded-lg mx-5 flex-1 h-3 bg-[#FFFFFF50]" />
              <View className="my-1 rounded-lg mx-5 flex-1 h-3 bg-[#FFFFFF50]" />
              <View className="my-1 rounded-lg mx-5 flex-1 h-3 bg-[#FFFFFF50]" />
              <View className="my-1 rounded-lg mx-5 flex-1 h-3 bg-[#FFFFFF50]" />
              <View className="my-1 rounded-lg mx-5 flex-1 h-3 bg-[#FFFFFF50]" />
              <View className="my-1 rounded-lg mx-5 flex-1 h-3 bg-[#FFFFFF50]" />
              <View className="my-1 rounded-lg mx-5 flex-1 h-3 bg-[#FFFFFF50]" />
              <View className="my-1 rounded-lg mx-5 flex-1 h-3 bg-[#FFFFFF50]" />
              <View className="my-1 rounded-lg mx-5 flex-1 h-3 bg-[#FFFFFF50]" />
              <View className="my-1 rounded-lg mx-5 flex-1 h-3 bg-[#FFFFFF50]" />
              <View className="my-1 rounded-lg mx-5 flex-1 h-3 bg-[#FFFFFF50]" />
              <View className="my-1 rounded-lg mx-5 flex-1 h-3 bg-[#FFFFFF50]" />
              <View className="my-1 rounded-lg mx-5 w-1/3 h-3 bg-[#FFFFFF50]" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  ) : (
    <ImageBackground
      className="flex-1"
      src={cover}
      blurRadius={55}
      imageStyle={{ opacity: 0.25 }}
    >
      <SafeAreaView className="flex-1">
        <Overview
          manga={manga!}
          cover={cover}
          author={author!}
          statistic={statistic!}
        />
        <View className="flex flex-row justify-between mx-5 mt-5">
          <TouchableOpacity onPress={() => setCurrentTab(0)} className="flex-1">
            <Text className="font-regular text-center">Details</Text>
            <View
              style={{
                backgroundColor: currentTab === 0 ? "gray" : "transparent",
              }}
              className="h-1 rounded-lg mt-5"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentTab(1)} className="flex-1">
            <Text className="font-regular text-center">
              Chapters ({chapters?.length})
            </Text>
            <View
              style={{
                backgroundColor: currentTab === 1 ? "gray" : "transparent",
              }}
              className="h-1 rounded-lg mt-5"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentTab(2)} className="flex-1">
            <Text className="font-regular text-center">Details</Text>
            <View
              style={{
                backgroundColor: currentTab === 2 ? "gray" : "transparent",
              }}
              className="h-1 rounded-lg mt-5"
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: height - 300 }}
        >
          <View>
            {currentTab === 0 && <DetailTab manga={manga!} />}
            {currentTab === 1 && <ChapterList chapters={chapters!} />}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Detail;
