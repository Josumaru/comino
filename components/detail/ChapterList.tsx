import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { formatTime } from "@/lib/utils/timeFormater";
import { useRouter } from "expo-router";
import { Chapter } from "mangadex-full-api";
import { Pagination } from "./Pagination";
import ColoredTitle from "../common/ColoredTitle";
import VolumeAccordion from "./VolumeAccordion";
import ChapterAccordion from "./ChapterAccordion";

interface ChapterListProps {
  chapters: Chapter[];
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [volume, setVolume] = useState<number[]>();
  const [chapter, setChapter] = useState<number[]>();
  const [showedVolume, setShowedVolume] = useState<number[]>();
  const [showedChapter, setShowedChapter] = useState<number[]>();
  const { height } = Dimensions.get("window");

  useEffect(() => {
    setVolume([]);
    setChapter([]);
    let volumesSet = new Set();
    chapters.forEach((chapter) => {
      let volumeNumber = Number(chapter.volume);
      if (!volumesSet.has(volumeNumber)) {
        volumesSet.add(volumeNumber);
        setVolume((prev) => [...(prev || []), volumeNumber]);
      }
    });
    let ChapterSet = new Set();
    chapters.forEach((chapter) => {
      let chapterNumber = Number(chapter.chapter);
      if (!ChapterSet.has(chapterNumber)) {
        volumesSet.add(chapterNumber);
        setChapter((prev) => [...(prev || []), chapterNumber]);
      }
    });
  }, [chapters]);

  useEffect(() => {
    setShowedVolume([]);
    chapters?.slice(currentPage * 10 - 10, currentPage * 10).map((chapter) => {
      setShowedVolume((prev) => [...(prev || []), Number(chapter.volume)]);
      setShowedChapter((prev) => [...(prev || []), Number(chapter.chapter)]);
    });
  }, [currentPage]);

  return (
    <View className="flex flex-col mx-5 pb-5 pt-2">
      {volume?.map((volume, index) => {
        return (
          showedVolume?.includes(volume) && (
            <View key={index}>
              <VolumeAccordion
                open={true}
                title={
                  <ColoredTitle
                    firstText="Volume"
                    secondText={volume.toString()}
                    type="firstPrimary"
                  />
                }
                children={
                  <View>
                    <ChapterAccordion
                      volume={volume}
                      chapter={chapters?.slice(
                        currentPage * 10 - 10,
                        currentPage * 10
                      )}
                    />
                    {
                      // chapters
                      // ?.slice(currentPage * 10 - 10, currentPage * 10)
                      // .map((chapter, index) => {
                      //   let duplicateChapter = []
                      //   if (
                      //     chapter.volume === volume.toString() ||
                      //     (chapter.volume === null && volume === 0)
                      //   ) {
                      //     if(chapter.chapter === )
                      //     return showedChapter?.includes(Number(chapter.chapter)) && (
                      //     );
                      //   }
                      // })
                    }
                  </View>
                }
              />
            </View>
          )
        );
      })}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(chapters?.length! / 10)}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* {chapters
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
      /> */}
    </View>
  );
};

export default ChapterList;
