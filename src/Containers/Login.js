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
import StackNavigator from "../Routes/StackNavigator";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loggedIn: false,
    };
  }

  handleUsername = (text) => this.setState({ email: text });

  handlePassword = (text) => this.setState({ password: text });

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true,
        });
        console.log("Signed in");
      } else {
        console.log("Error");
      }
    });
  }

  Login = (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res.user.email);
        });
    } catch (error) {
      console.log(error.toString(error));
    }
  };

  render() {
    const { email, password } = this.state;
    const { navigation } = this.props;
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
          onPress={() => this.Login("test1@gmail.com", "testing")}
        >
          <Text> Login </Text>
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
