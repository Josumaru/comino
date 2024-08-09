import React from "react";
import { Image, ImageSourcePropType, Text } from "react-native";
import { TouchableOpacity } from "react-native";


type Props = {
  title?: string;
  onClick?: () => void;
  className?: string;
  textStyle?: string;
  loading?: boolean;
  textColor?: string;
  image?: ImageSourcePropType;
};

function Button(props: Props) {
  return (
    <TouchableOpacity className={`bg-primary-500 border border-primary-600 rounded-xl justify-center items-center min-h-[62px] flex flex-row gap-2 ${props.className} ${props.loading ? "opacity-50" : ""}`} disabled={props.loading} activeOpacity={0.7} onPress={props.onClick}>
      {props.image ? <Image source={props.image} className="w-6 h-6"/> : null}
      <Text className={`font-semibold text-white ${props.textStyle}`} style={props.textColor ? { color: props.textColor} : {}}>{props.title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
