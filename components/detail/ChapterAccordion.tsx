import { formatTime } from "@/lib/utils/timeFormater";
import { Ionicons } from "@expo/vector-icons";
import { current } from "@reduxjs/toolkit";
import { useRouter } from "expo-router";
import { Chapter } from "mangadex-full-api";
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
} from "react-native";
import ChapterCardAccordian from "./ChapterCardAccordian";

interface AccordionProps {
  chapter: Chapter[];
  volume: number;
  open?: boolean;
}

const ChapterAccordion: React.FC<AccordionProps> = ({
  chapter,
  open = false,
  volume,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const [chapters, setChapters] = useState<Chapter[][]>([]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);



  useEffect(() => {
    let currentChapter = chapter[0]?.chapter;
    let tmpChapter: Chapter[] = [];
    const newChapters: Chapter[][] = [];

    chapter.forEach((ch) => {
      if (Number(ch.volume) === volume) {
        if (currentChapter !== ch.chapter) {
          newChapters.push([...tmpChapter]); // Push a copy of tmpChapter
          tmpChapter = []; // Reset tmpChapter
          currentChapter = ch.chapter; // Update currentChapter
        }
        tmpChapter.push(ch);
      }
    });

    if (tmpChapter.length > 0) {
      newChapters.push([...tmpChapter]);
    }

    setChapters(newChapters); // Set all chapters at once
  }, [chapter]);

  return chapters.map((chapter, index) => {
    return (
     <ChapterCardAccordian key={index} chapter={chapter}/>
    );
  });
};

const styles = StyleSheet.create({
  hidden: {
    height: 0,
  },
  contentContainer: {
    overflow: "hidden",
  },
});

export default ChapterAccordion;
