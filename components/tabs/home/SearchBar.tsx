import { View, Text } from "react-native";
import React from "react";
import Input from "@/components/common/Input";
import IconConstants from "@/constants/images/IconConstants";

const SearchBar = () => {
  return (
    <View className="flex-1 p-5">
      <Input className="h-20 m-0 p-0 border-0 rounded-2xl" title="Search" image={IconConstants.search} />
    </View>
  );
};

export default SearchBar;
