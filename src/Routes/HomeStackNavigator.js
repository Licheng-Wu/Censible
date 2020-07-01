import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Containers/homescreen/HomeScreen";
import AddExpenseScreen from "../Containers/homescreen/AddExpenseScreen";


const HomeStack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      mode="modal"
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
          headerShown: false,
          cardStyle: {
            marginTop: 150,
            marginLeft: 8,
            marginRight: 8,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          gestureEnabled: true,
          
        }}
      />
    </HomeStack.Navigator>
  );
}
