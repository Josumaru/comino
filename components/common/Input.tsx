import React, { useEffect, useState } from "react";
import { TextInput, Image, StyleSheet, View, Text, TouchableOpacity, ImageSourcePropType, useColorScheme } from "react-native";
import Images from "@/constants/Images";
import { BlurView } from "expo-blur";

type Props = {
  title?: string;
  value?: string;
  onChange?: (text: string) => void;
  className?: string;
  image? : ImageSourcePropType;
};

const Input = (props: Props) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [color, setColor] = useState("white")
  const theme = useColorScheme();

  useEffect(() => {
    if (theme == "dark") {
      setColor("white");
    } else {
      setColor("#060119");
    }
  })

  return (
    <View className={`space-y-2 w-full ${props.className}`}>
      <BlurView intensity={50} experimentalBlurMethod='dimezisBlurView' style={[styles.inputContainer, isFocused && styles.inputFocused]} className="bg-opacity-20">
        <Image source={props.image} style={{ width: 24, height: 24 }} tintColor={color}/>
        <TextInput
          className="text-black dark:text-white"
          value={props.value}
          placeholder={props.title}
          onChangeText={props.onChange}
          secureTextEntry={props.title === "Password" && !isShowPassword}
          style={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {props.title === "Password" && (
          <TouchableOpacity onPress={() => setIsShowPassword(!isShowPassword)}>
            <Image source={isShowPassword ? Images.eyeIcon : Images.eyeSlashedIcon} style={{ width: 24, height: 24 }}  tintColor={color} />
          </TouchableOpacity>
        )}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 64,
    borderWidth: 2,
    overflow: "hidden",
    borderColor: "#24253c",
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: "#03d383",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal:10,
    paddingVertical: 16,
    fontWeight: "500",
  },
});

export default Input;
