import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TransactionDetails from "../Containers/transaction/TransactionDetails";
import TabNavigator from "./TabNavigator";

const ModalStack = createStackNavigator();

const ModalStackNavigator = () => {
  return (
    <ModalStack.Navigator
      mode="modal"
      screenOptions={{
        cardStyle: {backgroundColor: "transparent"},
        cardOverlayEnabled: true,
      }}
    // initialRouteName="TransactionScreen"
    // headerMode="screen"
    // screenOptions={{
    //   headerTintColor: "white",
    //   headerStyle: { backgroundColor: "tomato" },
    // }}
    >
      <ModalStack.Screen
        name="Tab"
        component={TabNavigator}
        options={{
          headerShown: false
        }}
      />
      <ModalStack.Screen
        name="Details"
        component={TransactionDetails}
        options={{
          headerShown: false,
          cardStyle: {marginTop: 80}
        }}
      />
    </ModalStack.Navigator>
  );
};

export default ModalStackNavigator;