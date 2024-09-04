import { View, Image } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ColoredTitle from "../common/ColoredTitle";
import IconConstants from "@/constants/images/IconConstants";
import SettingButton from "./SettingButton";
import LogoutButton from "./LogoutButton";
import SettingBottomSheet from "./SettingBottomSheet";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = () => {
  // initial state
  const [theme, setTheme] = useState<string>("System");
  const [language, setLanguage] = useState<string>("en");

  // ref
  const languageBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const themeBottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const languageHandlePresentModalPress = useCallback(() => {
    languageBottomSheetModalRef.current?.present();
  }, []);
  const themeHandlePresentModalPress = useCallback(() => {
    themeBottomSheetModalRef.current?.present();
  }, []);

  const storeTheme = async (value: string) => {
    themeBottomSheetModalRef.current?.close();
    try {
      await AsyncStorage.setItem("theme", value);
      setTheme(value);
    } catch (e) {
      setTheme("system");
    }
  };

  const getTheme = async () => {
    try {
      const value = await AsyncStorage.getItem("theme");
      if (value !== null) {
        setTheme(value);
      } else {
        setTheme("system");
      }
    } catch (e) {
      setTheme("system");
    }
  };

  const storeLanguage = async (value: string) => {
    languageBottomSheetModalRef.current?.close();
    try {
      await AsyncStorage.setItem("language", value);
      setLanguage(value);
    } catch (e) {
      setLanguage("en");
    }
  };

  const getLanguage = async () => {
    try {
      const value = await AsyncStorage.getItem("language");
      if (value !== null) {
        setLanguage(value);
      } else {
        setLanguage("en");
      }
    } catch (e) {
      setLanguage("en");
    }
  };

  useEffect(() => {
    getTheme();
    getLanguage();
  }, []);

  return (
    <View className="px-5 pb-24">
      <View className="py-5">
        <ColoredTitle
          firstText="Appearance"
          secondText="Settings"
          type="secondPrimary"
        />
      </View>
      <View>
        <SettingButton
          title="Language"
          value={language.toUpperCase()}
          icon={IconConstants.language}
          onPress={languageHandlePresentModalPress}
        />
        {/* Languages Bottom sheet */}
        <BottomSheetModal
          ref={languageBottomSheetModalRef}
          snapPoints={snapPoints}
        >
          <BottomSheetView className="p-5">
            <Text className="font-bold text-xl">Language</Text>
            <TouchableOpacity onPress={() => storeLanguage("en")}>
              <View className="flex-row w-full py-2 justify-between">
                <Text className="font-regular">EN</Text>
                <Text className="font-regular color-[#00000055]">
                  {language == "en" ? "Selected" : ""}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => storeLanguage("id")}>
              <View className="flex-row w-full py-2 justify-between">
                <Text className="font-regular">ID</Text>
                <Text className="font-regular color-[#00000055]">
                  {language == "id" ? "Selected" : ""}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => storeLanguage("jp")}>
              <View className="flex-row w-full py-2 justify-between">
                <Text className="font-regular">JP</Text>
                <Text className="font-regular color-[#00000055]">
                  {language == "jp" ? "Selected" : ""}
                </Text>
              </View>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheetModal>
        <SettingButton
          onPress={themeHandlePresentModalPress}
          title="Theme"
          value={theme.replace(theme[0], theme[0].toUpperCase())}
          icon={IconConstants.theme}
        />
        {/* Theme bottom sheet */}
        <BottomSheetModal
          ref={themeBottomSheetModalRef}
          snapPoints={snapPoints}
        >
          <BottomSheetView className="p-5">
            <Text className="font-bold text-xl">Theme</Text>
            <TouchableOpacity onPress={() => storeTheme("system")}>
              <View className="flex-row w-full py-2 justify-between">
                <View className="flex-row gap-1 items-center justify-center">
                  <Image
                    source={IconConstants.system}
                    style={{ height: 24, width: 24 }}
                  />
                  <Text className="font-regular">System</Text>
                </View>
                <Text className="font-regular color-[#00000055]"></Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => storeTheme("light")}>
              <View className="flex-row w-full py-2 justify-between">
                <View className="flex-row gap-1 items-center justify-center">
                  <Image
                    source={IconConstants.sun}
                    style={{ height: 24, width: 24 }}
                  />
                  <Text className="font-regular">Light</Text>
                </View>
                <Text className="font-regular color-[#00000055]">Selected</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => storeTheme("dark")}>
              <View className="flex-row w-full py-2 justify-between">
                <View className="flex-row gap-1 items-center justify-center">
                  <Image
                    source={IconConstants.moon}
                    style={{ height: 24, width: 24 }}
                  />
                  <Text className="font-regular">Dark</Text>
                </View>
                <Text className="font-regular color-[#00000055]"></Text>
              </View>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheetModal>
        <SettingButton title="Report" icon={IconConstants.report} />
        <SettingButton title="Info" icon={IconConstants.info} />
        <View className="py-5">
          <ColoredTitle
            firstText="Account"
            secondText="Settings"
            type="firstPrimary"
          />
        </View>
        <LogoutButton />
      </View>
    </View>
  );
};

export default Settings;
