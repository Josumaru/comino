import React, { useState } from "react";
import { TextInput, Image, View, Text, TouchableOpacity } from "react-native";

type Props = {
  title?: string;
  value?: string;
  placeholder?: string;
  onChange?: (text: string) => void;
  className?: string;
};

const Input = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 w-full ${props.className}`}>
      <Text className="text-base font-regular">{props.title}</Text>
      <View className="w-full h-16 bg-white border-2 border-gray-200 px-4 rounded-2xl focus:border-primary-500  items-center flex-row ">
        <TextInput
          value={props.value}
          placeholder={props.placeholder}
          onChangeText={props.onChange}
          secureTextEntry={props.title === "Password" && !showPassword}
          className="flex-1 w-full text-base font-medium"
        />
        {props.title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text>Hide</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;
