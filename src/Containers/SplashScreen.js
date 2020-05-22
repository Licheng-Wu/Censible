import React from "react";
import { StyleSheet, View, Image } from "react-native";
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

export default function SplashScreen() {
  return (
    <Container>
      <Content style={styles.content}>
        <Image style={styles.image} source={require("../Images/logo3x.png")} />
        <Text style={styles.text}>Censible</Text>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4FCFF",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  text: {
    color: "blue",
  },
});
