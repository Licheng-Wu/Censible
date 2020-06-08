import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Container, Header, Title, Content, List, ListItem } from "native-base";
import { YellowBox } from "react-native";
import firebase from "../../../firebaseDb";
import DateList from "./DateList";

class TransactionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: [],
    };
  }

  componentDidMount() {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    let uid = firebase.auth().currentUser.uid;
    let month = new Date().toString().substr(4, 3);

    firebase
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
        this.setState({ dates: results });
      });
  }

  render() {
    return (
      <Container>
        <Header>
          <Title style={{ fontSize: 20 }}>Transaction History</Title>
        </Header>
        <Content>
          {this.state.dates.map((date) => {
            return <DateList key={date} date={date} />;
          })}
        </Content>
      </Container>
    );
  }
}

export default TransactionScreen;
