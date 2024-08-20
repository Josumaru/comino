import React, { useEffect, useState } from "react";
import ImageConstants from "@/constants/images/BackgroundConstants";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";
import { View, ImageBackground, StyleSheet, Text, useColorScheme, Image } from "react-native";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from 'expo-checkbox';
import { router } from "expo-router";
import TextConstants from "@/constants/strings/TextConstants";
import IconConstants from "@/constants/images/IconConstants";

const SignInComponent = () => {
  const [color, setColor] = useState<string>("white");
  const [isChecked, setChecked] = useState(false);

  const theme = useColorScheme();

  useEffect(() => {
    if (theme == "dark") {
      setColor("#060119");
    } else {
      setColor("white");
    }
  }, [theme]);

  const handleClick = () => {
    router.replace("/sign-up");
  }

  return (
    <View className="flex-1 bg-white dark:bg-[#060119]">
      <StatusBar backgroundColor={color}/>
      <ImageBackground source={ImageConstants.authBackground} resizeMode="cover" className="flex-1 justify-end relative" blurRadius={100}>
        <SafeAreaView>
          <View className="flex items-center justify-center">
            <Text className="font-semibold text-gray-700 dark:text-white text-4xl">{TextConstants.signInTo}</Text>
            <Text className="font-semibold text-gray-700 dark:text-white text-4xl">{TextConstants.yourAccount}</Text>
          </View>
            <View>
              <Text className="font-regular text-black dark:text-white text-center py-4">{TextConstants.signInWithYourAccount}</Text>
            </View>
            <View className="px-5">
              <Input title={TextConstants.email} image={IconConstants.email} className="py-2" />
              <Input title={TextConstants.password} image={IconConstants.lock} className="py-2" />
              <View className="flex items-center justify-between flex-row">
                <View className="flex items-center justify-center flex-row gap-2">
                  <Checkbox value={isChecked} onValueChange={setChecked} style={{borderRadius: 5}}/>
                  <Text className="font-regular dark:text-white text-black">{TextConstants.rememberMe}</Text>
                </View>
                <Button className="bg-transparent border-0 p-0 m-0" textStyle="dark:text-white text-black font-regular" title={TextConstants.forgotPassword}/>
              </View>
              <Button title={TextConstants.signin} className="py-4" />
              <View className="flex flex-row items-center my-10">
                <View className="flex-1 h-[0.5px] rounded-xl bg-gray-500" />
                <Text className="mx-2 font-regular text-black dark:text-white">{TextConstants.or}</Text>
                <View className="flex-1 h-[0.5px] rounded-xl bg-gray-500" />
              </View>
              <BlurView intensity={50} tint="systemUltraThinMaterial" experimentalBlurMethod='dimezisBlurView' className="flex flex-row items-center justify-center rounded-xl overflow-hidden border-0.5 border-[#24253c] border-2">
                <Button title={TextConstants.google} image={IconConstants.google} className="border-0 flex-1 bg-transparent"/>
              </BlurView>
              <View className="flex flex-row items-center justify-center gap-1 my-5">
                <Text className="font-regular text-black dark:text-white">{TextConstants.dontHaveAccount}</Text>
                <Button title={TextConstants.signup} className="bg-transparent border-0" textColor="#03d383" onClick={handleClick}/>
              </View>
            </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  )
}

export default SignInComponent
