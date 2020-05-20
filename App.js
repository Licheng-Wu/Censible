import React from "react";
import { AppLoading } from "expo";
import {
  Container,
  Header,
  Content,
  InputGroup,
  Input,
  Title,
  Button,
  Text,
} from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import AddExpenseScreen from "./src/AddExpenseScreen";
import Login from "./src/Containers/Login";
import TabNavigator from "./src/Routes/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "./src/Containers/SignUp";
import LoginStack from "./src/Routes/StackNavigator"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isLoggedIn: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <NavigationContainer>
        <LoginStack/>
      </NavigationContainer>
    )
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
