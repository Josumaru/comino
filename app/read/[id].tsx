import {
  View,
  Text,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
} from "react-native";
import { Image, ImageLoadEventData } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Chapter, Cover } from "mangadex-full-api";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import IconConstants from "@/constants/images/IconConstants";
import { addHistory } from "@/lib/supabase/supabase";
import { useAppSelector } from "@/lib/redux/hooks";

const ReadPage = () => {
  const user = useAppSelector((state) => state.user.value);
  const chapter = useAppSelector((state) => state.chapter.value);
  const { id } = useLocalSearchParams();
  const { height } = Dimensions.get("window");
  const [readingPages, setReadingPages] = useState<string[]>([]);
  const [chapters, setChapters] = useState<Chapter>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const pageLayouts = useRef<number[]>([]).current;
  const [imageRatios, setImageRatios] = useState<number[]>([]);
  const router = useRouter();


  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);  // Use useRef to persist timeout across renders
  
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
  
    // Clear the previous timeout if the user continues scrolling
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    let newCurrentPage = 0;

    // Loop through the page layouts and calculate the current page
    pageLayouts.forEach((layout, index) => {
      let layoutHeight = layout - height;
      if (scrollPosition >= layoutHeight) {
        newCurrentPage = index + 1;
      } else if (scrollPosition === 0) {
        newCurrentPage = 1;  // If at the top of the scroll, set page to 1
      } else if (scrollPosition.toFixed() === layoutHeight.toFixed()) {
        newCurrentPage = index + 1;  // Handle exact matching scroll positions
      }
    });
    
    setCurrentPage(newCurrentPage);  // Set the new current page after the debounce period
    // Set a new timeout to delay the function execution by 1 second
    scrollTimeout.current = setTimeout(() => {

      addHistory({
        author: chapter.author ?? "",
        chapter: Number(chapters?.chapter),
        chapter_id: chapters?.id ?? "",
        cover: chapter.cover ?? "",
        current_page: newCurrentPage,
        readed_at: new Date(),
        pages: chapters?.pages ?? 0,
        user_id: user?.id ?? "",
        volume: Number(chapters?.volume),
        title: chapters?.title?? "Untitled",
      })
  
    }, 1000);  // 1 second debounce
  };
  

  const handleImageLoad = (event: ImageLoadEventData, index: number) => {
    const { width, height } = event.source;
    const newRatios = [...imageRatios];
    newRatios[index] = width / height;
    setImageRatios(newRatios);
  };

  const onImageLayout = (event: any, index: number) => {
    const { y, height: imageHeight } = event.nativeEvent.layout;
    pageLayouts[index] = y + imageHeight;
  };

  const fetchManga = async () => {
    setIsLoading(true);
    setLoadedCount(0);
    setCurrentPage(1);
    // setReadingPages([]);
    try {
      const chapter = await Chapter.get(id.toString());
      setChapters(chapter);
      const readingPages = await chapter.getReadablePages();
      const updatedPages = readingPages.map((page) => {
        const [_, path] = page.split("/data/");
        return `https://uploads.mangadex.org/data/${path}`;
      });
      setReadingPages(updatedPages);
      const promises = readingPages.map((url) => {
        Image.prefetch(url)
          .catch(() => console.warn("Failed to load image", url))
          .finally(() => setLoadedCount((prev) => prev + 1));
      });
      await Promise.all(promises);
      setIsLoading(false);
      setIsLoading(false);
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchManga();
  }, [id]);

  useEffect(() => {
    const preloadImages = async () => {
      setIsLoading(false);
    };

    preloadImages();
  }, [readingPages]);

  return (
    <SafeAreaView>
      {isLoading || loadedCount <= readingPages.length - 1 ? (
        <View className="relative">
          <BlurView
            className="h-16 absolute w-full items-center justify-center p-2 z-20 border-b border-gray-400"
            experimentalBlurMethod="dimezisBlurView"
            intensity={75}
          >
            <View className="flex-1 w-full items-center justify-center">
              <TouchableOpacity
                className="p-2 px-5 absolute left-0"
                onPress={() => router.back()}
              >
                <Image
                  source={IconConstants.back}
                  style={{ height: 24, width: 24 }}
                  tintColor={"black"}
                />
              </TouchableOpacity>
              <Text className="font-regular text-gray-500 w-3/5 overflow-ellipsis line-clamp-2 text-center">
                {chapters?.title}
              </Text>
              <Text className="font-regular text-xl">
                {chapters?.chapter !== null
                  ? `Ch. ${chapters?.chapter ?? ""} `
                  : ""}
                {chapters?.volume !== null
                  ? `Vol. ${chapters?.volume ?? ""}`
                  : ""}
              </Text>
            </View>
          </BlurView>
          <View style={{ height }} className="flex items-center justify-center">
            <View className="flex justify-center items-center flex-row">
              <Text className="font-regular color-primary-500 text-7xl">
                {Math.ceil((loadedCount / readingPages.length) * 100)}
              </Text>
              <Text className="font-regular text-7xl">%</Text>
            </View>
            <Text className="font-regular text-xl">Please wait</Text>
          </View>
          <BlurView
            className="h-16 bottom-0 absolute w-full items-center justify-center p-2 z-20 border-t border-gray-400"
            experimentalBlurMethod="dimezisBlurView"
            intensity={75}
          >
            <View className="flex-1 w-full items-center justify-between flex-row">
              <TouchableOpacity className="p-2 px-5">
                <Image
                  source={IconConstants.previous}
                  style={{ height: 24, width: 24 }}
                  tintColor={"black"}
                />
              </TouchableOpacity>
              <Text className="font-regular text-xl text-gray-500">
                {`${currentPage}/${chapters?.pages}`}
              </Text>
              <TouchableOpacity className="p-2 px-5">
                <Image
                  source={IconConstants.next}
                  style={{ height: 24, width: 24 }}
                  tintColor={"black"}
                />
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      ) : (
        <View className="relative">
          <BlurView
            className="h-16 absolute w-full items-center justify-center p-2 z-20 border-b border-gray-400"
            experimentalBlurMethod="dimezisBlurView"
            intensity={75}
          >
            <View className="flex-1 w-full items-center justify-center">
              <TouchableOpacity
                className="p-2 px-5 absolute left-0"
                onPress={() => router.back()}
              >
                <Image
                  source={IconConstants.back}
                  style={{ height: 24, width: 24 }}
                  tintColor={"black"}
                />
              </TouchableOpacity>
              <Text className="font-regular text-gray-500 w-3/5 overflow-ellipsis line-clamp-2 text-center">
                {chapters?.title}
              </Text>
              <Text className="font-regular text-xl">
                {chapters?.chapter !== null ? `Ch. ${chapters?.chapter} ` : ""}
                {chapters?.volume !== null ? `Vol. ${chapters?.volume}` : ""}
              </Text>
            </View>
          </BlurView>
          <View>
            <ScrollView
              style={{ height: height }}
              className="pt-16"
              onScroll={handleScroll}
              alwaysBounceVertical={false}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
            >
              {readingPages.map((imageUri, index) => {
                const aspectRatio = imageRatios[index] || 1;
                return (
                  <Image
                    key={index}
                    onLayout={(event) => onImageLayout(event, index)}
                    cachePolicy={"disk"}
                    source={{ uri: imageUri }}
                    contentFit="cover"
                    transition={1000}
                    autoplay={false}
                    style={{
                      width: "100%",
                      aspectRatio: aspectRatio,
                      marginBottom: index == readingPages.length - 1 ? 64 : 0,
                    }}
                    onLoad={(event) => handleImageLoad(event, index)}
                  />
                );
              })}
            </ScrollView>
          </View>
          <BlurView
            className="h-16 bottom-0 absolute w-full items-center justify-center p-2 z-20 border-t border-gray-400"
            experimentalBlurMethod="dimezisBlurView"
            intensity={75}
          >
            <View className="flex-1 w-full items-center justify-between flex-row">
              <TouchableOpacity className="p-2 px-5">
                <Image
                  source={IconConstants.previous}
                  style={{ height: 24, width: 24 }}
                  tintColor={"black"}
                />
              </TouchableOpacity>
              <Text className="font-regular text-xl text-gray-500">
                {`${currentPage}/${readingPages.length}`}
              </Text>
              <TouchableOpacity className="p-2 px-5">
                <Image
                  source={IconConstants.next}
                  style={{ height: 24, width: 24 }}
                  tintColor={"black"}
                />
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ReadPage;
