import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Chapter } from "mangadex-full-api";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { ImageZoom, Zoomable } from "@likashefqet/react-native-image-zoom";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ReadPage = () => {
  const { id } = useLocalSearchParams();
  const [readingPages, setReadingPages] = useState<string[]>([]);
  const [chapters, setChapters] = useState<Chapter>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { height } = Dimensions.get("window");
  const pageLayouts = useRef<number[]>([]).current;

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
    setReadingPages([]);
    try {
      const chapter = await Chapter.get(id.toString());
      setChapters(chapter);
      const readingPages = await chapter.getReadablePages();
      setReadingPages(readingPages);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchManga();
  }, [id]);
  return (
    <SafeAreaView>
      {isLoading ? (
        <View>
          <Text>Loading</Text>
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
              {readingPages.map((readingPages, index) => (
                <GestureHandlerRootView key={index}>
                  <Zoomable
                    doubleTapScale={3}
                    minPanPointers={1}
                    isSingleTapEnabled
                    isDoubleTapEnabled
                  >
                    <Image
                      onLayout={(event) => onImageLayout(event, index)}
                      resizeMode="cover"
                      src={readingPages}
                      className="w-full"
                      style={{
                        aspectRatio: 1,
                        marginBottom: index == pageLayouts.length - 1 ? 112 : 0,
                      }}
                    />
                  </Zoomable>
                </GestureHandlerRootView>
              ))}
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
                {`${currentPage}/${chapters?.pages}`}
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
