import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Containers/auth/Login";
import SignUp from "../Containers/auth/SignUp";


const AuthStack = createStackNavigator();

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
    >
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: "Sign Up",
        }}
      />
    </AuthStack.Navigator>
  );
}
