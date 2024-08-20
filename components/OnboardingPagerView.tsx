import React, { useRef, useState } from "react";
import { View, Text, NativeSyntheticEvent } from "react-native";
import PagerView from "react-native-pager-view";
import Button from "./common/Button";
import { router } from "expo-router";
import { useColorScheme } from "react-native";
import Texts from "@/constants/strings/TextConstants";

interface PageSelectedEvent {
    position: number;
  }

function OnboardingPagerView() {
  const [position, setPosition] = useState(0)
  const pagerRef = useRef<PagerView>(null);
  const theme = useColorScheme();

  const handleSelected = (e: NativeSyntheticEvent<PageSelectedEvent>) => {
    setPosition(e.nativeEvent.position);
  }

  const handleClick = () => {
    // Navigate to "sign-in route"
    router.push("/sign-in");
  };

  const handleNextClick = () => {
    if (position < pages.length - 1) {
      pagerRef.current!.setPage(position + 1);
    } else {
      handleClick();
    }
  };

  const pages = [
    { title: Texts.onboardingTitle1, description: Texts.onboardingDescription1 },
    { title: Texts.onboardingTitle2, description: Texts.onboardingDescription2 },
    { title: Texts.onboardingTitle3, description: Texts.onboardingDescription3 },
  ]

  return (
    <View className="flex-auto">
      <PagerView initialPage={0} className="flex-1" style={{ flex: 1 }} onPageSelected={handleSelected} ref={pagerRef}>
        {pages.map((page, index) => <View className="w-full justify-end px-5" key={index}>
            <Text className="text-4xl dark:text-white font-regular">{page.title}</Text>
            <Text className="text-base dark:text-gray-300 font-light">{page.description}</Text>
          </View>
        )}
      </PagerView>
      <View className="flex-row my-4 px-5">
        {
          pages.map((_, index)=> <View className="bg-black dark:bg-white ml-1 rounded-lg w-1 h-1 ease-in-out duration-300" style={{width: index === position ? 12 : 4}} key={index}/>)
        }
      </View>
      <View className="flex flex-row w-full mt-2 p-5">
          <Button title={position === 2 ? Texts.getStarted : Texts.next} className="flex-1 rounded-full" onClick={handleNextClick}/>
          <Button title={Texts.skip} className="flex-1 bg-transparent border-0" textStyle="text-black dark:text-white" onClick={handleClick} textColor={theme === "dark" ? "white" : "black"}/>
      </View>
    </View>
  );
}

export default OnboardingPagerView;
