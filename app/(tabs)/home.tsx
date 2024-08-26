import { SafeAreaView } from "react-native-safe-area-context";
import PopularTitles from "@/components/home/PopularTitles";
import LatestUpdate from "@/components/home/LatestUpdates";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import SearchBar from "@/components/home/SearchBar";
import ProfileBar from "@/components/home/ProfileBar";
import { useState } from "react";
import RecentlyAdded from "@/components/home/RecentlyAdded";
import SearchBarOverlay from "@/components/home/SearchBarOverlay";

const Home = () => {
  const [cover, setCover] = useState<string>("");
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const onChange = (cover: string) => {
    setCover(cover);
  };

  return (
    <SafeAreaView>
      <ImageBackground
        src={cover}
        blurRadius={55}
        imageStyle={{ opacity: 0.5 }}
      >
        {showSearchBar && <SearchBarOverlay handleClick={()=> setShowSearchBar(false)}/>}
        <ScrollView
          className="dark:bg-[#19191cdc]"
          showsVerticalScrollIndicator={false}
        >
          <ProfileBar />
          <SearchBar onClick={() => setShowSearchBar(true)} />
          <PopularTitles onChange={onChange} />
          <LatestUpdate />
          <RecentlyAdded />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;
