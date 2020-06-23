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
            <ScrollView>
              {dates.map((date) => {
                return <DateList key={date} month={month} date={date} />;
              })}
            </ScrollView>
          </View>
        </Content>
      );
    } else {
      return (
        <Text style={styles.emptyText}>No expense recorded for the month!</Text>
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
            // textInputProps={styles.picker}
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
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e2eeff",
  },
  header: {
    justifyContent: "center",
    // alignItems: "center",
    paddingLeft: 20,
    paddingRight: 15,
    marginTop: 20,
    marginBottom: 10,
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
    fontSize: 14,
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
  // picker: {
  //   marginLeft: 50,
  //   marginTop: 21,
  //   fontSize: 20,
  // },
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
  },
});

export default TransactionScreen;
