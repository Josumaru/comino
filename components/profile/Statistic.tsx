import { View, Text, Dimensions } from "react-native";
import React from "react";
import ColoredTitle from "../common/ColoredTitle";
import { ContributionGraph } from "react-native-chart-kit";

interface StatisticProps {
  history: HistoryParams[];
  onRefresh: boolean;
}

const Statistic = ({ history, onRefresh }: StatisticProps) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonth = new Date().getMonth();
  const lastFourMonths = [
    monthNames[(currentMonth - 3 + 12) % 12],
    monthNames[(currentMonth - 2 + 12) % 12],
    monthNames[(currentMonth - 1 + 12) % 12],
    monthNames[currentMonth],
  ];
  const screenWidth = Dimensions.get("window").width;
  const commitsData = history.map((page) => ({
    date: page.readed_at,
    count: 1,
  }));

  const handleToolTip: any = {};
  return (
    <View className="relative" style={{ height: 230 }}>
      <View className="px-5 absolute">
        <ColoredTitle
          firstText="Reading"
          secondText="Graph"
          type="firstPrimary"
        />
      </View>
      <View className="px-10 flex-row justify-between pt-10">
        {lastFourMonths.map((month) => (
          <Text key={month} className="font-regular">{month}</Text>
        ))}
      </View>
      <View className="right-5 absolute bottom-0">
        <ContributionGraph
          tooltipDataAttrs={(value) => handleToolTip}
          values={commitsData}
          endDate={new Date()}
          numDays={Math.ceil(screenWidth / 3.5)}
          width={screenWidth}
          height={220}
          yLabelsOffset={0}
          yAxisLabel="0"
          chartConfig={{
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            labels: ["das", "das"],
            barRadius: 20,
            labelColor: () => "transparent",
            color: (opacity = 1) =>
              opacity == 1 ? `rgba(26, 255, 131, ${opacity})` : "#FFFFFF50",
            strokeWidth: 2,
            barPercentage: 0.5,
            useShadowColorFromDataset: false,
          }}
        />
      </View>
    </View>
  );
};

export default Statistic;
