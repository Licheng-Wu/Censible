import React from "react";
import { StyleSheet, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function DataPieChart() {
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const data = [
    {
      name: "Food",
      population: 100,
      color: "#FFE11D",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Transport",
      population: 50,
      color: "#00A74F",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Leisure",
      population: 37,
      color: "#EE3253",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Sports",
      population: 34,
      color: "#00B8C4",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Others",
      population: 19,
      color: "#B7881F",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <PieChart
      data={data}
      width={screenWidth - 50}
      height={220}
      chartConfig={chartConfig}
      accessor="population"
      backgroundColor="white"
      paddingLeft="0"
      absolute
    />
  );
}
