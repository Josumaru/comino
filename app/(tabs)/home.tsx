import { SafeAreaView } from "react-native-safe-area-context";
import PopularTitles from "@/components/home/PopularTitles";
import LatestUpdate from "@/components/home/LatestUpdates";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import SearchBar from "@/components/home/SearchBar";
import ProfileBar from "@/components/home/ProfileBar";
import { useState } from "react";
import RecentlyAdded from "@/components/home/RecentlyAdded";
import SearchBarOverlay from "@/components/home/SearchBarOverlay";
import { RefreshControl } from "react-native-gesture-handler";

const Home = () => {
  const [cover, setCover] = useState<string>("");
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [seed, setSeed] = useState<number>(0);

  const onChange = (cover: string) => {
    setCover(cover);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const randomNumber = Math.random() * 100;
    setSeed(randomNumber)
    setIsRefreshing(false);
  };

  return (
    <SafeAreaView>
      <ImageBackground
        src={cover}
        blurRadius={55}
        imageStyle={{ opacity: 0.5 }}
      >
        {showSearchBar && (
          <SearchBarOverlay handleClick={() => setShowSearchBar(false)} />
        )}
        <ScrollView
         refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} colors={["#03d383"]}/>
         }
          className="dark:bg-[#19191cdc]"
          showsVerticalScrollIndicator={false}
        >
          <ProfileBar />
          <SearchBar onClick={() => setShowSearchBar(true)} />
          <PopularTitles onChange={onChange} onRefresh={seed}/>
          <LatestUpdate onRefresh={seed}/>
          <RecentlyAdded bottom={true} onRefresh={seed}/>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;
