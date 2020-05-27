import * as React from "react";
import ValidationComponent from "react-native-form-validator";
import firebase from "../../firebaseDb";
import { StyleSheet, Text, Image } from "react-native";
import {
  Container,
  Content,
  Form,
  Input,
  Item,
  Button,
  Icon,
  Toast,
} from "native-base";
import { GlobalStyle } from "../styles/GlobalStyles";

export default class Login extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
    };
  }

  handleEmail = (email) => this.setState({ email });

  handlePassword = (password) => this.setState({ password });

  loginUser = (email, password) => {
    this.validationCheck();
    if (this.isFormValid()) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.trim(), password)
        .then((res) => {
          console.log(res.user.email);
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            Toast.show({
              text: "The email address is not registered.",
              buttonText: "Okay",
              duration: 3000,
              type: "danger",
            });
          } else if (error.code === "auth/wrong-password") {
            Toast.show({
              text: "Wrong password!",
              buttonText: "Okay",
              duration: 3000,
              type: "danger",
            });
          }
          console.log(error.code);
        });
    }
  };

  validationCheck = () => {
    this.validate({
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
      },
    });
  };

  messages = {
    en: {
      email: "Email address is invalid.",
      required: "Above field is mandatory.",
    },
  };

  render() {
    const { email, password } = this.state;
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          {/* <Text style={styles.censible}>Censible</Text> */}
          <Image
            style={styles.image}
            source={require("../Images/logo3x.png")}
          />
          <Form>
            <Item floatingLabel style={GlobalStyle.authTextField}>
              <Icon name="mail" style={GlobalStyle.authIconStyle} />
              <Input
                placeholder="Email"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={this.handleEmail}
              />
            </Item>
            {this.isFieldInError("email") && (
              <Text style={GlobalStyle.error}>
                {this.getErrorsInField("email")[0]}
              </Text>
            )}

            <Item floatingLabel style={GlobalStyle.authTextField}>
              {/* <Label>Password</Label> */}
              <Icon name="lock" style={GlobalStyle.authIconStyle} />
              <Input
                placeholder="Password"
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={this.handlePassword}
              />
            </Item>
            {this.isFieldInError("password") && (
              <Text style={GlobalStyle.error}>
                {this.getErrorsInField("password")[0]}
              </Text>
            )}

            <Button
              style={GlobalStyle.authButton}
              full
              rounded
              onPress={() => this.loginUser(email, password)}
            >
              <Text style={GlobalStyle.authButtonText}>LOG IN</Text>
            </Button>

            <Button
              style={GlobalStyle.authButton}
              full
              rounded
              onPress={() => navigation.navigate("SignUp")}
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
  header: {
    backgroundColor: "transparent",
    borderWidth: 0,
    elevation: 0,
  },
  content: {
    marginTop: 15,
  },
  censible: {
    fontSize: 40,
    textAlign: "center",
    color: "brown",
    textShadowColor: "black",
    textShadowRadius: 1,
  },
  image: {
    marginTop: 20,
    marginLeft: 20,
    alignSelf: "center",
  },
  button: {
    marginTop: 30,
  },
  text: {
    alignSelf: "center",
    marginTop: 30,
    fontSize: 13,
  },
  signUp: {
    fontWeight: "500",
    color: "red",
  },
});
