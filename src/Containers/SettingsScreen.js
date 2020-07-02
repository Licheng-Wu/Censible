import React from "react";
import { StyleSheet, View, Text } from "react-native";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import Category from "./Category";

const Settings = () => {
  const signOut = () =>
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("Signed out");
      })
      .catch((error) => {
        // An error happened.
        console.log(error.toString());
      });

  return (
    <View style={styles.container}>
      <Ionicons
        name="ios-log-out"
        color="#529FF3"
        size={40}
        onPress={signOut}
      />
      <Category></Category>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Settings;
