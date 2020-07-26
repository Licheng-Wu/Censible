import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { Input } from "native-base";

const AddCategoryModal = (props) => {
  const [category, setCategory] = React.useState("");
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => null}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            style={{
              height: 60,
              width: 150,
              borderBottomWidth: 1,
              borderBottomColor: "#bfc6ea",
              textAlign: "center",
            }}
            placeholder="New Category"
            placeholderTextColor="#bfc6ea"
            onChangeText={(text) => setCategory(text)}
            value={category}
            maxLength={15}
          />

          <View style={{ flexDirection: "row" }}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                props.handleAddCategory(category);
                setCategory("");
                props.setModalVisible(!props.modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Add</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.button, backgroundColor: "red" }}
              onPress={() => {
                props.setModalVisible(!props.modalVisible);
              }}
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
    marginTop: 10,
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
  pickerText: {
    fontSize: 18,
    alignSelf: "center",
  },
});

export default AddCategoryModal;
