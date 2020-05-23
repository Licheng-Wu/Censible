import * as React from "react";
import { Container, Content, Footer } from "native-base";
import { View, StyleSheet, Text } from "react-native";
import { Icon } from "react-native-elements";
import firebase from "../../firebaseDb";
import DataPieChart from "./DataPieChart";

export default function HomeScreen({ navigation }) {
  // signOut = firebase... AUTOMATICALLY CALLS signout. Must add the fat arrow function
  signOut = () =>
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        console.log("Signed out");
      })
      .catch(function (error) {
        // An error happened.
      });

  return (
    <Container>
      <Content contentContainerStyle={{ backgroundColor: "#F4FCFF", flex: 1 }}>
        <MonthlyExpense />
        <View style={styles.chartContainer}>
          <DataPieChart />
        </View>
      </Content>
      <Footer style={styles.footerContainer}>
        <Icon
          reverse
          name="ios-log-out"
          color="#529FF3"
          type="ionicon"
          onPress={signOut}
        ></Icon>
        <Icon
          reverse
          name="ios-add"
          color="#529FF3"
          type="ionicon"
          onPress={() => navigation.navigate("AddExpenses")}
        ></Icon>
      </Footer>
    </Container>
  );
}

const MonthlyExpense = () => {
  return (
    <View style={styles.goalsContainer}>
      <View style={styles.goalContainerItems}>
        <Text style={{ color: "#F43356", fontSize: 16, textAlign: "center" }}>
          Expense
        </Text>
        <View style={styles.goalContainerItemAmountView}>
          <Text style={{ color: "grey" }}>$</Text>
          <Text style={styles.goalContainerItemAmount}>240.00</Text>
        </View>
      </View>

      <View style={styles.goalContainerItems}>
        <Text style={{ color: "#00C928", fontSize: 16, textAlign: "center" }}>
          Balance
        </Text>
        <View style={styles.goalContainerItemAmountView}>
          <Text style={{ color: "grey" }}>$</Text>
          <Text style={styles.goalContainerItemAmount}>260.00</Text>
        </View>
      </View>

      <View style={styles.goalContainerItems}>
        <Text style={{ color: "black", fontSize: 16, textAlign: "center" }}>
          Target
        </Text>
        <View style={styles.goalContainerItemAmountView}>
          <Text style={{ color: "grey" }}>$</Text>
          <Text style={styles.goalContainerItemAmount}>500.00</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  goalsContainer: {
    backgroundColor: "#F4FCFF",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 8,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  goalContainerItems: {
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    height: 85,
    width: 125,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
  },
  goalContainerItemAmountView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  goalContainerItemText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  goalContainerItemAmount: {
    color: "#262626",
    fontSize: 25,
    textAlign: "center",
  },
  chartContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    margin: 12,
  },
  footerContainer: {
    marginBottom: 50,
    flexDirection: "row",
    backgroundColor: "#F4FCFF",
    justifyContent: "space-around",
    alignItems: "flex-start",
    elevation: 0,
    borderWidth: 0,
  },
});
