import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MonthlyExpense = () => {
  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <Text style={{ color: "#F43356", fontSize: 16, textAlign: "center" }}>
          Expense
          </Text>
        <View style={styles.text}>
          <Text style={{ color: "grey" }}>$</Text>
          <Text style={styles.amount}>240.00</Text>
        </View>
      </View>

      <View style={styles.items}>
        <Text style={{ color: "#00C928", fontSize: 16, textAlign: "center" }}>
          Balance
          </Text>
        <View style={styles.text}>
          <Text style={{ color: "grey" }}>$</Text>
          <Text style={styles.amount}>260.00</Text>
        </View>
      </View>

      <View style={styles.items}>
        <Text style={{ color: "black", fontSize: 16, textAlign: "center" }}>
          Target
          </Text>
        <View style={styles.text}>
          <Text style={{ color: "grey" }}>$</Text>
          <Text style={styles.amount}>500.00</Text>
        </View>
      </View>
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

})

export default MonthlyExpense;