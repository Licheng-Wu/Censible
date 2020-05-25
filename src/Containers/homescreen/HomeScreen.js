import * as React from "react";
import { Container, Content, Footer } from "native-base";
import { View, StyleSheet, Text } from "react-native";
import { Icon } from "react-native-elements";
import DataPieChart from "./DataPieChart";
import MonthlyExpense from "./MonthlyExpense"
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {

  const navigation = useNavigation();
  const [expense, setExpense] = React.useState(0);

  return (
    <Container>
      <Content contentContainerStyle={{ backgroundColor: "#F4FCFF", flex: 1 }}>
        <MonthlyExpense expense={expense} />
        <View style={styles.chart}>
          <DataPieChart style={styles.chart} />
        </View>
      </Content>
      <Footer style={styles.footer}>
        <Icon
          reverse
          name="ios-add"
          color="#529FF3"
          type="ionicon"
          onPress={() => navigation.navigate("Add Expense", {
            expense: expense,
            setExpense: setExpense
          })}
        />
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  chart: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    margin: 12,
  },
  footer: {
    marginBottom: 20,
    flexDirection: "row",
    backgroundColor: "#F4FCFF",
    justifyContent: "space-around",
    alignItems: "flex-start",
    elevation: 0,
    borderWidth: 0
  },
});
