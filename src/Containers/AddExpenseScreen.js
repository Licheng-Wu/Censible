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
  Toast
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
      description: "",
      chosenDate: new Date(),
      user: firebase.auth().currentUser,
    };
  }

  addExpense = () => {
    const { item, amount, category, paymentMode, description, chosenDate, user } = this.state;

    let uid = user.uid;
    let month = chosenDate.toString().substr(4, 3);
    let exactDate = chosenDate.toString().substr(4, 12);

    // 1. Add expense to daily
    firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .collection(month)
      .doc(exactDate)
      .collection("AllExpenses")
      .add({
        name: item, 
        price: amount,
        category: category, 
        description: description
      })
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
        { monthlyTotal: firebase.firestore.FieldValue.increment(amount) },
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
        { dailyTotal: firebase.firestore.FieldValue.increment(amount) },
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
      .doc(category)
      .set(
        { 
          isCategory: true,
          category: category,
          total: firebase.firestore.FieldValue.increment(amount),
        },
        { merge: true }
      )
      .then(function (docRef) {
        console.log("Monthly category total updated!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  handleItem = text => this.setState({ item: text });

  handleAmount = number => this.setState({ amount: parseFloat(number) });

  handleCategory = value => this.setState({ category: value });

  handlePaymentMode = value => this.setState({ paymentMode: value });

  handleDescription = text => this.setState({description: text});

  handleDate = date => this.setState({ chosenDate: date });

  render() {
    const { item, amount, category, paymentMode, description } = this.state;
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Title style={styles.title}>Add Expense</Title>
        </Header>
        <Content>
          <Form>
            <Item last>
              <Input 
                placeholder="Item Name"
                placeholderTextColor="#bfc6ea"
                onChangeText={this.handleItem}
                value={item}
              />
            </Item>
            <Item last>
              <Input 
                keyboardType="numeric" 
                placeholder="Amount"
                placeholderTextColor="#bfc6ea"
                onChangeText={this.handleAmount}
                value={amount}
              />
            </Item>
            <Item picker style={styles.picker}>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholder="Category"
                placeholderStyle={{ color: "#bfc6ea", marginLeft: 4 }}
                placeholderIconColor="#007aff"
                selectedValue={category}
                onValueChange={this.handleCategory.bind(this)}
              >
                <Picker.Item label="Food" value="Food" />
                <Picker.Item label="Transport" value="Transport" />
                <Picker.Item label="Education" value="Education" />
                <Picker.Item label="Entertainment" value="Entertainment" />
                <Picker.Item label="Sports" value="Sports" />
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </Item>
            <Item picker style={styles.picker}>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholder="Mode of Payment"
                placeholderStyle={{ color: "#bfc6ea", marginLeft: 4 }}
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
            <Item last>
              <Input
                placeholder="Description (Optional)"
                placeholderTextColor="#bfc6ea"
                onChangeText={this.handleDescription}
                value={description}
              />
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
            onPress={() => {
              if (item && amount && category && paymentMode) {
                this.addExpense();
                Toast.show({
                  text: 'Update successful!',
                  duration: 3000,
                  buttonText: 'Okay',
                  type: 'success',
                  style: {marginBottom: 40},
                  onClose: reason => reason == "user" ? navigation.goBack() : null
                })
              } else {
                Toast.show({
                  text: 'Please fill in all required fields.',
                  buttonText: 'Okay',
                  duration: 3000,
                  type: 'warning',
                  style: {marginBottom: 40},
                })
              }
            }}
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
    marginTop: 7
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
