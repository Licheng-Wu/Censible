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
  Icon,
  Label,
  Picker,
  DatePicker,
  Toast,
} from "native-base";
import { StyleSheet, Text, View, Platform } from "react-native";
import firebase from "../../firebaseDb";
import CategoryPicker from "../Component/CategoryPicker";

export default class AddExpenseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      amount: "",
      category: "Food",
      paymentMode: undefined,
      description: "",
      chosenDate: new Date(),
      user: firebase.auth().currentUser,
    };
  }

  addExpense = () => {
    const { item, category, description, chosenDate, user } = this.state;
    const amount = parseFloat(this.state.amount);
    // console.log(chosenDate);
    // console.log(chosenDate.toString());

    let uid = user.uid;
    let month = chosenDate.toString().substr(4, 3);
    let exactDate = chosenDate.toString().substr(4, 11);
    let dateWithoutDay = chosenDate.toString().substr(4);
    let collectionRef = firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .collection(month);

    // 1. Adds each daily transaction
    collectionRef
      .doc(exactDate)
      .collection("All Expenses")
      .add({
        name: item,
        price: amount,
        category: category,
        description: description,
        date: dateWithoutDay,
      })
      .then(function (docRef) {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

    // 2. Update monthly total in Info AND category expense in Info
    collectionRef
      .doc("Info")
      .set(
        {
          monthlyTotal: firebase.firestore.FieldValue.increment(amount),
          [category]: firebase.firestore.FieldValue.increment(amount),
        },
        { merge: true }
      )
      .then(function (docRef) {
        console.log("Total expense updated!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

    // 3. Update daily total and daily transaction number
    collectionRef
      .doc(exactDate)
      .set(
        {
          dailyTotal: firebase.firestore.FieldValue.increment(amount),
          dailyTransactions: firebase.firestore.FieldValue.increment(1),
          date: dateWithoutDay,
        },
        { merge: true }
      )
      .then(function (docRef) {
        console.log("Daily total updated!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  handleItem = (text) => this.setState({ item: text });

  handleAmount = (number) => this.setState({ amount: number });

  handleCategory = (value) => this.setState({ category: value });

  // handlePaymentMode = (value) => this.setState({ paymentMode: value });

  handleDescription = (text) => this.setState({ description: text });

  handleDate = (date) => {
    this.setState({ chosenDate: date });
  };
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
            {/* <View style={{ marginTop: 10 }}>
              <CategoryPicker category={category} handleCategory={this.handleCategory.bind(this)} />
            </View> */}
            <Item picker style={styles.picker}>
              <Picker
                style={{ width: undefined }}
                // placeholder="Category"
                // placeholderStyle={{ color: "#bfc6ea", marginLeft: 4 }}
                // placeholderIconColor="#007aff"
                textStyle={{ marginLeft: 5 }}
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
            <Item last>
              <Input
                placeholder="Description (Optional)"
                placeholderTextColor="#bfc6ea"
                maxLength={50}
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
              if (item && amount && amount > 0 && category) {
                this.addExpense();
                this.setState({
                  item: "",
                  amount: "",
                  description: "",
                });

                Toast.show({
                  text: "Update successful!",
                  duration: 3000,
                  buttonText: "Okay",
                  type: "success",
                  style: { marginBottom: 40 },
                  onClose: (reason) =>
                    reason == "user" ? navigation.goBack() : null,
                });
              } else {
                Toast.show({
                  text: "Please fill in all required fields.",
                  buttonText: "Okay",
                  duration: 3000,
                  type: "warning",
                  style: { marginBottom: 40 },
                });
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
    marginTop: 7,
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

{
  /* <Item picker style={styles.picker}>
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
            </Item> */
}
{
  /* <Item picker style={styles.picker}>
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
            </Item> */
}
