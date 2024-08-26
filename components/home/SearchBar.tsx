import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import IconConstants from "@/constants/images/IconConstants";
import { StyleSheet, TouchableOpacity } from "react-native";

interface SearchBarProps {
  onClick: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({onClick}) => {
  return (
    <View className="flex-1 relative">
      <TouchableOpacity
        className="flex-1 m-5 bg-[#ffffff4f] items-center flex-row"
        style={styles.searchBar}
        activeOpacity={0.8}
        onPress={onClick}
      >
        <Text className="font-regular text-gray-500 pl-5">Search</Text>
        <Image className="w-6 h-6 mr-5" source={IconConstants.search} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderRadius: 40,
    justifyContent: "space-between",
  },
});
