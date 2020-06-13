import * as React from "react";
import { Container, Content, Footer, ActionSheet } from "native-base";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DataPieChart from "./DataPieChart";
import MonthlyExpense from "./MonthlyExpense";
import MonthlyTargetModal from "./MonthlyTargetModal";
import firebase from "../../../firebaseDb";
import * as tf from "@tensorflow/tfjs";
import { fetch } from "@tensorflow/tfjs-react-native";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as jpeg from "jpeg-js";
import * as FileSystem from "expo-file-system";

const HomeScreen = ({ navigation }) => {
  // Monthly Expense
  const [expense, setExpense] = React.useState(0);

  // Monthly Target
  const [target, setTarget] = React.useState(0);

  // Pie chart data
  const [foodPrice, setFoodPrice] = React.useState(0);
  const [transportPrice, setTransportPrice] = React.useState(0);
  const [educationPrice, setEducationPrice] = React.useState(0);
  const [entertainmentPrice, setEntertainmentPrice] = React.useState(0);
  const [sportsPrice, setSportsPrice] = React.useState(0);
  const [otherPrice, setOtherPrice] = React.useState(0);

  // For updating of monthly target
  const [modalVisible, setModalVisible] = React.useState(false);

  // Updates monthly expense and pie chart
  React.useEffect(() => {
    let uid = firebase.auth().currentUser.uid;
    let month = new Date().toString().substr(4, 3);
    var unsubscribe = firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .collection(month)
      .doc("Info")
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            setExpense(doc.data().monthlyTotal);
            setTarget(doc.data().monthlyTarget);
            if (doc.data().Food !== undefined) {
              setFoodPrice(doc.data().Food);
            }
            if (doc.data().Transport !== undefined) {
              setTransportPrice(doc.data().Transport);
            }
            if (doc.data().Education !== undefined) {
              setEducationPrice(doc.data().Education);
            }
            if (doc.data().Entertainment !== undefined) {
              setEntertainmentPrice(doc.data().Entertainment);
            }
            if (doc.data().Sports !== undefined) {
              setSportsPrice(doc.data().Sports);
            }
            if (doc.data().Others !== undefined) {
              setOtherPrice(doc.data().Others);
            }
          } else {
            setExpense(0);
            setFoodPrice(0);
            setTransportPrice(0);
            setEducationPrice(0);
            setEntertainmentPrice(0);
            setSportsPrice(0);
            setOtherPrice(0);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    return unsubscribe;
  }, []);

  // Tensorflow Model
  const [tfReady, setTfReady] = React.useState(false);
  const [model, setModel] = React.useState(null);
  const [modelReady, setModelReady] = React.useState(false);
  const [predictions, setPredictions] = React.useState(null);

  React.useEffect(() => {
    const loadTFJS = async () => {
      await tf.ready();
      setTfReady(true);
      console.log(tfReady);
      let model = await mobilenet.load();
      setModel(model);
      setModelReady(true);
      console.log(modelReady);
    };
    loadTFJS();
  }, [tfReady, modelReady]);

  const imageToTensor = (rawImageData) => {
    // rawImageData refers to the binary data. rawImageData is a buffer

    const TO_UINT8ARRAY = true;
    // const data is a typed array holding raw binary data
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    // Drop the alpha channel info for mobilenet
    // Create a buffer in memory of size length
    const buffer = new Uint8Array(width * height * 3);
    // stores the data in buffer
    let offset = 0;
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];

      offset += 4;
    }
    // Creates a rank 3 tensor. For RGB channels
    // Buffer is the data. And [height, width, 3] specifies the shape of the tensor
    // Height and width is the dimensions of the 2D layer, 3 refers to the number of layers
    return tf.tensor3d(buffer, [height, width, 3]);
  };

  const classifyImage = async (uri) => {
    try {
      console.log("Classifying uri: " + uri);
      const imgB64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
      const rawImageData = new Uint8Array(imgBuffer);
      // References the image object which has the properties uri, width, and height
      // const imageAssetPath = Image.resolveAssetSource(image);
      // console.log(imageAssetPath);
      // fetch returns a response
      // const response = await fetch(uri, {}, { isBinary: true });
      // console.log(response);
      // turn the response into an ArrayBuffer (binary data)
      // const rawImageData = await response.arrayBuffer();
      const imageTensor = imageToTensor(rawImageData);
      const predictions = await model.classify(imageTensor);
      setPredictions(predictions);
      console.log(predictions);
    } catch (error) {
      console.log("error classifying");
      console.log(error);
    }
  };

  const getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
    }
  };

  const getGalleryPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  const launchCamera = async () => {
    getCameraPermission();
    console.log("Launch camera");
    try {
      const options = {
        quality: 1,
        base64: false,
      };

      const result = await ImagePicker.launchCameraAsync(options);

      if (result.cancelled) {
        console.log("User cancelled camera");
      } else {
        classifyImage(result.uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const selectImage = async () => {
    getGalleryPermission();
    console.log("Select Image");
    try {
      const options = {
        quality: 1,
        base64: false,
      };

      const result = await ImagePicker.launchImageLibraryAsync(options);

      if (result.cancelled) {
        console.log("User cancelled image picker");
      } else {
        classifyImage(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Content contentContainerStyle={{ backgroundColor: "#F4FCFF", flex: 1 }}>
        <MonthlyExpense
          expense={expense}
          target={parseFloat(target)}
          // target={target}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <View style={styles.chart}>
          <DataPieChart
            style={styles.chart}
            food={parseFloat(foodPrice.toFixed(2))}
            transport={parseFloat(transportPrice.toFixed(2))}
            education={parseFloat(educationPrice.toFixed(2))}
            entertainment={parseFloat(entertainmentPrice.toFixed(2))}
            sports={parseFloat(sportsPrice.toFixed(2))}
            others={parseFloat(otherPrice.toFixed(2))}
          />
        </View>
        <MonthlyTargetModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </Content>
      <Footer style={styles.footer}>
        <Ionicons
          name="ios-add-circle-outline"
          color="#529FF3"
          size={45}
          style={{ marginTop: 10 }}
          onPress={() => {
            const BUTTONS = [
              "Add expense manually",
              "Take a photo",
              "Select a photo",
              "Cancel",
            ];
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: 3,
                destructiveButtonIndex: 3,
                title: "Add an expense",
              },
              (buttonIndex) => {
                if (buttonIndex === 0) {
                  navigation.navigate("Add Expense");
                } else if (buttonIndex === 1) {
                  launchCamera();
                } else if (buttonIndex === 2) {
                  selectImage();
                }
              }
            );
          }}
        />
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  chart: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    margin: 12,
  },
  footer: {
    marginBottom: 20,
    flexDirection: "row",
    backgroundColor: "#F4FCFF",
    justifyContent: "space-around",
    alignItems: "flex-start",
    elevation: 0,
    borderWidth: 0,
  },
});

export default HomeScreen;

// Updates pie chart
// collectionRef
//   .doc("Info")
//   .onSnapshot(querySnapshot => {
//     querySnapshot.docs.forEach(doc => {
//       if (doc.id === "Food") {
//         // prices.splice(0, 1, doc.data().total)
//         setFoodPrice(doc.data().total);
//       } else if (doc.id === "Transport") {
//         // prices.splice(1, 1, doc.data().total)
//         setTransportPrice(doc.data().total);
//       } else if (doc.id === "Education") {
//         // prices.splice(2, 1, doc.data().total)
//         setEducationPrice(doc.data().total);
//       } else if (doc.id === "Entertainment") {
//         // prices.splice(3, 1, doc.data().total)
//         setEntertainmentPrice(doc.data().total);
//       } else if (doc.id === "Sports") {
//         // prices.splice(4, 1, doc.data().total)
//         setSportsPrice(doc.data().total);
//       } else {
//         // prices.splice(5, 1, doc.data().total)
//         setOtherPrice(doc.data().total);
//       }
//     })
//   }, error => {
//     console.error(error);
//   })
