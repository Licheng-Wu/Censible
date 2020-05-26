import * as React from "react";
import { Container, Content, Footer } from "native-base";
import { View, StyleSheet, Text } from "react-native";
import { Icon } from "react-native-elements";
import DataPieChart from "./DataPieChart";
import MonthlyExpense from "./MonthlyExpense";
import { useNavigation } from "@react-navigation/native";
import firebase from '../../../firebaseDb';

const renderData = doc => {
  doc.data()
    .collection("AllExpenses")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(documentSnapshot => {
        console.log(documentSnapshot.data().name);
      })
    })

}

const readData = () => {

  let uid = firebase.auth().currentUser.uid;
  let month = new Date().toString().substr(4, 3);
  console.log(uid);

  firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .collection("May")
      .doc("May 26 2020")
      .collection("AllExpenses")
      .get()
      .then(querySnapshot => {
        const results = [];
        querySnapshot.docs.forEach(doc => {
          results.push(doc.data());
          console.log(results);
        })
      }).catch(error => {
        console.error(error);
      })

      // .doc(exactDate)
      // .collection("AllExpenses")
      // .add({ name: "Laksa", price: 3, description: "Testing second time" })
      // .then(function (docRef) {
      //   console.log("Document successfully written!");
      // })
      // .catch(function (error) {
      //   console.error("Error writing document: ", error);
      // });
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const [expense, setExpense] = React.useState(240);

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
          onPress={readData}
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
    borderWidth: 0,
  },
});
