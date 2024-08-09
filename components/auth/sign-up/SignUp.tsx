import React, { useEffect, useState } from "react";
import Images from "@/constants/Images";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";
import {
  View,
  ImageBackground,
  Text,
  useColorScheme,
  Alert,
} from "react-native";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Texts } from "@/constants/Texts";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpWithPassword } from "@/lib/supabase/supabase";

const SignUpComponent = () => {
  const [color, setColor] = useState<string>("white");
  const [isChecked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const theme = useColorScheme();

  useEffect(() => {
    if (theme == "dark") {
      setColor("#060119");
    } else {
      setColor("white");
    }
  }, [theme]);

  const formSchema = z.object({
    username: z.string().min(3, "Enter at least 3 letters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  
  const onSubmit = (data: SignInParams) => {
    const fetchRequest = async () => {
      setIsLoading(true);
      const response = await signUpWithPassword({email: data.email, password: data.password});
      if(response.error) {
        Alert.alert("Something went wrong", response.error.message);
      } else {
        router.replace("/(tabs)")
      }
      setIsLoading(false);
    }
    fetchRequest()    
  }
  const handleClick = () => {
    router.replace("/sign-in");
  };

  return (
    <View className="flex-1 bg-white dark:bg-[#060119]">
      <StatusBar backgroundColor={color} />
      <ImageBackground
        source={Images.authBackground}
        resizeMode="cover"
        className="flex-1 justify-end relative"
        blurRadius={100}
      >
        <SafeAreaView>
          <View className="flex items-center justify-center">
            <Text className="font-semibold text-gray-700 dark:text-white text-4xl">
              {Texts.signUpTo}
            </Text>
            <Text className="font-semibold text-gray-700 dark:text-white text-4xl">
              {Texts.yourAccount}
            </Text>
          </View>
          <View>
            <Text className="font-regular text-black dark:text-white text-center py-4">
              {Texts.signInWithYourAccount}
            </Text>
          </View>
          <View className="px-5">
            <Controller
              control={control}
              name="username"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <>
                  <Input
                    title={Texts.username}
                    image={Images.profileIcon}
                    className="py-2"
                    value={value}
                    onChange={onChange}
                  />
                  {error && (
                    <Text className="font-regular text-red-500">
                      {error.message}
                    </Text>
                  )}
                </>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <>
                  <Input
                    title={Texts.email}
                    image={Images.emailIcon}
                    className="py-2"
                    value={value}
                    onChange={onChange}
                  />
                  {error && (
                    <Text className="font-regular text-red-500">
                      {error.message}
                    </Text>
                  )}
                </>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <>
                  <Input
                    title={Texts.password}
                    image={Images.lockIcon}
                    className="py-2"
                    value={value}
                    onChange={onChange}
                  />
                  {error && (
                    <Text className="font-regular text-red-500">
                      {error.message}
                    </Text>
                  )}
                </>
              )}
            />
            <View className="flex items-center justify-between flex-row">
              <View className="flex items-center justify-center flex-row gap-2">
                <Checkbox
                  value={isChecked}
                  onValueChange={setChecked}
                  style={{ borderRadius: 5 }}
                />
                <Text className="font-regular dark:text-white text-black">
                  {Texts.rememberMe}
                </Text>
              </View>
              <Button
                className="bg-transparent border-0 p-0 m-0"
                textStyle="dark:text-white text-black font-regular"
                title={Texts.forgotPassword}
              />
            </View>
            <Button
              title={isLoading ? Texts.loading : Texts.signin}
              className="py-4"
              loading={isLoading}
              onClick={handleSubmit(onSubmit)}
            />
            <View className="flex flex-row items-center my-10">
              <View className="flex-1 h-[0.5px] rounded-xl bg-gray-500" />
              <Text className="mx-2 font-regular text-black dark:text-white">
                {Texts.or}
              </Text>
              <View className="flex-1 h-[0.5px] rounded-xl bg-gray-500" />
            </View>
            <BlurView
              intensity={50}
              tint="systemUltraThinMaterial"
              experimentalBlurMethod="dimezisBlurView"
              className="flex flex-row items-center justify-center rounded-xl overflow-hidden border-0.5 border-[#24253c] border-2"
            >
              <Button
                title={Texts.google}
                image={Images.googleIcon}
                className="border-0 flex-1 bg-transparent"
              />
            </BlurView>
            <View className="flex flex-row items-center justify-center gap-1 my-5">
              <Text className="font-regular text-black dark:text-white">
                {Texts.dontHaveAccount}
              </Text>
              <Button
                title={Texts.signin}
                className="bg-transparent border-0"
                textColor="#03d383"
                onClick={handleClick}
              />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default SignUpComponent;
