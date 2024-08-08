import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";

type Props = {
  title?: string;
  onClick?: () => void;
  className?: string;
  textStyle?: string;
  loading?: boolean;
};

function Button(props: Props) {
  return (
    <TouchableOpacity className={`bg-primary-500 border border-primary-600 rounded-xl justify-center items-center min-h-[62px] ${props.className} ${props.loading ? "opacity-50" : ""}`} disabled={props.loading} activeOpacity={0.7} onPress={props.onClick}>
      <Text className={`font-semibold dark:text-white ${props.textStyle}`}>{props.title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
