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

const Profile = () => {
  const cover = useAppSelector((state) => state.cover.value);
  const [currentCover, setCurrentCover] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextPage = currentCover + 1 < cover!.length ? currentCover + 1 : 0;
      setCurrentCover(nextPage);
    }, 4000);
    return () => clearInterval(interval);
  }, [cover, currentCover]);

  return (
    <SafeAreaView>
      <ImageBackground
        src={cover![currentCover] ?? BackgroundConstants.authBackground.src}
        blurRadius={55}
        className="h-full"
        imageStyle={{ opacity: 0.5 }}
      >
        <MotiScrollView>
          <ProfileHeader />
          <Statistic />
          {/* <ProfileMenu /> */}
          <RecentlyAdded />
          <Settings />
        </MotiScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Profile;
