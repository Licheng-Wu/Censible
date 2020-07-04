import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Container, Header, Title, Content, List, Separator, ListItem } from "native-base";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MonthlyTargetModal from "./MonthlyTargetModal"

const Settings = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = React.useState(false);

  const confirmLogOut = () => {
    Alert.alert(
      "Logout",
      "Do you want to logout of Censible?",
      [
        {
          text: "Yes",
          onPress: handleLogOutUser,
          style: "destructive",
        },
        { text: "Cancel" }
      ],
      {
        cancelable: true,
      }
    )
  }
  const handleLogOutUser = () =>
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
    // {/* <Ionicons
    //     name="ios-log-out"
    //     color="#529FF3"
    //     size={40}
    //     onPress={signOut}
    //   /> */}
    <Container style={styles.container} >
      <Header style={styles.header}>
        <Title style={styles.title}>Settings</Title>
      </Header>
      <Content>
        <List>
          <Separator style={styles.separator} >
            <Text style={styles.separatorText}>General</Text>
          </Separator>
          <ListItem key="profile" noBorder style={styles.item}>
            <Text style={styles.itemText}>Profile</Text>
          </ListItem>

          <Separator style={styles.separator} >
            <Text style={styles.separatorText}>Manage</Text>
          </Separator>
          <ListItem key="budget" noBorder style={styles.item}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.itemText}>Monthly Budget</Text>
          </ListItem>
          <ListItem key="category" noBorder style={styles.item}
            onPress={() => navigation.navigate("CategoryScreen")}
          >
            <Text style={styles.itemText}>Categories</Text>
          </ListItem>

          <Separator style={styles.separator} >
            <Text style={styles.separatorText}>Account</Text>
          </Separator>
          <ListItem key="logout" noBorder style={styles.item}
            onPress={confirmLogOut}
          >
            <Text style={styles.itemText}>Logout</Text>
          </ListItem>
          <ListItem key="delete" noBorder style={styles.item}>
            <Text style={styles.itemText}>Delete Account</Text>
          </ListItem>
        </List>
      </Content>
      <MonthlyTargetModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Container >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2eeff",
  },
  header: {
    height: 60,
    backgroundColor: "#e2eeff"
  },
  title: {
    fontSize: 20,
  },
  separator: {
    height: 40,
    backgroundColor: "#e2eeff"
  },
  separatorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "darkblue",
    marginTop: 8
  },
  item: {
    height: 40,
    opacity: 0.6
  },
  itemText: {
    fontSize: 15,
    marginTop: -5
  }
});

export default Settings;
