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
} from "native-base";
import { StyleSheet, Text, View } from "react-native";

export default class AddExpenseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
    };
  }
  onValueChange(value) {
    this.setState({
      selected: value,
    });
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input placeholder="Item Name" />
            </Item>
            <Item last>
              <Input keyboardType="numeric" placeholder="Amount" />
            </Item>
            <Item picker>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="Wallet" value="key0" />
                <Picker.Item label="ATM Card" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
                <Picker.Item label="Credit Card" value="key3" />
                <Picker.Item label="Net Banking" value="key4" />
              </Picker>
            </Item>
          </Form>
          <Button>
            <Text>Add Expense</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // width: 300,
    marginTop: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
