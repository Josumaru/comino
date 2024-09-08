import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import BackgroundConstants from "@/constants/images/BackgroundConstants";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";
import { getArchive, removeArchive } from "@/lib/supabase/supabase";
import { useRouter } from "expo-router";
import { RefreshControl } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ColoredTitle from "@/components/common/ColoredTitle";
import IconConstants from "@/constants/images/IconConstants";

const Archive = () => {
  const user = useAppSelector((state) => state.user.value);
  const cover = useAppSelector((state) => state.cover.value);
  const [currentCover, setCurrentCover] = useState<number>(0);
  const [currentId, setCurrentId] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mangaList, setMangaList] = useState<ArchiveParams[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextPage = currentCover + 1 < cover!.length ? currentCover + 1 : 0;
      setCurrentCover(nextPage);
    }, 4000);
    return () => clearInterval(interval);
  }, [cover, currentCover]);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getArchive(user!.id);
    if (data.data) {
      setMangaList(data.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData();
    setIsRefreshing(false);
  };
  return (
    <SafeAreaView>
      <ImageBackground
        src={cover![currentCover] ?? BackgroundConstants.authBackground.src}
        blurRadius={55}
        className="h-full"
        imageStyle={{ opacity: 0.5 }}
      >
        <BlurView
          className="h-full w-full absolute justify-center items-center z-50"
          style={{ display: showDialog ? "flex" : "none" }}
          experimentalBlurMethod="dimezisBlurView"
          intensity={50}
        >
          <View className="bg-white rounded-lg border border-gray-400">
            <View className="border-b p-4 border-gray-400">
              <Text className="font-regular">
                Confirm to delete the selected archive
              </Text>
            </View>
            <View className="border-b p-4 border-gray-400">
              <Text className="font-regular text-base">Are you sure you want to delete the selected archive?</Text>
              <Text className="font-regular text-base">This action cannot be undone.</Text>
            </View>
            <View className="flex-row p-4">
              <TouchableOpacity
                onPress={() => setShowDialog(false)}
                className="bg-gray-300 border p-5 border-gray-400 px-5 py-2 rounded-lg flex-1 justify-center items-center"
              >
                <Text className="font-regular dark:text-white">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isLoading}
                onPress={async () => {
                  const data = await removeArchive(user?.id!, currentId);
                  if (data) {
                    await fetchData();
                    setShowDialog(false);
                  }
                }}
                className="bg-[#F4433690] border border-[#F44336] px-5 py-2 ml-5 dark:text-white rounded-lg flex-1 justify-center items-center"
              >
                <Text className="font-regular">{isLoading ? "Deleting" : "Delete"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={handleRefresh}
              refreshing={isRefreshing}
            />
          }
        >
          <View className="p-5">
            <ColoredTitle
              firstText="My"
              secondText="Archive"
              type="secondPrimary"
            />
          </View>
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <View
                  key={index}
                  style={{ height: 128 }}
                  className="h-32 bg-[#FFFFFF50] flex-1 rounded-lg mx-5 my-1"
                ></View>
              ))
            : mangaList.map((manga, index) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/detail/[id]",
                        params: { id: manga.manga_id! },
                      })
                    }
                    onLongPress={() => {
                      setCurrentId(manga.manga_id!);
                      setShowDialog(true);
                    }}
                    style={{
                      paddingBottom: index == mangaList.length - 1 ? 88 : null,
                    }}
                    activeOpacity={0.7}
                    key={index}
                  >
                    <View
                      className="mx-5 my-1 flex flex-row gap-5 rounded-lg bg-opacity-10 bg-[#FFFFFF80] blur-lg overflow-hidden"
                      // intensity={50}
                      // experimentalBlurMethod="dimezisBlurView"
                    >
                      <View className="flex-1 flex-row gap-2">
                        <Image
                          cachePolicy={"disk"}
                          source={manga.cover}
                          contentFit="cover"
                          style={{ width: 80, height: 128 }}
                        />
                        <View className="flex-1">
                          <Text className="text-xl font-regular overflow-hidden text-black dark:text-white text-wrap line-clamp-2 w-full">
                            {manga.title}
                          </Text>
                          <View className="flex flex-row gap-1">
                            {/* {manga.tags.slice(0, 1).map((tag, index) => (
                            <View key={index}>
                              <Text className="text-gray-400 font-regular text-sm">
                                {tag.localName}
                              </Text>
                            </View>
                          ))} */}
                            {/* <Text className="text-sm font-regular overflow-hidden text-gray-400 text-wrap line-clamp-2">
                            {` - ${manga.contentRating.replace(
                              manga.contentRating[0][0],
                              manga.contentRating[0][0].toUpperCase()
                            )}`}
                          </Text> */}
                          </View>
                          <Text className="text-gray-400 font-regular">
                            {manga.author}
                          </Text>
                          <View className="flex flex-row gap-1 items-center">
                            <Text className="text-black dark:text-white font-regular">
                              {manga.rating.toPrecision(2)}
                            </Text>
                          </View>
                          <View className="flex flex-row gap-1">
                            <Text className="text-black dark:text-white font-regular line-clamp-3">
                              {manga.synopsis}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Archive;
