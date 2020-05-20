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
    <View style={styles.container}>
      <MonthlyExpense style={styles.expense} />
      <Button
        style={styles.button}
        onPress={() => navigation.navigate("AddExpenses")}
      >
        <Text>Add Expense</Text>
      </Button>
    </View>
  );
}

const MonthlyExpense = () => {
  return (
    <View style={styles.innerContainer}>
      <View style={styles.box}>
        <Text style={styles.text}> Income </Text>
        <Text style={styles.number}> 0 </Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.text}> Expenses </Text>
        <Text style={styles.number}> 0 </Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.text}> Balance </Text>
        <Text style={styles.number}> 0 </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: 10,
    width: 200,
    height: 30,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 20,
  },
  button: {
    marginTop: 30,
  },
});
