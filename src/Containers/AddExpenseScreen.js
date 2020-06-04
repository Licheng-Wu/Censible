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
import { addExpense } from "../../ExpenseAPI";

export default class AddExpenseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      amount: "",
      category: "Food",
      description: "",
      chosenDate: new Date(),
    };
  }

  handleItem = (text) => this.setState({ item: text });

  handleAmount = (number) => this.setState({ amount: number });

  handleCategory = (value) => this.setState({ category: value });

  handleDescription = (text) => this.setState({ description: text });

  handleDate = (date) => this.setState({ chosenDate: date });

  render() {
    const { item, amount, category, description, chosenDate } = this.state;
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
                style={{ width: undefined }}
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
              if (item && amount && category) {
                if (amount > 0) {
                  addExpense({
                    name: item,
                    price: parseFloat(amount),
                    category: category,
                    description: description,
                    date: chosenDate.toString().substr(4),
                  });
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
                    text: "Invalid amount.",
                    buttonText: "Okay",
                    duration: 3000,
                    type: "warning",
                    stlye: { marginBottom: 40 },
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
});
