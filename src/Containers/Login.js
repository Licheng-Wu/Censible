import * as React from "react";
import firebase from "../../firebaseDb";
import { StyleSheet, Text, Image } from "react-native";
import {
  Container,
  Content,
  Header,
  Title,
  Form,
  Input,
  Item,
  Button,
  Label,
  Spinner,
  Icon,
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "../Routes/TabNavigator";
import BlueButton from "../Component/BlueButton";
import HomeScreen from "./HomeScreen";
import { GlobalStyle } from "../styles/GlobalStyles";

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
        .signInWithEmailAndPassword(email.trim(), password)
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
        <Header style={styles.header}>
          <Title
            style={{
              fontSize: 40,
              fontFamily: "Roboto",
              fontWeight: "bold",
              color: "#3F6DB3",
            }}
          >
            Censible
          </Title>
        </Header>
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
    alignSelf: "center",
  },
  button: {
    marginTop: 30,
  },
  text: {
    alignSelf: 'center',
    marginTop: 30,
    fontSize: 13
  },
  signUp: {
    fontWeight: '500',
    color: 'red'
  }
});
