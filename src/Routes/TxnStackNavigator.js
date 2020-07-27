import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TransactionDetails from "../Containers/transaction/TransactionDetails";
import TransactionScreen from "../Containers/transaction/TransactionScreen";
import UpdateExpenseScreen from "../Containers/transaction/UpdateExpenseScreen";

const TxnStack = createStackNavigator();

const TxnStackNavigator = () => {
  return (
    <TxnStack.Navigator>
      <TxnStack.Screen
        name="TransactionScreen"
        component={TransactionScreen}
        options={{
          headerShown: false,
        }}
      />
      <TxnStack.Screen
        name="Details"
        component={TransactionDetails}
        options={{
          title: "",
          headerBackTitle: "Back",
        }}
      />
      <TxnStack.Screen
        name="UpdateExpenseScreen"
        component={UpdateExpenseScreen}
        options={{
          title: "",
          headerBackTitle: "Back",
        }}
      />
    </TxnStack.Navigator>
  );
};

export default TxnStackNavigator;
