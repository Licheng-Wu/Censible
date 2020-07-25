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
  DatePicker,
  Toast,
} from "native-base";
import { StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { addExpense } from "../../../ExpenseAPI";
import { connect } from "react-redux";

class AddExpenseScreen extends Component {
  constructor(props) {
    super(props);
    const {item, amount, date } = props.route.params;
    this.state = {
      item: item ? item: "",
      amount: amount ? amount : "",
      category: "",
      description: item ? item : "",
      chosenDate: date ? new Date(date) : new Date()
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
        <View style={styles.header}>
          <Title style={styles.title}>Add Expense</Title>
        </View>
        <Content>
          <Form>
            <Item>
              <Input
                placeholder="Item Name"
                placeholderTextColor="#bfc6ea"
                onChangeText={this.handleItem}
                value={item}
              />
            </Item>
            <Item>
              <Input
                keyboardType="numeric"
                placeholder="Amount"
                placeholderTextColor="#bfc6ea"
                onChangeText={this.handleAmount}
                value={amount}
              />
            </Item>
            <Item>
              <Input
                placeholder="Description (Optional)"
                placeholderTextColor="#bfc6ea"
                maxLength={50}
                onChangeText={this.handleDescription}
                value={description}
              />
            </Item>
            <RNPickerSelect
              placeholder={{ label: "Category", value: null }}
              textInputProps={styles.pickerText}
              value={category}
              onValueChange={this.handleCategory.bind(this)}
              items={this.props.category.map((indvCategory) => ({
                label: indvCategory,
                value: indvCategory,
              }))}
            />
            <DatePicker
              textStyle={styles.datePicker}
              defaultDate={chosenDate}
              minimumDate={new Date(2010, 0, 1)}
              maximumDate={new Date()}
              locale={"en"}
              modalTransparent={true}
              animationType={"fade"}
              androidMode={"default"}
              onDateChange={this.handleDate.bind(this)}
              disabled={false}
            />
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
                    category: "",
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

const mapStateToProps = (state, ownProps) => {
  return {
    category: state.category,
    navigation: ownProps.navigation,
  };
};

export default connect(mapStateToProps)(AddExpenseScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#3F6DB3",
  },
  pickerText: {
    marginLeft: 19,
    marginTop: 20,
    fontSize: 17,
    color: "black",
  },
  datePicker: {
    marginTop: 10,
    marginLeft: 10,
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
