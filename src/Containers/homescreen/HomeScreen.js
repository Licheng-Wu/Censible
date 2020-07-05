import * as React from "react";
import { Container, ActionSheet, Spinner, Fab, Button } from "native-base";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DataPieChart from "./DataPieChart";
import MonthlyExpense from "./MonthlyExpense";
import MonthlyTargetModal from "../settings/MonthlyTargetModal";
import firebase from "../../../firebaseDb";
import * as tf from "@tensorflow/tfjs";
import { fetch } from "@tensorflow/tfjs-react-native";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as ImagePicker from "expo-image-picker";
import * as jpeg from "jpeg-js";
import * as FileSystem from "expo-file-system";
import {
  getCameraPermission,
  getGalleryPermission,
} from "../../../Permissions";
import PredictionModal from "./PredictionModal";

const HomeScreen = ({ navigation }) => {
  // Monthly Expense
  const [expense, setExpense] = React.useState(0);

  // Monthly Target
  const [target, setTarget] = React.useState(0);

  // Pie chart data
  const [data, setData] = React.useState({});

  // To show FAB for add expense options
  const [activeFab, setActiveFab] = React.useState(false);

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
            const dataObj = doc.data();
            setData(dataObj);
            if (doc.data().monthlyTotal !== undefined) {
              setExpense(doc.data().monthlyTotal);
            }
            if (doc.data().monthlyTarget !== undefined) {
              setTarget(doc.data().monthlyTarget);
            }
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
  const [loading, setLoading] = React.useState(false);

  // Loads Tensorflow model
  React.useEffect(() => {
    tf.ready().then(() => {
      setTfReady(true);
      console.log(tfReady);
    });
    mobilenet.load().then((model) => {
      setModel(model);
      setModelReady(true);
      console.log(modelReady);
    });
  }, []);

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
      setLoading(true);
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
      setLoading(false);
      setPredictions(predictions);
      console.log(predictions);
    } catch (error) {
      setLoading(false);
      alert("Error predicting image");
      console.log("error classifying");
      console.log(error);
    }
  };

  const launchCamera = async () => {
    getCameraPermission();
    console.log("Launch camera");
    try {
      const options = {
        quality: 1,
        base64: false,
        allowsEditing: true,
        aspect: [4, 3]
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
        allowsEditing: true,
        aspect: [4, 3]
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
    <Container style={styles.container}>
      <MonthlyExpense
        expense={expense}
        target={parseFloat(target)}
      />
      <View style={styles.chart}>
        <DataPieChart data={data} />
      </View>
      {loading && <Spinner style={styles.spinner} />}
      {predictions && (
        <PredictionModal
          predictions={predictions[0].className}
          setPredictions={setPredictions}
        />
      )}
      {!loading && (
        <Fab
          active={activeFab}
          direction="up"
          style={{ backgroundColor: "#5067FF" }}
          position="bottomRight"
          onPress={() => setActiveFab(!activeFab)}
        >
          <Ionicons name="ios-add" />
          <Button
            style={{ backgroundColor: "#34A34F" }}
            onPress={launchCamera}
          >
            <Ionicons name="ios-camera" size={22} />
          </Button>
          <Button
            style={{ backgroundColor: "#3B5998" }}
            onPress={selectImage}
          >
            <Ionicons name="ios-image" size={18} />
          </Button>
          <Button
            style={{ backgroundColor: "#DD5144" }}
            onPress={() => {
              navigation.navigate("Add Expense", {
                item: "",
              });
            }}
          >
            <Ionicons name="ios-create" size={20} />
          </Button>
        </Fab>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2eeff",
    padding: 10,
  },
  chart: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    margin: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
    elevation: 5,
  },
  spinner: {
    flex: 1,
  },
  button: {
    marginTop: 150,
    padding: 20,
    alignSelf: "flex-end",
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
