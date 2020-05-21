import * as React from "react";
import firebase from "../../firebaseDb";
import { StyleSheet, Text, Image } from "react-native";
import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label,
  Spinner,
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "../Routes/TabNavigator";
import StackNavigator from "../Routes/StackNavigator";
import BlueButton from "../Component/BlueButton";
import HomeScreen from "./HomeScreen";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loggedIn: false,
    };
  }

  handleEmail = (email) => this.setState({ email });

  handlePassword = (password) => this.setState({ password });

  loginUser = (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res.user.email);
          this.props.navigation.replace("TabNavigator");
        });
    } catch (error) {
      console.log(error.toString(error));
    }
  };

  render() {
    const { email, password, loggedIn } = this.state;
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.censible}>Censible</Text>
          <Image style={styles.image} source={require("../Images/logo.jpg")} />
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={this.handleEmail}
              />
            </Item>

            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={this.handlePassword}
              />
            </Item>

            <Button
              style={styles.button}
              full
              rounded
              success
              onPress={() => this.loginUser(email, password)}
            >
              <Text>Login</Text>
            </Button>

            <Button
              style={styles.button}
              full
              rounded
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text>Sign Up</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }

  //   componentDidMount() {
  //     firebase.auth().onAuthStateChanged((user) => {
  //       if (user) {
  //         this.setState({ loggedIn: true });
  //         console.log(user);
  //       } else {
  //         console.log("Error");
  //       }
  //       if (this.state.loggedIn) {
  //         return <Spinner />;
  //       }
  //     });
  //   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
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
    alignSelf: "center",
  },
  button: {
    marginTop: 30,
  },
});
