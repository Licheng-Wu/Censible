import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Container, Content, Spinner } from "native-base";
import { YellowBox } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import firebase from "../../../firebaseDb";
import DateList from "./DateList";

const TransactionScreen = () => {
  const [loading, setLoading] = React.useState(true);
  const [month, setMonth] = React.useState(new Date().toString().substr(4, 3));
  const [dates, setDates] = React.useState([]);

  React.useEffect(() => {
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

  const renderDates = () => {
    if (loading) {
      return <Spinner style={{ flex: 1 }} />;
    }

    if (dates.length) {
      return (
        <Content>
          <View style={styles.list}>
            {dates.map((date) => {
              return <DateList key={date} month={month} date={date} />;
            })}
          </View>
        </Content>
      )
    } else {
      return (
        <Text style={styles.emptyText}>
          No expense recorded for the month!
        </Text>
      )
    }
  }

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your monthly expense</Text>
        {/* <View style={{ flexDirection: "row", justifyContent: "flex-start" }}> */}
        <View>
          <Text style={styles.text}>Select a month:</Text>
          <RNPickerSelect
            placeholder={{}}
            textInputProps={styles.picker}
            onValueChange={(value) => setMonth(value)}
            items={[
              { label: "Jun", value: "Jun" },
              { label: "May", value: "May" },
              { label: "Apr", value: "Apr" },
            ]}
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
    backgroundColor: "ghostwhite",
  },
  header: {
    paddingLeft: 30,
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 33,
    fontWeight: "bold",
    color: "maroon",
    marginTop: 30,
    shadowColor: "salmon",
    shadowOpacity: 0.25,
    shadowRadius: 2.8,
  },
  subtitle: {
    fontSize: 22,
    fontStyle: "italic",
    color: "gray",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
  },
  text: {
    fontSize: 20,
    marginTop: 20,
  },
  picker: {
    marginLeft: 20,
    marginTop: 21,
    fontSize: 20,
  },
  list: {
    padding: 10,
    margin: 15,
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

  }
});

export default TransactionScreen;
