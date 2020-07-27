import React from "react";
import { StyleSheet, View, Text, Alert, Dimensions } from "react-native";
import {
  Container,
  Title,
  List,
  ListItem,
  Left,
  Body,
} from "native-base";
import firebase from "../../../firebaseDb";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MonthlyTargetModal from "./MonthlyTargetModal";

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
        { text: "Cancel" },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleLogOutUser = () => {
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
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      "Delete account",
      "Are you sure you want to delete your account? " +
        "This action is irreversible and you will lose all your data.",
      [
        {
          text: "Delete",
          onPress: handleDeleteAccount,
          style: "destructive",
        },
        { text: "Cancel" },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleDeleteAccount = () => {
    const uid = firebase.auth().currentUser.uid;
    handleDeleteData(uid);
    firebase
      .auth()
      .currentUser.delete()
      .then(() => {
        console.log("Account deleted");
      })
      .catch((error) => console.error(error));
  };

  // Realised it does not work because deleting doc does not delete its subcollection
  const handleDeleteData = (uid) => {
    console.log(uid);
    firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .delete()
      .then(() => console.log("User data deleted"))
      .catch((error) => console.error(error));
  };

  return (
    <Container style={styles.container}>
      <View style={styles.headerAndListContainer}>
        <View style={styles.header}>
          <Title style={styles.title}>Settings</Title>
        </View>

        <View style={styles.containerView}>
          <List style={styles.listContainerView}>
            <View>
              <View style={styles.separator}>
                <Text style={styles.separatorText}>Manage</Text>
              </View>
              <ListItem
                icon
                key="budget"
                noBorder
                style={styles.item}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Left>
                  <AntDesign name="barchart" size={24} color="#0E7FFF" />
                </Left>
                <Body>
                  <Text style={styles.itemText}>Monthly Budget</Text>
                </Body>
              </ListItem>
              <ListItem
                icon
                key="category"
                noBorder
                style={styles.item}
                onPress={() => navigation.navigate("CategoryScreen")}
              >
                <Left>
                  <AntDesign name="piechart" size={24} color="#0E7FFF" />
                </Left>
                <Body>
                  <Text style={styles.itemText}>Categories</Text>
                </Body>
              </ListItem>
            </View>

            <View>
              <View style={styles.separator}>
                <Text style={styles.separatorText}>Account</Text>
              </View>
              <ListItem
                icon
                key="logout"
                noBorder
                style={styles.item}
                onPress={confirmLogOut}
              >
                <Left>
                  <AntDesign name="logout" size={24} color="#0E7FFF" />
                </Left>
                <Body>
                  <Text style={styles.itemText}>Logout</Text>
                </Body>
              </ListItem>
              <ListItem
                icon
                key="delete"
                noBorder
                style={styles.item}
                onPress={confirmDeleteAccount}
              >
                <Left>
                  <AntDesign name="delete" size={24} color="#0E7FFF" />
                </Left>
                <Body>
                  <Text style={styles.itemText}>Delete Account</Text>
                </Body>
              </ListItem>
            </View>
          </List>
        </View>
      </View>
      <MonthlyTargetModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2eeff",
  },
  headerAndListContainer: {
    flex: 1,
    zIndex: 1,
    flexDirection: "row",
    backgroundColor: "#EFEFEF",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    height: 200,
    width: Dimensions.get("window").width,
    alignSelf: "flex-start",
    // alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#0E7FFF",
    zIndex: 2,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    alignSelf: "center",
  },
  containerView: {
    flexDirection: "column",
    backgroundColor: "white",
    zIndex: 3,
    position: "absolute",
    justifyContent: "space-between",
    // alignSelf: "center",
    height: 450,
    width: 380,
    shadowColor: "#000",
    borderRadius: 20,
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
    elevation: 5,
  },
  listContainerView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  separator: {
    // height: -10,
    width: 100,
    padding: -10,
    marginLeft: 10,
    marginTop: 10,
    // backgroundColor: "white",
  },
  separatorText: {
    fontSize: 12,
    // fontWeight: "bold",
    color: "grey",
    marginTop: 8,
    marginLeft: 10,
  },
  item: {
    height: 40,
    margin: 5,
    marginLeft: 30,
    // opacity: 0.6,
  },
  itemText: {
    fontSize: 16,
    // fontWeight: "800",
    color: "#2B2B2B",
    marginTop: -5,
  },
});

export default Settings;
