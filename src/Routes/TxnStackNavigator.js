import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DateList from "../Containers/transaction/DateList";
import TransactionDetails from "../Containers/transaction/TransactionDetails";
import TransactionScreen from "../Containers/transaction/TransactionScreen";

const TxnStack = createStackNavigator();

const TxnStackNavigator = () => {
  return (
    <TxnStack.Navigator
    // initialRouteName="TransactionScreen"
    // headerMode="screen"
    // screenOptions={{
    //   headerTintColor: "white",
    //   headerStyle: { backgroundColor: "tomato" },
    // }}
    >
      <TxnStack.Screen
        name="TransactionScreen"
        component={TransactionScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <TxnStack.Screen
        name="DateList"
        component={DateList}
        options={{ headerShown: false }}
      /> */}
      <TxnStack.Screen
        name="Details"
        component={TransactionDetails}
        options={{
          title: "",
          headerBackTitle: "Back"
                    
        }}
      />
    </TxnStack.Navigator>
  );
};

export default TxnStackNavigator;
