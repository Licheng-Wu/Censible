import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { List, Separator, ListItem } from "native-base";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CategoryScreen from "./CategoryScreen";

const Settings = () => {
  const navigation = useNavigation();
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
      {/* <Ionicons
        name="ios-log-out"
        color="#529FF3"
        size={40}
        onPress={signOut}
      /> */}
      <Separator bordered>
        <Text>Customize</Text>
      </Separator>
      <ListItem onPress={() => navigation.navigate("CategoryScreen")}>
        <Text>Manage Categories</Text>
      </ListItem>
      <ListItem itemHeader enableEmptySections={true}></ListItem>
      <ListItem onPress={signOut}>
        <Text>Logout</Text>
      </ListItem>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingTop: 100,
  },
});

export default Settings;
