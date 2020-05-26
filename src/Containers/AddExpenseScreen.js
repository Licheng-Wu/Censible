import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  InputGroup,
  Input,
  Title,
  Button,
  Form,
  Item,
  Picker,
  Icon,
  Label,
  DatePicker,
} from "native-base";
import { StyleSheet, Text, View } from "react-native";
import firebase from "../../firebaseDb";

export default class AddExpenseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      amount: "",
      category: undefined,
      paymentMode: undefined,
      chosenDate: new Date(),
      user: firebase.auth().currentUser,
    };
  }

  addExpense = () => {
    let uid = this.state.user.uid;
    let month = this.state.chosenDate.toString().substr(4, 3);
    let exactDate = this.state.chosenDate.toString().substr(4, 12);

    // 1. Add expense to daily
    firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .collection(month)
      .doc(exactDate)
      .collection("AllExpenses")
      .add({ name: "Laksa", price: 3, description: "Testing second time" })
      .then(function (docRef) {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

    // 2. Update monthly total
    firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .collection(month)
      .doc("Info")
      .set(
        { total: firebase.firestore.FieldValue.increment(3) },
        { merge: true }
      )
      .then(function (docRef) {
        console.log("Total expense updated!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

    // 3. Update daily total
    firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .collection(month)
      .doc(exactDate)
      .set(
        { total: firebase.firestore.FieldValue.increment(3) },
        { merge: true }
      )
      .then(function (docRef) {
        console.log("Daily total updated!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

    // 4. Update monthly category expense
    firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .collection(month)
      .doc("Food")
      .set(
        { total: firebase.firestore.FieldValue.increment(3) },
        { merge: true }
      )
      .then(function (docRef) {
        console.log("Monthly category total updated!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  handleItem = (text) => {
    this.setState({ item: text });
  };

  handleAmount = (number) => {
    this.setState({ amount: number });
  };

  handleCategory = (value) => this.setState({ category: value });

  handlePaymentMode = (value) => this.setState({ paymentMode: value });

  handleDate = (date) => this.setState({ chosenDate: date });

  passData = () => {
    const { route, navigation } = this.props;
    const { amount } = this.state;
    const totalExpense = parseFloat(amount) + route.params.expense;
    route.params.setExpense(totalExpense);
    navigation.goBack();
  };

  render() {
    const { item, amount, category, paymentMode } = this.state;
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Title style={styles.title}>Add Expense</Title>
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label style={{ color: "#bfc6ea" }}>Item Name</Label>
              <Input onChangeText={this.handleItem} value={item} />
            </Item>
            <Item floatingLabel>
              <Label style={{ color: "#bfc6ea" }}>Amount</Label>
              <Input
                keyboardType="numeric"
                onChangeText={this.handleAmount}
                value={amount}
              />
            </Item>
            <Item picker style={styles.picker}>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholder="Category"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={category}
                onValueChange={this.handleCategory.bind(this)}
              >
                <Picker.Item label="Food" value="key0" />
                <Picker.Item label="Transport" value="key1" />
                <Picker.Item label="Education" value="key2" />
                <Picker.Item label="Clothing" value="key3" />
                <Picker.Item label="Entertainment" value="key4" />
                <Picker.Item label="Others" value="key5" />
              </Picker>
            </Item>
            <Item picker style={styles.picker}>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholder="Mode of Payment"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={paymentMode}
                onValueChange={this.handlePaymentMode.bind(this)}
              >
                <Picker.Item label="Wallet" value="key0" />
                <Picker.Item label="PayNow/PayLah" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
                <Picker.Item label="Credit Card" value="key3" />
                <Picker.Item label="iBanking" value="key4" />
              </Picker>
            </Item>
            <Item last style={styles.picker}>
              <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date(2010, 0, 1)}
                maximumDate={new Date()}
                locale={"en"}
                modalTransparent={true}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select Date"
                placeHolderTextStyle={{ color: "#bfc6ea" }}
                onDateChange={this.handleDate.bind(this)}
                disabled={false}
              />
            </Item>
          </Form>
          <Button
            full
            rounded
            info
            style={styles.button}
            onPress={this.addExpense}
          >
            <Text style={styles.text}>Add</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4FCFF",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    backgroundColor: "transparent",
    borderWidth: 0,
    elevation: 0,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#3F6DB3",
  },
  picker: {
    marginTop: 20,
  },
  button: {
    marginTop: 50,
  },
  text: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  TextInputs: {
    flex: 1,
    flexDirection: "column",
    width: 20,
    marginBottom: 30,
  },
  NumberInputs: {
    flex: 1,
    flexDirection: "column",
    width: 20,
    marginBottom: 30,
  },
  AddButton: {
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
