import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Chapter } from "mangadex-full-api";
import { formatTime } from "@/lib/utils/timeFormater";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface ChapterCardAccordianProps {
  chapter: Chapter[];
}

const ChapterCardAccordian: React.FC<ChapterCardAccordianProps> = ({
  chapter,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, [chapter]);

  const handleToggleOpen = () => {
    setIsOpen((prevState) => !prevState);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <View>
      <TouchableOpacity
        className="rounded-lg overflow-hidden mb-1 relative justify-center"
        onPress={() => {
          if (chapter.length === 1) {
            router.push({
              pathname: "/read/[id]",
              params: { id: chapter[0].id },
            });
          } else {
            handleToggleOpen();
          }
        }}
      >
        {chapter.length === 1 && (
          <View className="rounded-lg overflow-hidden p-3 flex flex-row bg-[#ffffff42]">
            <View className="flex-1 pl-3">
              {chapter[0].updatedAt &&
                (() => {
                  const currentTime = new Date();
                  const updateTime = new Date(chapter[0].readableAt);
                  const diffTime = Math.abs(
                    currentTime.getTime() - updateTime.getTime()
                  );
                  const formatedTime = formatTime(diffTime);
                  return (
                    <Text className="font-regular text-gray-500">
                      {formatedTime}
                    </Text>
                  );
                })()}
              {
                <Text className="font-regular">
                  {chapter[0].title ?? "Untitled"}
                </Text>
              }
              {chapter[0].chapter && (
                <Text className="font-regular text-gray-500">{`Ch. ${chapter[0].chapter}`}</Text>
              )}
              {chapter[0].translatedLanguage && (
                <Text className="font-regular text-gray-500">{`${chapter[0].translatedLanguage.toUpperCase()}`}</Text>
              )}
            </View>
          </View>
        )}
        {chapter.length > 1 && (
          <View>
            <View
              className="rounded-lg overflow-hidden p-3 flex items-start flex-row bg-[#ffffff42]"
              style={[isOpen ? styles.show : undefined]}
            >
              <View className="flex-1 pl-3">
                {chapter[0]?.updatedAt &&
                  (() => {
                    const currentTime = new Date();
                    const updateTime = new Date(chapter[0].readableAt);
                    const diffTime = Math.abs(
                      currentTime.getTime() - updateTime.getTime()
                    );
                    const formatedTime = formatTime(diffTime);
                    return (
                      <Text className="font-regular text-gray-500">
                        {formatedTime}
                      </Text>
                    );
                  })()}
                {
                  <Text className="font-regular">
                    {chapter[0]?.title ?? "Untitled"}
                  </Text>
                }
                {chapter[0]?.chapter && (
                  <Text className="font-regular text-gray-500">{`Ch. ${chapter[0]?.chapter}`}</Text>
                )}
                {chapter[0]?.translatedLanguage && (
                  <Text className="font-regular text-gray-500">{`${chapter[0]?.translatedLanguage.toUpperCase()}`}</Text>
                )}
              </View>
              <Ionicons
                name="chevron-down-outline"
                size={20}
                color="#03d383"
                style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}
              />
            </View>
            {chapter.map((chapter, index) => (
              <TouchableOpacity onPress={() => {
                router.push({
                    pathname: "/read/[id]",
                    params: { id: chapter.id },
                  });
              }} key={index}>
                <View
                  className="overflow-hidden p-3 border-t border-[#FFFFFF80] flex-1 flex bg-[#ffffff42]"
                  style={[
                    styles.contentContainer,
                    !isOpen ? styles.hidden : styles.show,
                  ]}
                >
                  <View className="flex-1 pl-10">
                    {/* {chapter.updatedAt &&
                    (() => {
                      const currentTime = new Date();
                      const updateTime = new Date(chapter.readableAt);
                      const diffTime = Math.abs(
                        currentTime.getTime() - updateTime.getTime()
                      );
                      const formatedTime = formatTime(diffTime);
                      return (
                        <Text className="font-regular text-gray-500">
                          {formatedTime}
                        </Text>
                      );
                    })()} */}
                    {/* {
                    <Text className="font-regular">
                      {chapter.title ?? "Untitled"}
                    </Text>
                  } */}
                    {/* {chapter.chapter && (
                    <Text className="font-regular text-gray-500">{`Ch. ${chapter.chapter}`}</Text>
                  )} */}
                    {chapter.translatedLanguage && chapter.title && (
                      <Text className="font-regular text-gray-500">{`${chapter.translatedLanguage.toUpperCase()} - ${chapter.title ?? "Untitled"}`}</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    height: 0,
    padding: 0,
    borderTopWidth:0,
    borderBottomWidth: 0,
  },
  show: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  contentContainer: {
    overflow: "hidden",
  },
});

export default ChapterCardAccordian;
