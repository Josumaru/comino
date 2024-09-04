import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  LayoutAnimation,
} from "react-native";

interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
}

const VolumeAccordion: React.FC<AccordionProps> = ({
  title,
  children,
  open = false,
}) => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);

  // useEffect(() => {
  //   setIsOpen(open);
  // }, [open]);

  // const handleToggleOpen = () => {
  //   setIsOpen((prevState) => !prevState);
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  // };

  return (
    <View>
      {title}
      {/* <TouchableOpacity onPress={handleToggleOpen} activeOpacity={0.6} className='flex flex-row items-center justify-between'>
        <Ionicons name="chevron-down-outline" size={20} color="#03d383" style={{transform: [{rotate: isOpen ? "180deg" : "0deg"}] }}/>
      </TouchableOpacity> */}
      <View
        // style={[styles.contentContainer, !isOpen ? styles.hidden : undefined]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    height: 0,
  },
  contentContainer: {
    overflow: "hidden",
  },
});

export default VolumeAccordion;
