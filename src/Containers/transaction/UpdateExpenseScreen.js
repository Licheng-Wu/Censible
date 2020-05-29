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
import firebase from "../../../firebaseDb";
import { parse } from "react-native-svg";

export default class UpdateExpenseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.route.params.name,
      amount: props.route.params.price,
      newAmount: props.route.params.price,
      category: props.route.params.category,
      newCategory: props.route.params.category,
      paymentMode: undefined,
      description: props.route.params.description,
      chosenDate: props.route.params.date,
      newChosenDate: props.route.params.date,
      user: firebase.auth().currentUser,
    };
  }

  handleUpdateExpense = () => {
    this.updateExpense();
    this.props.navigation.navigate("TransactionScreen");
  };

  updateExpense = () => {
    const {
      item,
      category,
      newCategory,
      description,
      chosenDate,
      newChosenDate,
      user,
    } = this.state;
    const newAmount = parseFloat(this.state.newAmount);
    const amount = parseFloat(this.state.amount);
    let uid = user.uid;
    let documentId = this.props.route.params.id;

    // Month format is Eg. May. To be used as Collection title
    let previousMonth = chosenDate.substr(0, 3);
    let newMonth = newChosenDate.substr(0, 3);

    // Exact date format is Eg. May 11 2020. To be used as Date Document title
    let oldExactDate = chosenDate.substr(0, 11);
    let newExactDate = newChosenDate.substr(0, 11);

    // previousDate and newDate format is Eg. May 13 2020 00:00:00 GMT+0800 (+08). To be used for ordering
    let previousDate = chosenDate;
    let newDate = newChosenDate;

    let collectionRef = firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .collection(previousMonth);

    let newCollectionRef = firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .collection(newMonth);

    deleteOld = () => {
      // 1. Delete previous document
      collectionRef
        .doc(oldExactDate)
        .collection("All Expenses")
        .doc(documentId)
        .delete()
        .then(() => {
          console.log("Delete successful!");
        })
        .catch((error) => {
          console.error(error);
        });

      // 2. Update monthly total in Info AND category expense in Info
      collectionRef
        .doc("Info")
        .update({
          monthlyTotal: firebase.firestore.FieldValue.increment(-amount),
          [category]: firebase.firestore.FieldValue.increment(-amount),
        })
        .then((docRef) => {
          console.log("Total expense updated!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });

      // 3. Update daily total and daily transaction number
      collectionRef
        .doc(oldExactDate)
        .update({
          dailyTotal: firebase.firestore.FieldValue.increment(-amount),
          dailyTransactions: firebase.firestore.FieldValue.increment(-1),
        })
        .then((docRef) => {
          console.log("Daily total updated!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    };

    addNew = () => {
      // 1. Add new daily transaction
      newCollectionRef
        .doc(newExactDate)
        .collection("All Expenses")
        .add({
          name: item,
          price: newAmount,
          category: newCategory,
          description: description,
          date: newChosenDate,
        })
        .then(function (docRef) {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });

      // 2. Update monthly total in Info AND category expense in Info
      newCollectionRef
        .doc("Info")
        .set(
          {
            monthlyTotal: firebase.firestore.FieldValue.increment(newAmount),
            [newCategory]: firebase.firestore.FieldValue.increment(newAmount),
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
        .doc(newExactDate)
        .set(
          {
            dailyTotal: firebase.firestore.FieldValue.increment(newAmount),
            dailyTransactions: firebase.firestore.FieldValue.increment(1),
            date: newDate,
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

    this.deleteOld();
    this.addNew();
  };

  handleItem = (text) => this.setState({ item: text });

  handleAmount = (number) => this.setState({ newAmount: number });

  handleCategory = (value) => this.setState({ newCategory: value });

  // handlePaymentMode = (value) => this.setState({ paymentMode: value });

  handleDescription = (text) => this.setState({ description: text });

  handleDate = (date) => {
    this.setState({
      newChosenDate: date.toString().substr(4),
    });
  };
  render() {
    const {
      item,
      newAmount,
      category,
      newCategory,
      paymentMode,
      description,
      chosenDate,
      newChosenDate,
    } = this.state;
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Title style={styles.title}>Update Expense</Title>
        </Header>
        <Content>
          <Form>
            <Item last>
              <Input onChangeText={this.handleItem} value={item} />
            </Item>
            <Item last>
              <Input
                keyboardType="numeric"
                onChangeText={this.handleAmount}
                value={newAmount.toString()}
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
                selectedValue={newCategory}
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
                defaultDate={new Date(chosenDate)}
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
              if (item && newAmount && newAmount > 0 && newCategory) {
                this.handleUpdateExpense();
                this.setState({
                  item: "",
                  newAmount: "",
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
            <Text style={styles.text}>Update</Text>
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
