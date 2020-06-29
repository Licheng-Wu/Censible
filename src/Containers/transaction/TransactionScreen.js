import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Container, Content, Spinner } from "native-base";
import { YellowBox } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import firebase from "../../../firebaseDb";
import DateList from "./DateList";
import { FlatList, ScrollView } from "react-native-gesture-handler";

const TransactionScreen = () => {
  const [loading, setLoading] = React.useState(true);
  const [month, setMonth] = React.useState(new Date().toString().substr(4, 3));
  const [dates, setDates] = React.useState([]);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  React.useEffect(() => {
    setLoading(true);
    YellowBox.ignoreWarnings(["Setting a timer"]);
    let uid = firebase.auth().currentUser.uid;

    var unsubscribe = firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .collection(month)
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        const results = [];
        querySnapshot.docs.forEach((doc) => {
          if (doc.data().dailyTransactions > 0) {
            // Only push if the date has more than 0 transactions
            results.push(doc.id);
          }
        });
        setDates(results);
        setLoading(false);
      });
    return unsubscribe;
  }, [month]);

  const getLastThreeMonths = () => {
    // Index of the current month, starting from 0
    const index = new Date().getMonth();
    // An array that will contain the last 3 months
    let monthArray = [];
    if (index === 0) {
      monthArray = [
        { label: months[0], value: months[0] },
        { label: months[11], value: months[11] },
        { label: months[10], value: months[10] }
      ];
    } else if (index === 1) {
      monthArray = [
        { label: months[1], value: months[1] },
        { label: months[0], value: months[0] },
        { label: months[11], value: months[11] }
      ];
    } else {
      monthArray = [
        { label: months[index], value: months[index] },
        { label: months[index - 1], value: months[index - 1] },
        { label: months[index - 2], value: months[index - 2] }
      ];
    }
    return monthArray;
  }

  const renderDates = () => {
    if (loading) {
      return <Spinner style={{ flex: 1 }} />;
    }

    if (dates.length) {
      return (
        // <Content>
        <View style={styles.list}>
          <ScrollView style={{ marginTop: 10 }}>
            {dates.map((date) => {
              return <DateList key={date} month={month} date={date} />;
            })}
          </ScrollView>
        </View>
        // </Content>
      );
    } else {
      return (
        <View>
          <Text style={styles.emptyText}>
            No expense recorded for the month!
          </Text>
        </View>
      );
    }
  };

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Monthly Transactions</Text>
      </View>
      <View style={styles.pickerContainer}>
        <View>
          <Text style={styles.text}>Select a month:</Text>
        </View>
        <View>
          <RNPickerSelect
            placeholder={{}}
            style={{ width: 10 }}
            textInputProps={styles.picker}
            onValueChange={(value) => setMonth(value)}
            items={getLastThreeMonths()}
          />
        </View>
        <Text style={styles.subtitle}>At a glance...</Text>
      </View>
      {renderDates()}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "#e2eeff",
  },
  header: {
    justifyContent: "center",
    // alignItems: "center",
    paddingLeft: 20,
    paddingRight: 15,
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 34,
    fontWeight: "bold",
    color: "#3F6DB3",
    marginTop: 10,
    shadowColor: "salmon",
    shadowOpacity: 0.25,
    shadowRadius: 2.8,
  },
  subtitle: {
    fontSize: 16,
    fontStyle: "italic",
    color: "gray",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
  },
  pickerContainer: {
    // backgroundColor: "red",
    marginLeft: 30,
    marginRight: 30,
  },
  text: {
    fontSize: 20,
    // marginTop: 20,
    color: "#353535",
  },
  picker: {
    // marginLeft: 50,
    marginTop: 10,
    fontSize: 18,
  },
  list: {
    padding: 10,
    marginBottom: 182,
    margin: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    borderRadius: 20,
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
    elevation: 5,
  },
  emptyText: {
    fontSize: 20,
    padding: 30,
  },
});

export default TransactionScreen;
