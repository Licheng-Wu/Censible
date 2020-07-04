import React from "react";
import { StyleSheet, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import firebase from "../../../firebaseDb";

const DataPieChart = props => {

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

  const mapDataToPieChart = dataObj => {
    const colorList = ["#FFE11D", "#00A74F", "#EE3253", "#00B8C4", "#B7881F"];

    const results = [];
    for (let key in dataObj) {
      if (key !== "monthlyTarget" && key !== "monthlyTotal") { // Filter non-category
        if (dataObj[key] > 0) { // Only push if category amount > 0
          results.push({ // Push each category into results
            name: key,
            population: dataObj[key],
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          })
        }
      }
    }
    console.log(results)
    // Sorts data in descending order
    results.sort((obj1, obj2) => obj2.population - obj1.population);

    // Limits data to max 5 categories
    if (results.length > 5) {
      let newResult;
      // Locates index of category "Others"
      const othersIndex = results.findIndex(obj => obj.name === "Others");

      // No "Others" category OR "Others" is not in 1st 4 categories
      if (othersIndex === -1 || othersIndex >= 4) {
        // Adds first 4 categories to newResult
        newResult = results.slice(0, 4);
        // Collates remaining categories' amount
        const remainingAmount = results.slice(4, results.length)
          .reduce((total, current) => {
            return total + current.population;
          }, 0);
        newResult.push({ // Creates "Others" as last category and pushes remaining amount
          name: "Others",
          population: remainingAmount,
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        });
      } else { // "Others" is in 1st 4 categories
        // Adds first 5 categories to newResult
        newResult = results.slice(0, 5);
        // Collates remaining categories' amount
        const remainingAmount = results.slice(5, results.length)
          .reduce((total, current) => {
            return total + current.population;
          }, 0);
        // Adds remaining amount to Others
        newResult[othersIndex].population += remainingAmount;
      }
      // Sorts newResult in descending order
      newResult.sort((obj1, obj2) => obj2.population - obj1.population);
      // Add different color to pie chart
      for (let i = 0; i < 5; i++) {
        newResult[i].color = colorList[i];        
      }
      return newResult;
    } else { // # of categories did not exceed 5
      // Add different color to pie chart
      for (let i = 0; i < results.length; i++) {
        results[i].color = colorList[i];        
      }
      return results;
    }
  }

  const data = mapDataToPieChart(props.data);

  // const data = [
  //   {
  //     name: "Food",
  //     population: props.food,
  //     color: "#FFE11D",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: "Transport",
  //     population: props.transport,
  //     color: "#00A74F",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: "Education",
  //     population: props.education,
  //     color: "#EE3253",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: "Entertainment",
  //     population: props.entertainment,
  //     color: "#00B8C4",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: "Sports",
  //     population: props.sports,
  //     color: "#B7881F",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: "Others",
  //     population: props.others,
  //     color: "#483d8b",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 15
  //   }
  // ];

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

export default DataPieChart;