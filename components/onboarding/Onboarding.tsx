import BackgroundConstants from "@/constants/images/BackgroundConstants";
import OnboardingPagerView from "@/components/onboarding/OnboardingPagerView";
import { View, ImageBackground, useColorScheme } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import ColorConstants from "@/constants/images/ColorConstants";

const Onboarding = () => {
    const [color, setColor] = useState<string[]>(ColorConstants.lightGradientColor);
    const theme = useColorScheme();
  
    useEffect(() => {
      if(theme == "dark"){
        setColor(ColorConstants.darkGradientColor)
      } else {
        setColor(ColorConstants.lightGradientColor)
      }
    }, [theme])
  
    return (
      <View className="flex-1 bg-white dark:bg-[#060119]">
        <ImageBackground source={BackgroundConstants.onboardingBackgroundImage} resizeMode="cover" className="flex-1 justify-end">
          <LinearGradient colors={color} className="h-2/3 flex justify-end">
            <OnboardingPagerView />
          </LinearGradient>
        </ImageBackground>
        <StatusBar backgroundColor={theme === "dark" ? "#060119" : "white"}/>
      </View>
    )
}

export default Onboarding