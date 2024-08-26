import Button from "@/components/common/Button";
import ChapterList from "@/components/detail/ChapterList";
import DetailTab from "@/components/detail/DetailTab";
import Overview from "@/components/detail/Overview";
import { Pagination } from "@/components/detail/Pagination";
import { getManga } from "@/lib/mangadex/mangadex";
import { formatTime } from "@/lib/utils/timeFormater";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Author, Chapter, Manga } from "mangadex-full-api";
import { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
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
  const { height } = Dimensions.get("window");

  const fetchManga = async () => {
    try {
      const manga = await getManga(id.toString());
      const cover = await manga?.getCovers();
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
      setCover(cover![0].url);
      setManga(manga);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setChapters([]);
    fetchManga();
  }, [id]);

  return (
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
            <Text className="font-regular text-center">Chapters ({chapters?.length})</Text>
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
