import { View, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "@/constants/Images";
import { LinearGradient } from "expo-linear-gradient";
import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";

const Index = () => {
  return (
    <ImageBackground source={Images.onboardingBackgroundImage} resizeMode="cover" className="flex-1 justify-end">
        <LinearGradient colors={Colors.gradientColor} className="p-5 h-2/3 flex justify-end">
          <Text className="text-4xl dark:text-white font-regular">
            Welcome to Comino
          </Text>
          <Text className="text-xl dark:text-gray-200 font-light">
            Read 1000+ of Manga in single Apps,
          </Text>
          <View className="flex flex-row w-full">
            <Button title="Get Started" className="flex-1 rounded-full"/>
            <Button title="Skip" className="flex-1 bg-transparent border-0"/>
          </View>
        </LinearGradient>
    </ImageBackground>
  );
};

export default Index;
