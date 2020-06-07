import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const MonthlyExpense = props => {

  const balance = props.target - props.expense;

  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <Text style={{ color: "#F43356", fontSize: 16, textAlign: "center" }}>
          Expense
        </Text>
        <View style={styles.text}>
          <Text style={{ color: "grey" }}>$</Text>
          <Text style={styles.amount}>{props.expense.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.items}>
        <Text style={{ color: "#00C928", fontSize: 16, textAlign: "center" }}>
          Balance
        </Text>
        <View style={styles.text}>
          <Text style={{ color: "grey" }}>$</Text>
          <Text style={styles.amount}>{balance.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => props.setModalVisible(! props.modalVisible)}>
        <View style={styles.items}>
          <Text style={{ color: "black", fontSize: 16, textAlign: "center" }}>
            Target
        </Text>
          <View style={styles.text}>
            <Text style={{ color: "grey" }}>$</Text>
            <Text style={styles.amount}>{props.target.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4FCFF",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 8,
  },
  items: {
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    height: 85,
    width: 125,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
  },
  text: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  goalContainerItemText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  amount: {
    color: "#262626",
    fontSize: 25,
    textAlign: "center",
  },
});

export default MonthlyExpense;
