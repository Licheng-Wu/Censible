import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Container, Header, Title, Content, List, ListItem } from "native-base";
import { YellowBox } from "react-native";
import firebase from "../../../firebaseDb";
import DateList from "./DateList";
import TxnStackNavigator from "../../Routes/TxnStackNavigator";

class TransactionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: [],
    };
  }
  unsubscribe = null;

  componentDidMount() {
    console.log("component transaction screen mounted");
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const unsubscribe = this.props.navigation.addListener("focus", (e) => {
      let uid = firebase.auth().currentUser.uid;
      let month = new Date().toString().substr(4, 3);
      let getOptions = {
        source: "cache",
      };

      firebase
        .firestore()
        .collection("Users")
        .doc(uid)
        .collection(month)
        .orderBy("date", "desc")
        .get()
        .then((querySnapshot) => {
          const results = [];
          querySnapshot.docs.forEach((doc) => {
            results.push(doc.id);
          });
          this.setState({ dates: results });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <Container>
        <Header>
          <Title style={{ fontSize: 20 }}>Transaction History</Title>
        </Header>
        <Content>
          {/* <TouchableOpacity onPress={() => this.props.navigation.navigate("Details")}>
              <Text>Press here</Text>
            </TouchableOpacity> */}
          {this.state.dates.map((date) => {
            return <DateList key={date} date={date} />;
          })}
        </Content>
      </Container>
    );
  }
}

export default TransactionScreen;
