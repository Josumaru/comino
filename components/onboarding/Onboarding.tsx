import Images from "@/constants/Images";
import OnboardingPagerView from "@/components/OnboardingPagerView";
import { ImageBackground, useColorScheme } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";

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
      <ImageBackground source={Images.onboardingBackgroundImage} resizeMode="cover" className="flex-1 justify-end">
        <LinearGradient colors={color} className="h-2/3 flex justify-end">
          <OnboardingPagerView />
        </LinearGradient>
      </ImageBackground>
    )
}

export default Onboarding