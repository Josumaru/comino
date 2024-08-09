import Images from "@/constants/Images";
import OnboardingPagerView from "@/components/OnboardingPagerView";
import { View, ImageBackground, useColorScheme } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

const Onboarding = () => {
    const [color, setColor] = useState<string[]>(Colors.lightGradientColor);
    const theme = useColorScheme();
  
    useEffect(() => {
      if(theme == "dark"){
        setColor(Colors.darkGradientColor)
      } else {
        setColor(Colors.lightGradientColor)
      }
    }, [theme])
  
    return (
      <View className="flex-1 bg-white dark:bg-[#060119]">
        <ImageBackground source={Images.onboardingBackgroundImage} resizeMode="cover" className="flex-1 justify-end">
          <LinearGradient colors={color} className="h-2/3 flex justify-end">
            <OnboardingPagerView />
          </LinearGradient>
        </ImageBackground>
        <StatusBar backgroundColor={theme === "dark" ? "#060119" : "white"}/>
      </View>
    )
}

export default Onboarding