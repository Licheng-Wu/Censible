import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Containers/homescreen/HomeScreen";
import AddExpenseScreen from "../Containers/homescreen/AddExpenseScreen";


const HomeStack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
    >
      <HomeStack.Screen
        name="HomeSreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Add Expense"
        component={AddExpenseScreen}
        options={{
          title: "",
          headerBackTitle: "Back",
        }}
      />
    </HomeStack.Navigator>
  );
}
