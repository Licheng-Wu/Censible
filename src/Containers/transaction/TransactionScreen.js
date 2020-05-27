import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Container, Header, Title, Content, List, ListItem } from "native-base";
import firebase from "../../../firebaseDb"
import DateList from "./DateList"

class TransactionScreen extends React.Component {

  state={
      dates: []
  }


  componentDidMount() {

    let uid = firebase.auth().currentUser.uid;
    let month = new Date().toString().substr(4, 3);

    firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .collection(month)
      .orderBy("date", "desc")
      .get()
      .then(querySnapshot => {
        const results = [];
        querySnapshot.docs.forEach(doc => {
          results.push(doc.id)
        })
        this.setState({dates: results})
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  render() {
  return (
    <Container>
        <Header>
          <Title style={{fontSize: 20}}>Transaction History</Title>
        </Header>
        <Content>
          { 
            this.state.dates.map(date => {
              return(
              <DateList 
                date={date}
              />
              )
            })
            
          }
        </Content>
      </Container>
  )}
}

export default TransactionScreen;