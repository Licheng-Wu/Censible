import React from "react";
import { AppLoading } from "expo";
import { Spinner, Root } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import TabNavigator from "./src/Routes/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import LoginStack from "./src/Routes/StackNavigator";
import firebase from "./firebaseDb";
import SplashScreen from "./src/Containers/SplashScreen";
import ModalStackNavigator from "./src/Routes/ModalStackNavigator";

export default class App extends React.Component {
  unsubscribe = null;

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isLoading: true,
      userToken: null,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isLoading: false });
    unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    });
  }

  componentWillUnmount() {
    // Unsubscribe to the firebase auth listener when we have stopped using it
    // Explanation: https://stackoverflow.com/questions/59223510/why-do-i-need-to-unsubscribe-to-onauthstatechanged-in-firebase
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  // handleClick = () => this.setState({ isLoggedIn: true });

  render() {
    if (this.state.isLoading) {
      return <Spinner style={{ flex: 1 }} />;
    }

    return (
      <Root>
        <NavigationContainer>
          {this.state.isLoggedIn ? (
            <TabNavigator />
          ) : (
            <LoginStack />
          )}
        </NavigationContainer>
      </Root>
    );
  }
}
