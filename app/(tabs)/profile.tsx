import { ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import RecentlyAdded from "@/components/home/RecentlyAdded";
import Statistic from "@/components/profile/Statistic";
import { MotiScrollView } from "moti";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "@/components/profile/ProfileHeader";
import Settings from "@/components/profile/Settings";
import BackgroundConstants from "@/constants/images/BackgroundConstants";
import ProfileMenu from "@/components/profile/ProfileMenu";
import { RefreshControl } from "react-native-gesture-handler";
import LastRead from "@/components/profile/LastRead";
import { getHistory } from "@/lib/supabase/supabase";

const Profile = () => {
  const cover = useAppSelector((state) => state.cover.value);
  const [currentCover, setCurrentCover] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const user = useAppSelector((state) => state.user.value);
  const [history, setHistory] = useState<HistoryParams[]>([]);

  const fetchHistory = async () => {
    const history = await getHistory(user?.id ?? "");
    if (history.data) {
      setHistory(history.data);
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      const nextPage = currentCover + 1 < cover!.length ? currentCover + 1 : 0;
      setCurrentCover(nextPage);
    }, 4000);
    return () => clearInterval(interval);
  }, [cover, currentCover]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    fetchHistory();
    setIsRefreshing(false);
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <SafeAreaView>
      <ImageBackground
        src={cover![currentCover] ?? BackgroundConstants.authBackground.src}
        blurRadius={55}
        className="h-full"
        imageStyle={{ opacity: 0.5 }}
      >
        <MotiScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={["#03d383"]}
            />
          }
        >
          <ProfileHeader history={history}/>
          {/* <ProfileMenu /> */}

          <Statistic history={history} onRefresh={isRefreshing} />
          <LastRead onRefresh={isRefreshing} history={history} />
          <RecentlyAdded onRefresh={0}/>
          <Settings />
        </MotiScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Profile;
