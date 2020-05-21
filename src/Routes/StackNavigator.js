import React from "react";
import { AppLoading } from "expo";
import {
  Container,
  Header,
  Content,
  InputGroup,
  Input,
  Title,
  Button,
  Text,
} from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Containers/Login";
import SignUp from "../Containers/SignUp";
import HomeScreen from "../Containers/HomeScreen";
import TabNavigator from "./TabNavigator";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator
    // initialRouteName="Login"
    // headerMode="screen"
    // screenOptions={{
    //   headerTintColor: "white",
    //   headerStyle: { backgroundColor: "tomato" },
    // }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: "Sign Up",
        }}
      />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
}