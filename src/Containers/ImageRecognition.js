import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as tf from "@tensorflow/tfjs";
import { fetch } from "@tensorflow/tfjs-react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as jpeg from "jpeg-js";

export default class ImageRecognition extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTfReady: false,
      isModelReady: false,
    };
  }

  async componentDidMount() {
    await tf.ready();
    this.setState({
      isTfReady: true,
    });
    this.model = await mobilenet.load();
    this.setState({ isModelReady: true });
    //Output in Expo console
    console.log(this.state.isTfReady);

    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Model ready?{" "}
          {this.state.isModelReady ? (
            <Text>Yes</Text>
          ) : (
            <Text>Loading Model...</Text>
          )}
        </Text>
        <Text>TFJS ready? {this.state.isTfReady ? <Text>Yes</Text> : ""}</Text>
      </View>
    );
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
