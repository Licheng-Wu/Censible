import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const ExpensePrediction = (props) => {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var dailyAverage = (props.expense / day).toFixed(2);
  var daysInThisMonth = daysInMonth(month, year);
  var predictedExpense = dailyAverage * daysInThisMonth;

  const renderIcon = () => {
    if (predictedExpense <= props.target) {
      return <FontAwesome5 name="smile" color="green" size={40} />;
    } else {
      return (
        <MaterialCommunityIcons
          name="emoticon-sad-outline"
          color="red"
          size={40}
        />
      );
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>Daily Average: ${dailyAverage}</Text>
      </View>
      <View>{renderIcon()}</View>
    </View>
  );
};

export default ExpensePrediction;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    margin: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
    elevation: 5,
    zIndex: -1,
  },
});
