import React, { useEffect, useState } from "react";
import Images from "@/constants/Images";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";
import { View, ImageBackground, useColorScheme } from "react-native";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

export const SignInComponent = () => {
  const [color, setColor] = useState<string>("white");
  const theme = useColorScheme();

  useEffect(() => {
    if (theme == "dark") {
      setColor("black");
    } else {
      setColor("white");
    }
  }, [theme]);

  return (
    <View className="p-5 h-full justify-center" style={{ backgroundColor: color }}>
      <Input title="Name" className="" placeholder="Josumaru" />
      <Input title="Email" className="" placeholder="josumaru@example.com" />
      <Input title="Password" className="" placeholder="*********" />
      <Button title="Sign In" className="mt-5" />
    </View>
    // <ImageBackground source={Images.onboardingBackgroundImage} resizeMode="cover" className="flex-1 justify-end relative" >
    //     <BlurView intensity={5} experimentalBlurMethod='dimezisBlurView' className='w-full h-full absolute'>
    //       <View className='w-full h-full opacity-10 z-20' style={{backgroundColor: color}} />
    //     </BlurView>
    //     <StatusBar backgroundColor={color}/>
    // </ImageBackground>
  );
};
