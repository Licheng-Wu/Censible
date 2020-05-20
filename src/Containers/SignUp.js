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
import { Button } from "native-base/src/basic/Button";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "../Routes/TabNavigator";
import BlueButton from "../Component/BlueButton";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  register = (email, password) => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user);
        });
    } catch (error) {
      console.log(error.toString(error));
    }
  };

  handleEmail = (email) => this.setState({ email });

  handlePassword = (password) => this.setState({ password });

  render() {
    const { email, password } = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor="grey"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
          value={email}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="grey"
          autoCapitalize="none"
          onChangeText={this.handlePassword}
          value={password}
        />
        <BlueButton
          style={styles.button}
          onPress={() => this.register(email, password)}
        >
          Sign Up
        </BlueButton>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    marginTop: 10,
    width: 200,
    height: 30,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 20,
  },
  button: {
    marginTop: 30,
    width: 100,
  },
  text: {
    fontSize: 20,
  },
});
