import * as React from "react";
import { Form, Item, Input, Toast } from "native-base";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableHighlight,
} from "react-native";
import firebase from "../../../firebaseDb";

const MonthlyTargetModal = (props) => {
  const [target, setTarget] = React.useState("");

  const handleUpdateTarget = (target) => {
    let uid = firebase.auth().currentUser.uid;
    const month = new Date().toString().substr(4, 3);

    firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .collection(month)
      .doc("Info")
      .set(
        {
          monthlyTarget: target,
        },
        {
          merge: true,
        }
      )
      .then((docRef) => {
        console.log("Monthly target updated!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => null}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Set your monthly target!</Text>
          <Form>
            <Item style={{ width: 150, height: 30 }}>
              <Input
                keyboardType="numeric"
                placeholder="Target"
                placeholderTextColor="#bfc6ea"
                onChangeText={(text) => setTarget(text)}
                value={target}
              />
            </Item>
          </Form>
          <View style={{ flexDirection: "row" }}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                if (target > 0) {
                  handleUpdateTarget(parseFloat(target));
                  props.setModalVisible(!props.modalVisible);
                  Toast.show({
                    text: "Update successful!",
                    duration: 3000,
                    buttonText: "Okay",
                    type: "success",
                    style: { marginBottom: 40 },
                  });
                } else {
                  Toast.show({
                    text: "Invalid amount.",
                    buttonText: "Okay",
                    duration: 3000,
                    type: "warning",
                    position: "top",
                    style: { marginTop: 100 },
                  });
                }
              }}
            >
              <Text style={styles.textStyle}>Update</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.button, backgroundColor: "red" }}
              onPress={() => props.setModalVisible(!props.modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    color: "gray",
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    width: 100,
    padding: 12,
    elevation: 2,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});

export default MonthlyTargetModal;
