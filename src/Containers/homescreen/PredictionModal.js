import * as React from "react";
import { List, ListItem } from "native-base";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const PredictionModal = (props) => {
  const navigation = useNavigation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.predictions !== null}
      onRequestClose={() => null}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Choose a name:</Text>
          <List>
            {props.predictions.map((prediction) => {
              return (
                <ListItem
                  style={styles.item}
                  noBorder={true}
                  key={prediction}
                  onPress={() => {
                    navigation.navigate("Add Expense", {
                      item: prediction,
                    });
                    props.setPredictions(null);
                  }}
                >
                  <Text style={styles.itemText}>{prediction}</Text>
                </ListItem>
              );
            })}
          </List>
          <TouchableHighlight
            style={{ ...styles.button, backgroundColor: "red" }}
            onPress={() => {
              props.setPredictions(null);
            }}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    margin: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
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
    textAlign: "center",
    fontSize: 20,
    color: "gray",
  },
  item: {
    justifyContent: "center",
  },
  itemText: {
    fontSize: 18,
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    width: 100,
    padding: 12,
    elevation: 2,
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});

export default PredictionModal;
