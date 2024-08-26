import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Manga } from "mangadex-full-api";

interface DetailTabProps {
    manga: Manga;
}

const DetailTab: React.FC<DetailTabProps> = ({manga}) => {
  return (
    <View className="flex flex-col pb-24">
      <Text className="px-5 font-regular text-xl">Genres</Text>
      <ScrollView
        className="flex-row "
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {manga?.tags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            className={`min-h-0 bg-primary-500 border border-primary-600 rounded-lg p-2 ${
              index === 0 ? "ml-5 mr-2" : "mr-2"
            } ${index === manga?.tags.length - 1 ? "mr-5" : ""}`}
            activeOpacity={0.5}
          >
            <Text className="text-sm font-regular p-0 text-white">
              {tag.localName}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text className="font-regular text-xl px-5">Synopsis</Text>
      <Text className="text-base font-regular color-gray-700 px-5">
        {manga?.description.localString}
      </Text>
    </View>
  );
};

export default DetailTab;
