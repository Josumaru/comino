import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { formatTime } from "@/lib/utils/timeFormater";
import { useRouter } from "expo-router";
import { Chapter } from "mangadex-full-api";
import { Pagination } from "./Pagination";

interface ChapterListProps {
  chapters: Chapter[];
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const router = useRouter();

  return (
    <View className="flex flex-col mx-5 pb-5 pt-2">
      {chapters
        ?.slice(currentPage * 10 - 10, currentPage * 10)
        .map((chapter, index) => (
          <TouchableOpacity
            key={index}
            className="rounded-lg overflow-hidden mb-1"
            onPress={() => {
              router.push({
                pathname: "/read/[id]",
                params: { id: chapter.id },
              });
            }}
          >
            <View className="rounded-lg overflow-hidden p-3 flex flex-row bg-[#ffffff42]">
              <View className="flex-1 pl-3">
                {chapter.updatedAt &&
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
                  })()}
                {
                  <Text className="font-regular">
                    {chapter.title ?? "Untitled"}
                  </Text>
                }
                {chapter.chapter && (
                  <Text className="font-regular text-gray-500">{`Ch. ${chapter.chapter}`}</Text>
                )}
                {chapter.volume && (
                  <Text className="font-regular text-gray-500">{`Vol. ${chapter.volume}`}</Text>
                )}
                {chapter.translatedLanguage && (
                  <Text className="font-regular text-gray-500">{`${chapter.translatedLanguage.toUpperCase()}`}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(chapters?.length! / 10)}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </View>
  );
};

export default ChapterList;
