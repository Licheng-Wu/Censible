import * as React from "react";
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

export default class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
  };

  SignUp = (email, password) => {
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

  handleUsername = (text) => this.setState({ email: text });

  handlePassword = (text) => this.setState({ password: text });

  render() {
    const { email, password } = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="grey"
          autoCapitalize="none"
          onChangeText={() => this.handleUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="grey"
          autoCapitalize="none"
          onChangeText={() => this.handlePassword}
        />
        <Button
          style={styles.button}
          onPress={() => this.SignUp("test1@gmail.com", "testing")}
        >
          <Text> Sign Up </Text>
        </Button>
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
  input: {
    marginTop: 10,
    width: 200,
    height: 30,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 20,
  },
  button: {
    marginTop: 30,
  },
});
