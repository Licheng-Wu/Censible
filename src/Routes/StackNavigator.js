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

const Stack = createStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      headerMode="screen"
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "tomato" },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Awesome app",
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: "Sign Up",
        }}
      />
    </Stack.Navigator>
  );
}
