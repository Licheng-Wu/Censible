import React, { Component } from "react";
import ValidationComponent from "react-native-form-validator";
import firebase from "../../../firebaseDb";
import { StyleSheet, Text } from "react-native";
import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label,
} from "native-base";
import { GlobalStyle } from "../../styles/GlobalStyles";

export default class SignUp extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      passwordMatch: true,
      isEmailUsed: false,
    };
  }

  handleSignUpUser = (email, password) => {
    this.validationCheck();
    const { name, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({ passwordMatch: false });
    } else if (this.isFormValid()) {
      this.setState({
        passwordMatch: true,
        isEmailUsed: false,
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          console.log("User account created & signed in!");
          // Update user details
          res.user.updateProfile({ displayName: name })
            .then(() => console.log("User profile updated!"))
            .catch(error => console.error(error));        
          // Email verification
          res.user.sendEmailVerification()
            .then(() => console.log("Email sent"))
            .catch(error => console.error(error));
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            this.setState({ isEmailUsed: true });
          } else {
            this.setState({ isEmailUsed: false });
            console.log(error.toString(error));
          }
        });
    }
  };

  handleName = (text) => this.setState({ name: text });

  handleEmail = (text) => this.setState({ email: text });

  handlePassword = (text) => this.setState({ password: text });

  handleConfirmPassword = (text) => this.setState({ confirmPassword: text });

  validationCheck = () => {
    this.validate({
      name: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 8,
        maxlength: 16,
      },
      confirmPassword: {
        required: true,
        minlength: 8,
        maxlength: 16,
      },
    });
  };

  messages = {
    en: {
      email: "Email address is invalid.",
      required: "Above field is mandatory.",
      minlength: "Password should have at least 8 characters.",
      maxlength: "Password should have at most 16 characters.",
    },
  };

  render() {
    const {
      name,
      email,
      password,
      confirmPassword,
      passwordMatch,
      isEmailUsed,
    } = this.state;
    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Item floatingLabel style={GlobalStyle.authTextField}>
              <Label>Name</Label>
              <Input
                autoCorrect={false}
                onChangeText={this.handleName}
                value={name}
              />
            </Item>
            {this.isFieldInError("name") && (
              <Text style={GlobalStyle.error}>
                {this.getErrorsInField("name")[0]}
              </Text>
            )}
            <Item floatingLabel style={GlobalStyle.authTextField}>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={this.handleEmail}
                value={email}
              />
            </Item>
            {this.isFieldInError("email") && (
              <Text style={GlobalStyle.error}>
                {this.getErrorsInField("email")[0]}
              </Text>
            )}
            {isEmailUsed && (
              <Text style={GlobalStyle.error}>
                That email address is already in use.
              </Text>
            )}
            <Item floatingLabel style={GlobalStyle.authTextField}>
              <Label>Password</Label>
              <Input
                autoCorrect={false}
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={this.handlePassword}
                value={password}
              />
            </Item>
            {this.isFieldInError("password") && (
              <Text style={GlobalStyle.error}>
                {this.getErrorsInField("password")[0]}
              </Text>
            )}
            <Item floatingLabel style={GlobalStyle.authTextField}>
              <Label>Confirm Password</Label>
              <Input
                autoCorrect={false}
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={this.handleConfirmPassword}
                value={confirmPassword}
              />
            </Item>
            {this.isFieldInError("confirmPassword") && (
              <Text style={GlobalStyle.error}>
                {this.getErrorsInField("confirmPassword")[0]}
              </Text>
            )}
            {!passwordMatch && (
              <Text style={GlobalStyle.error}>Passwords do not match!</Text>
            )}
            <Button
              style={GlobalStyle.authButton}
              full
              rounded
              onPress={() => this.handleSignUpUser(email, password)}
            >
              <Text style={GlobalStyle.authButtonText}>SIGN UP</Text>
            </Button>
          </Form>
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
  textInput: {
    marginTop: 10,
  },
  noMatch: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 20,
    color: "red",
  },
  match: {
    color: "white",
  },
  button: {
    marginTop: 50,
  },
  error: {
    justifyContent: "center",
    textAlign: "center",
    color: "red",
  },
});
