import { Image } from "expo-image";
import {
  View,
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import { TextInput } from "react-native";
import IconConstants from "@/constants/images/IconConstants";
import { StyleSheet } from "react-native";
import { Manga } from "mangadex-full-api";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { getCover } from "@/lib/mangadex/mangadex";

interface SearchBarOverlayProps {
  handleClick: () => void;
}

const SearchBarOverlay: React.FC<SearchBarOverlayProps> = ({ handleClick }) => {
  const [value, setValue] = useState<string>("");
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [mangaCover, setMangaCover] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const router = useRouter();

  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setValue(e.nativeEvent.text);
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await Manga.search({
        title: value,
      });
      for (let i = 0; i < response.length; i++) {
        const fileName = await response[i].getCovers();
        const cover = await getCover({
          id: response[i].id,
          fileName: fileName[0].fileName,
          size: 256,
        });
        setMangaCover((prevState) => [...prevState, cover]);
        setMangaList((precState) => [...precState, response[i]]);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      setMangaList([]);
      setMangaCover([]);
      handleSearch();
    }, 750);

    setDebounceTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <View className="h-screen absolute w-screen z-50">
      <BlurView
        className="w-full border-b border-[#9c98988f]"
        experimentalBlurMethod="dimezisBlurView"
        intensity={80}
      >
        <View
          className="m-5 bg-[#ffffff4f] items-center flex-row"
          style={styles.searchBar}
        >
          <TextInput
            autoFocus
            value={value}
            onChange={handleChange}
            keyboardType="web-search"
            className="pl-5 flex-1 font-regular"
            placeholder="Search"
          />
          <Image className="w-6 h-6 mr-5" source={IconConstants.search} />
        </View>
      </BlurView>
      <BlurView
        intensity={100}
        experimentalBlurMethod="dimezisBlurView"
        className="py-5"
      >
        {mangaList.length == 0 && !isLoading && (
          <View className="h-48 w-full items-center justify-center">
            <Text className="font-regular text-9xl text-red-500">404</Text>
            <Text className="font-regular text-xl text-red-500">NOT FOUND</Text>
          </View>
        )}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="flex mt-5 px-5 gap-2 flex-row">
            {isLoading
              ? Array.from({ length: 5 }).map((array, index) => (
                  <View key={index}>
                    <View
                      style={{
                        width: 128,
                        height: 192,
                        marginBottom: 1,
                        backgroundColor: "#FFFFFF50",
                        borderRadius: 8,
                      }}
                    />
                    <Text>{"\n"}</Text>
                  </View>
                ))
              : mangaList.map((manga, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{ width: 128 }}
                    onPress={() =>
                      router.push({
                        pathname: "/detail/[id]",
                        params: { id: manga.id },
                      })
                    }
                    activeOpacity={0.8}
                  >
                    <Image
                      cachePolicy={"disk"}
                      source={mangaCover[index]}
                      style={{
                        width: 128,
                        height: 192,
                        backgroundColor: "#FFFFFF50",
                        borderRadius: 8,
                      }}
                    />
                    <Text className="text-black dark:text-white overflow-clip line-clamp-2 font-regular">
                      {manga.localTitle}
                    </Text>
                  </TouchableOpacity>
                ))}
          </View>
        </ScrollView>
        <View className="p-5 flex w-full flex-row justify-between items-center">
          <Text className="font-semibold text-xl ">Search History</Text>
          <Text className="font-regular color-primary-500">Clear all</Text>
        </View>
        <View className="mx-5 flex flex-row flex-wrap gap-2">
          <View className="bg-[#ffffff41] rounded-lg p-1">
            <Text className="font-regular">Naruto</Text>
          </View>
          <View className="bg-[#ffffff41] rounded-lg p-1">
            <Text className="font-regular">Tensura</Text>
          </View>
          <View className="bg-[#ffffff41] rounded-lg p-1">
            <Text className="font-regular">Furina</Text>
          </View>
          <View className="bg-[#ffffff41] rounded-lg p-1">
            <Text className="font-regular">Demon hunter</Text>
          </View>
          <View className="bg-[#ffffff41] rounded-lg p-1">
            <Text className="font-regular">Demon hunter</Text>
          </View>
        </View>
        <View className="p-5 flex w-full flex-row justify-between items-center">
          <Text className="font-semibold text-xl">Developer Choices</Text>
          <Text className="font-regular color-primary-500">Clear all</Text>
        </View>
        <View className="mx-5 flex flex-row flex-wrap gap-2">
          <View className="bg-[#ffffff41] rounded-lg p-1">
            <Text className="font-regular">Naruto</Text>
          </View>
          <View className="bg-[#ffffff41] rounded-lg p-1">
            <Text className="font-regular">Tensura</Text>
          </View>
          <View className="bg-[#ffffff41] rounded-lg p-1">
            <Text className="font-regular">Furina</Text>
          </View>
          <View className="bg-[#ffffff41] rounded-lg p-1">
            <Text className="font-regular">Demon hunter</Text>
          </View>
          <View className="bg-[#ffffff41] rounded-lg p-1">
            <Text className="font-regular">Demon hunter</Text>
          </View>
          <View className="bg-[#ffffff41] rounded-lg p-1">
            <Text className="font-regular">Demon hunter</Text>
          </View>
          <View className="bg-[#ffffff41] rounded-lg p-1">
            <Text className="font-regular">Demon hunter</Text>
          </View>
        </View>
      </BlurView>
      <TouchableOpacity
        className="flex-1"
        activeOpacity={0.8}
        onPress={handleClick}
      />
    </View>
  );
};

export default SearchBarOverlay;

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderRadius: 40,
    justifyContent: "space-between",
  },
});
