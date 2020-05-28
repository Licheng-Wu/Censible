import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Containers/homescreen/HomeScreen";
import ExploreScreen from "../Containers/ExploreScreen";
import AddExpenseScreen from "../Containers/AddExpenseScreen";
import TransactionScreen from "../Containers/transaction/TransactionScreen"
import Settings from "../Containers/SettingsScreen";
import TxnStackNavigator from "./TxnStackNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'ios-home'
          } else if (route.name === 'Explore') {
            iconName = 'ios-search';
          } else if (route.name === 'Add Expense') {
            iconName = 'ios-add-circle';
          } else if (route.name === 'Transactions') {
            iconName = 'ios-paper';
          } else {
            iconName = 'ios-settings';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        showLabel: false
      }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Add Expense" component={AddExpenseScreen} />
        <Tab.Screen name="Transactions" component={TxnStackNavigator} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
  );
}