import React, { Component } from "react";
import firebase from "../../firebaseDb";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "../Routes/TabNavigator";
import BlueButton from "../Component/BlueButton";
import { color } from "react-native-reanimated";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  signUpUser = (email, password) => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user);
          this.props.navigation.navigate("HomeScreen")
        });
    } catch (error) {
      console.log(error.toString(error));
    }
  };

  handleName = text => this.setState({ name: text });

  handleEmail = text => this.setState({ email: text });

  handlePassword = text => this.setState({ password: text })

  handleConfirmPassword = text => this.setState({ confirmPassword: text })

  render() {
    const { email, password } = this.state;
    return (
      <Container style = {styles.container}>
        <Content>
          <Form>
            <Item floatingLabel style = {styles.textInput}>
              <Label>Name</Label>
              <Input
              autoCorrect={false}
              onChangeText={this.handleName}
              />
            </Item>
            <Item floatingLabel style = {styles.textInput}>
              <Label>Email</Label>
              <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={this.handleEmail}
              />
            </Item>
            <Item floatingLabel style = {styles.textInput}>
              <Label>Password</Label>
              <Input
              autoCorrect={false}
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={this.handlePassword}
              />
            </Item>
            <Item floatingLabel style = {styles.textInput}>
              <Label>Confirm Password</Label>
              <Input
              autoCorrect={false}
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={this.handleConfirmPassword}
              />
            </Item>
            <Button style = {styles.button}
              full
              rounded
              onPress={() => this.signUpUser(email, password)}
            >
              <Text>Sign Up</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },
  textInput: {
    marginTop: 10,
  },
  noMatch: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 20,
    color: 'red'
  },
  match: {
    color: 'white'
  },
  button: {
    marginTop: 50,
  }
});
