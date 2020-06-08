import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Input,
  Title,
  Button,
  Form,
  Item,
  Picker,
  DatePicker,
  Toast,
} from "native-base";
import { StyleSheet, Text, View, Platform } from "react-native";
import { addExpense, deleteExpense } from "../../../ExpenseAPI"

export default class UpdateExpenseScreen extends Component {
  constructor(props) {
    super(props);
    const { name, price, category, description, date } = props.route.params;
    this.state = {
      item: name,
      amount: price,
      newAmount: price,
      category: category,
      newCategory: category,
      description: description,
      chosenDate: date,
      newChosenDate: date,
    };
  }

  handleUpdateExpense = () => {
    this.updateExpense();
    this.props.navigation.navigate("TransactionScreen");
  };

  updateExpense = () => {

    // Constants needed to perform delete function
    const documentId = this.props.route.params.id;
    const { amount, category, chosenDate } = this.state;

    deleteExpense({
      id: documentId,
      price: parseFloat(amount),
      category: category,
      date: chosenDate
    })

    //Constants needed to perform add function
    const { item, newAmount, newCategory, description, newChosenDate } = this.state;

    addExpense({
      name: item,
      price: parseFloat(newAmount),
      category: newCategory,
      description: description,
      date: newChosenDate
    })
  };

  handleItem = (text) => this.setState({ item: text });

  handleAmount = (number) => this.setState({ newAmount: number });

  handleCategory = (value) => this.setState({ newCategory: value });

  handleDescription = (text) => this.setState({ description: text });

  handleDate = (date) => this.setState({ newChosenDate: date.toString().substr(4) });
  
  render() {
    const {
      item,
      newAmount,
      newCategory,
      description,
      chosenDate,
    } = this.state;
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
            <Item picker style={styles.picker}>
              <Picker
                style={{ width: undefined }}
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
              if (item && newAmount && newCategory) {
                if (newAmount > 0) {
                  this.handleUpdateExpense();
                  Toast.show({
                    text: "Update successful!",
                    duration: 3000,
                    buttonText: "Okay",
                    type: "success",
                    style: { marginBottom: 40 },
                  });
                } else {
                  Toast.show({
                    text: "Invalid amount.",
                    buttonText: "Okay",
                    duration: 3000,
                    type: "warning",
                    stlye: { marginBottom: 40 }
                  });
                }
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
  }
});
