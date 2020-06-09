import * as React from "react";
import { Container, Content, Footer } from "native-base";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DataPieChart from "./DataPieChart";
import MonthlyExpense from "./MonthlyExpense";
import MonthlyTargetModal from "./MonthlyTargetModal";
import firebase from "../../../firebaseDb";

const HomeScreen = ({ navigation }) => {
  // Monthly expense
  const [expense, setExpense] = React.useState(0);
  const [target, setTarget] = React.useState(0);

  const [foodPrice, setFoodPrice] = React.useState(0);
  const [transportPrice, setTransportPrice] = React.useState(0);
  const [educationPrice, setEducationPrice] = React.useState(0);
  const [entertainmentPrice, setEntertainmentPrice] = React.useState(0);
  const [sportsPrice, setSportsPrice] = React.useState(0);
  const [otherPrice, setOtherPrice] = React.useState(0);

  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    let uid = firebase.auth().currentUser.uid;
    let month = new Date().toString().substr(4, 3);
    var unsubscribe = firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .collection(month)
      .doc("Info")
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            setExpense(doc.data().monthlyTotal);
            setTarget(doc.data().monthlyTarget);
            if (doc.data().Food !== undefined) {
              setFoodPrice(doc.data().Food);
            }
            if (doc.data().Transport !== undefined) {
              setTransportPrice(doc.data().Transport);
            }
            if (doc.data().Education !== undefined) {
              setEducationPrice(doc.data().Education);
            }
            if (doc.data().Entertainment !== undefined) {
              setEntertainmentPrice(doc.data().Entertainment);
            }
            if (doc.data().Sports !== undefined) {
              setSportsPrice(doc.data().Sports);
            }
            if (doc.data().Others !== undefined) {
              setOtherPrice(doc.data().Others);
            }
          } else {
            setExpense(0);
            setFoodPrice(0);
            setTransportPrice(0);
            setEducationPrice(0);
            setEntertainmentPrice(0);
            setSportsPrice(0);
            setOtherPrice(0);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    return unsubscribe;
  }, []);

  return (
    <Container>
      <Content contentContainerStyle={{ backgroundColor: "#F4FCFF", flex: 1 }}>
        <MonthlyExpense
          expense={expense}
          target={parseFloat(target)}
          // target={target}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <View style={styles.chart}>
          <DataPieChart
            style={styles.chart}
            food={parseFloat(foodPrice.toFixed(2))}
            transport={parseFloat(transportPrice.toFixed(2))}
            education={parseFloat(educationPrice.toFixed(2))}
            entertainment={parseFloat(entertainmentPrice.toFixed(2))}
            sports={parseFloat(sportsPrice.toFixed(2))}
            others={parseFloat(otherPrice.toFixed(2))}
          />
        </View>
        <MonthlyTargetModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </Content>
      <Footer style={styles.footer}>
        <Ionicons
          name="ios-add-circle-outline"
          color="#529FF3"
          size={45}
          style={{ marginTop: 10 }}
          onPress={() => navigation.navigate("Add Expense")}
        />
      </Footer>
    </Container>
  );
};

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

// Updates pie chart
// collectionRef
//   .doc("Info")
//   .onSnapshot(querySnapshot => {
//     querySnapshot.docs.forEach(doc => {
//       if (doc.id === "Food") {
//         // prices.splice(0, 1, doc.data().total)
//         setFoodPrice(doc.data().total);
//       } else if (doc.id === "Transport") {
//         // prices.splice(1, 1, doc.data().total)
//         setTransportPrice(doc.data().total);
//       } else if (doc.id === "Education") {
//         // prices.splice(2, 1, doc.data().total)
//         setEducationPrice(doc.data().total);
//       } else if (doc.id === "Entertainment") {
//         // prices.splice(3, 1, doc.data().total)
//         setEntertainmentPrice(doc.data().total);
//       } else if (doc.id === "Sports") {
//         // prices.splice(4, 1, doc.data().total)
//         setSportsPrice(doc.data().total);
//       } else {
//         // prices.splice(5, 1, doc.data().total)
//         setOtherPrice(doc.data().total);
//       }
//     })
//   }, error => {
//     console.error(error);
//   })
