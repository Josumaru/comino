import { View, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ColoredTitle from "@/components/common/ColoredTitle";
import MangaList from "@/components/discover/CustomList";
import { ScrollView } from "moti";
import BackgroundConstants from "@/constants/images/BackgroundConstants";
import { useAppSelector } from "@/lib/redux/hooks";
import { RefreshControl } from "react-native-gesture-handler";

const Discover = () => {
  const cover = useAppSelector((state) => state.cover.value);
  const [currentCover, setCurrentCover] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  useEffect(() => {
    const interval = setInterval(() => {
      const nextPage = currentCover + 1 < cover!.length ? currentCover + 1 : 0;
      setCurrentCover(nextPage);
    }, 4000);
    return () => clearInterval(interval);
  }, [cover, currentCover]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // fetch data and update state
    setIsRefreshing(false);
  }

  return (
    <View className="dark:bg-[#19191cdc]">
      <ImageBackground
        src={cover![currentCover] ?? BackgroundConstants.authBackground.src}
        blurRadius={55}
        imageStyle={{ opacity: 0.5 }}
      >
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} colors={["#03d383"]}/>
          }>
            <View className="mx-5">
              <ColoredTitle
                firstText="Self"
                secondText="Published"
                type="firstPrimary"
              />
            </View>
            <MangaList id={"f66ebc10-ef89-46d1-be96-bb704559e04a"} />
            <View className="mx-5">
              <ColoredTitle
                firstText="Staff"
                secondText="Picks"
                type="secondPrimary"
              />
            </View>
            <MangaList id={"805ba886-dd99-4aa4-b460-4bd7c7b71352"} />
            <View className="mx-5">
              <ColoredTitle
                firstText="Featured"
                secondText="by Supporters"
                type="firstPrimary"
              />
            </View>
            <MangaList id={"5c5e6e39-0b4b-413e-be59-27b1ba03d1b9"} />
            <View className="mx-5">
              <ColoredTitle
                firstText="Seasonal: "
                secondText="Summer 2024"
                type="secondPrimary"
              />
            </View>
            <MangaList bottom id={"54736a5c-eb7f-4844-971b-80ee171cdf29"} />
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default Discover;
