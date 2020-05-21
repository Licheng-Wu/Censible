import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button } from "native-base/src/basic/Button";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "../Routes/TabNavigator";

export default function HomeScreen({ navigation }) {
  return (
    <View style={homeStyles.container}>
      <MonthlyExpense style={homeStyles.expense} />
      <Button
        style={homeStyles.button}
        onPress={() => navigation.navigate("AddExpenses")}
      >
        <Text>Add Expense</Text>
      </Button>
    </View>
  );
}

const MonthlyExpense = () => {
  return (
    <View style={expenseStyles.container}>
      <View style={expenseStyles.box}>
        <Text style={expenseStyles.text}> Income </Text>
        <Text style={expenseStyles.number}> 0 </Text>
      </View>

      <View style={expenseStyles.box}>
        <Text style={expenseStyles.text}> Expenses </Text>
        <Text style={expenseStyles.number}> 0 </Text>
      </View>

      <View style={expenseStyles.box}>
        <Text style={expenseStyles.text}> Balance </Text>
        <Text style={expenseStyles.number}> 0 </Text>
      </View>
    </View>
  );
};

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  expense: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  button: {
    marginBottom: 10,
  }
});

const expenseStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    flex: 1,
    backgroundColor: "white",
    borderColor: "grey",
    height: 80,
  },
  text: {
    color: "black",
    fontSize: 25,
    textAlign: "center",
  },
  number: {
    color: "black",
    fontSize: 35,
    textAlign: "center",
  }
})