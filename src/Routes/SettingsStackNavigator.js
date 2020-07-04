import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../Containers/settings/SettingsScreen";
import CategoryScreen from "../Containers/CategoryScreen";

const SettingsStack = createStackNavigator();

const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <SettingsStack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{
          title: "",
          headerBackTitle: "Back",
        }}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsStackNavigator;
