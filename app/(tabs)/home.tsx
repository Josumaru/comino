import { SafeAreaView } from "react-native-safe-area-context";
import PopularTitles from "@/components/tabs/home/PopularTitles";
import LatestUpdate from "@/components/tabs/home/LatestUpdates";
import { ScrollView, View } from "react-native";
import SearchBar from "@/components/tabs/home/SearchBar";
import ProfileBar from "@/components/tabs/home/ProfileBar";

const Home = () => {
  return (
    <SafeAreaView>
      <ScrollView className="dark:bg-[#19191c]">
        <ProfileBar />
        <SearchBar />
        <PopularTitles />
        <LatestUpdate />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
