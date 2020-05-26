import * as React from "react";
import { Container, Content, Footer } from "native-base";
import { View, StyleSheet, Text } from "react-native";
import { Icon } from "react-native-elements";
import DataPieChart from "./DataPieChart";
import MonthlyExpense from "./MonthlyExpense";
import { useNavigation } from "@react-navigation/native";
import firebase from '../../../firebaseDb';

const HomeScreen = ({navigation}) => {

  // Monthly expense
  const [expense, setExpense] = React.useState(0);

  const [foodPrice, setFoodPrice] = React.useState(0);
  const [transportPrice, setTransportPrice] = React.useState(0);
  const [educationPrice, setEducationPrice] = React.useState(0);
  const [entertainmentPrice, setEntertainmentPrice] = React.useState(0);
  const [sportsPrice, setSportsPrice] = React.useState(0);
  const [otherPrice, setOtherPrice] = React.useState(0);

  let uid = firebase.auth().currentUser.uid;
  let month = new Date().toString().substr(4, 3);
  let collectionRef = firebase
                        .firestore()
                        .collection("Users")
                        .doc(uid)
                        .collection(month);

  React.useEffect(() => {
    
    // Updates monthly expense
    collectionRef
      .doc("Info")
      .onSnapshot(doc => {
        if (doc.exists) {
          setExpense(doc.data().monthlyTotal);
        }
      }, error => {
        console.error(error);
      })

    // Updates pie chart
    collectionRef
      .where("isCategory", "==", true)
      .onSnapshot(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          if (doc.id === "Food") {
            // prices.splice(0, 1, doc.data().total)
            setFoodPrice(doc.data().total);
          } else if (doc.id === "Transport") {
            // prices.splice(1, 1, doc.data().total)
            setTransportPrice(doc.data().total);
          } else if (doc.id === "Education") {
            // prices.splice(2, 1, doc.data().total)
            setEducationPrice(doc.data().total);
          } else if (doc.id === "Entertainment") {
            // prices.splice(3, 1, doc.data().total)
            setEntertainmentPrice(doc.data().total);
          } else if (doc.id === "Sports") {
            // prices.splice(4, 1, doc.data().total)
            setSportsPrice(doc.data().total);
          } else {
            // prices.splice(5, 1, doc.data().total)
            setOtherPrice(doc.data().total);
          }
        })
      }, error => {
        console.error(error);
      })
  }, [])

  return (
    <Container>
      <Content contentContainerStyle={{ backgroundColor: "#F4FCFF", flex: 1 }}>
        <MonthlyExpense expense={expense} />
        <View style={styles.chart}>
          <DataPieChart style={styles.chart}
            food={foodPrice}
            transport={transportPrice}
            education={educationPrice}
            entertainment={entertainmentPrice}
            sports={sportsPrice}
            others={otherPrice}
          />
        </View>
      </Content>
      <Footer style={styles.footer}>
        <Icon
          reverse
          name="ios-add"
          color="#529FF3"
          type="ionicon"
          onPress={() => navigation.navigate("Add Expense")}
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

export default HomeScreen;