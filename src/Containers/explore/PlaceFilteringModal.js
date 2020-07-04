import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableHighlight,
  Slider,
} from "react-native";
import { Toast } from "native-base";
import RNPickerSelect from "react-native-picker-select";

const PlaceFilteringModal = (props) => {
  const [radius, setRadius] = React.useState(0);
  const [placeType, setPlaceType] = React.useState("");
  const [price, setPrice] = React.useState(1);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => null}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Select a category</Text>
          <RNPickerSelect
            placeholder={{ label: "Category", value: null }}
            textInputProps={styles.pickerText}
            onValueChange={(value) => setPlaceType(value)}
            items={[
              { label: "Food", value: "restaurant" },
              { label: "Education", value: "book_store" },
              { label: "Cafe", value: "cafe" },
              { label: "Groceries", value: "supermarket" },
            ]}
          />
          <Text style={styles.modalText}>
            Search radius: {radius.toFixed(1)} km
          </Text>
          <Slider
            style={{ width: 250, height: 40 }}
            minimumValue={0}
            maximumValue={5}
            onValueChange={(value) => setRadius(value)}
          />
          <Text style={styles.modalText}>Price range: {price.toFixed(0)}</Text>
          <Slider
            style={{ width: 250, height: 40 }}
            minimumValue={1}
            maximumValue={4}
            onValueChange={(value) => setPrice(value)}
          />
          <View style={{ flexDirection: "row" }}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                if (placeType) {
                  props.getNearbyPlaces(
                    radius.toFixed(1),
                    placeType,
                    price.toFixed(0)
                  );
                  props.setModalVisible(!props.modalVisible);
                  setPlaceType("");
                  setRadius(0);
                  setPrice(1);
                } else {
                  Toast.show({
                    text: "Please enter a category.",
                    buttonText: "Okay",
                    duration: 3000,
                    type: "warning",
                    style: { marginBottom: 84 },
                  });
                }
              }}
            >
              <Text style={styles.textStyle}>Search</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.button, backgroundColor: "red" }}
              onPress={() => {
                props.setModalVisible(!props.modalVisible);
                setPlaceType("");
                setRadius(0);
                setPrice(1);
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

export default PlaceFilteringModal;
