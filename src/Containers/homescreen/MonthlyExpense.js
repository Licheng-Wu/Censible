import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MonthlyExpense = (props) => {
  const balance = props.target - props.expense;

  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <Text style={{ color: "#F43356", ...styles.title }}>
          Expense
        </Text>
        <View style={styles.money}>
          <Text style={styles.dollarSign}>$</Text>
          <Text style={styles.amount}>{props.expense.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.items}>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Text style={{ color: "#00C928", ...styles.title }}>
            Balance
          </Text>
          {
            balance < 0 && (
              <Ionicons
                name="ios-alert"
                color="red"
                size={20}
              />
            )
          }
        </View>
        <View style={styles.money}>
          <Text style={styles.dollarSign}>$</Text>
          <Text style={balance >= 0 ? styles.amount : styles.negativeAmount}>
            {balance.toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.items}>
        <Text style={{ color: "black", ...styles.title }}>
          Budget
          </Text>
        <View style={styles.money}>
          <Text style={styles.dollarSign}>$</Text>
          <Text style={styles.amount}>{props.target.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 8,
  },
  items: {
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
    height: 85,
    width: 120,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    textAlign: "center"
  },
  money: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dollarSign: {
    color: "grey"
  },
  amount: {
    color: "#262626",
    fontSize: 25,
    textAlign: "center",
  },
  negativeAmount: {
    color: "red",
    fontSize: 25,
    textAlign: "center"
  }
});

export default MonthlyExpense;
