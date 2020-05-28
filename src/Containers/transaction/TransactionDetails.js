import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Container, Title, Content, Button } from "native-base";
import { Icon } from "react-native-elements";
import firebase from "../../../firebaseDb";

const TransactionDetails = ({ route, navigation }) => {
  const { id, name, price, category, date, description } = route.params;

  const confirmDelete = () => {
    Alert.alert(
      "Delete transaction",
      "Delete this transaction?",
      [
        {
          text: "Delete",
          onPress: () => handleDeleteTransaction(),
          style: "destructive",
        },
        { text: "Cancel" },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleDeleteTransaction = () => {
    let uid = firebase.auth().currentUser.uid;
    let month = new Date().toString().substr(4, 3);
    let collectionRef = firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .collection(month);

    // 1. Delete specific transaction
    collectionRef
      .doc(date.substr(4, 11))
      .collection("All Expenses")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Delete successful!");
        navigation.goBack();
      })
      .catch((error) => {
        console.error(error);
      });

    // 2. Update monthly total in Info AND category expense in Info
    collectionRef
      .doc("Info")
      .update({
        monthlyTotal: firebase.firestore.FieldValue.increment(-price),
        [category]: firebase.firestore.FieldValue.increment(-price),
      })
      .then((docRef) => {
        console.log("Total expense updated!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

    // 3. Update daily total
    collectionRef
      .doc(date.substr(4, 11))
      .update({
        dailyTotal: firebase.firestore.FieldValue.increment(-price),
      })
      .then((docRef) => {
        console.log("Daily total updated!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        <Title style={styles.header}>Details</Title>

        <View style={styles.detailsContainer}>
          <View style={styles.field}>
            <Text style={styles.textLeft}>Name</Text>
            <Text style={styles.textRight}>{name}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.textLeft}>Category</Text>
            <Text style={styles.textRight}>{category}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.textLeft}>Price</Text>
            <Text style={styles.textRight}>{price}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.textLeft}>Payment Date</Text>
            <Text style={styles.textRight}>{date.substr(4, 11)}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.textLeft}>Description</Text>
            <Text style={styles.textRight}>{description}</Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <Icon
            name="ios-create"
            size={40}
            color="#529FF3"
            type="ionicon"
            onPress={() => alert("")}
          />
          <Icon
            name="ios-trash"
            size={40}
            color="red"
            type="ionicon"
            onPress={() => confirmDelete()}
          />
        </View>
      </Content>
    </Container>

    // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    // <Text>{name}</Text>
    // </View>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4FCFF",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  content: {
    marginTop: 50,
  },
  header: {
    flex: 1,
    justifyContent: "flex-start",
    textAlign: "left",
    fontSize: 40,
    color: "#3F6DB3",
  },
  detailsContainer: {
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 30,
  },
  field: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    elevation: 3,
  },
  textLeft: {
    fontSize: 20,
    color: "#bfc6ea",
  },
  textRight: {
    fontSize: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 50,
  },
});
