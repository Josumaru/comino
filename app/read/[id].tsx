import {
  View,
  Text,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { Image, ImageLoadEventData } from "expo-image"
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Chapter } from "mangadex-full-api";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { Zoomable } from "@likashefqet/react-native-image-zoom";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";

const ReadPage = () => {
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

  const handleImageLoad = (
    event: ImageLoadEventData,
    index: number
  ) => {
    const { width, height } = event.source;
    const newRatios = [...imageRatios];
    newRatios[index] = width / height;
    setImageRatios(newRatios);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    let newCurrentPage = 0;

    pageLayouts.forEach((layout, index) => {
      let layoutHeight = layout - height;
      if (scrollPosition >= layoutHeight) {
        newCurrentPage = index + 1;
      } else if (scrollPosition === 0) {
        newCurrentPage = 1;
      } else if (scrollPosition.toFixed() === layoutHeight.toFixed()) {
        newCurrentPage = index + 1;
      }
    });

    setCurrentPage(newCurrentPage);
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
        console.log(loadedCount);
        console.log(readingPages.length);
        Image.prefetch(url)
          .catch(() => console.warn("Failed to load image", url))
          .finally(() => setLoadedCount((prev) => prev + 1));
      });
      readingPages.forEach((e)=> console.log(e))
      await Promise.all(promises);
      setIsLoading(false);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchManga();
  }, [id]);

  useEffect(() => {
    const preloadImages = async () => {
      // const promises = readingPages.map((url) => {
      //   console.log(loadedCount);
      //   console.log(readingPages.length);
      //   Image.prefetch(url)
      //     .catch(() => console.warn("Failed to load image", url))
      //     .finally(() => setLoadedCount((prev) => prev + 1));
      // });
      // await Promise.all(promises);
      setIsLoading(false);
    };
    // readingPages.map((a) => {
    //   console.log(a);
    // });

    preloadImages();
  }, [readingPages]);

  return (
    <SafeAreaView>
      {isLoading  || loadedCount <= readingPages.length - 1? (
        <View className="relative">
          <BlurView
            className="h-16 absolute w-full items-center justify-center p-2 z-20 border-b border-gray-400"
            experimentalBlurMethod="dimezisBlurView"
            intensity={75}
          >
            <View className="flex-1 w-full items-center justify-center">
              <Text className="font-regular text-gray-500">
                {chapters?.title}
              </Text>
              <Text className="font-regular text-xl">
                {chapters?.chapter !== null ? `Ch. ${chapters?.chapter} ` : ""}
                {chapters?.volume !== null ? `Vol. ${chapters?.volume}` : ""}
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
              <Text className="font-regular">Previous</Text>
              <Text className="font-regular text-xl text-gray-500">
                {`${currentPage}/${chapters?.pages}`}
              </Text>
              <Text className="font-regular">Next</Text>
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
              <Text className="font-regular text-gray-500">
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
                        autoplay= {false}
                        style={{
                          width: "100%",
                          aspectRatio: aspectRatio,
                          marginBottom: index == readingPages.length - 1 ? 64 : 0
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
              <Text className="font-regular">Previous</Text>
              <Text className="font-regular text-xl text-gray-500">
                {`${currentPage}/${readingPages.length}`}
              </Text>
              <Text className="font-regular">Next</Text>
            </View>
          </BlurView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ReadPage;
