import * as React from "react";
import { Container, Spinner } from "native-base";
import { View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DataPieChart from "./DataPieChart";
import MonthlyExpense from "./MonthlyExpense";
import firebase from "../../../firebaseDb";
import * as tf from "@tensorflow/tfjs";
import * as ImagePicker from "expo-image-picker";
import * as jpeg from "jpeg-js";
import {
  getCameraPermission,
  getGalleryPermission,
} from "../../../Permissions";
import PredictionModal from "./PredictionModal";
import { FloatingAction } from "react-native-floating-action";
import { VISION_API_KEY } from "react-native-dotenv";
import ExpensePrediction from "./ExpensePrediction";

const HomeScreen = ({ navigation }) => {
  // Monthly Expense
  const [expense, setExpense] = React.useState(0);

  // Monthly Target
  const [target, setTarget] = React.useState(0);

  // Pie chart data
  const [data, setData] = React.useState({});

  // List of predictions for image classification
  const [predictions, setPredictions] = React.useState(null);

  // Set to true when processing images
  const [loading, setLoading] = React.useState(false);

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

  const launchCamera = async () => {
    getCameraPermission();
    console.log("Launch camera");
    try {
      const options = {
        quality: 1,
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
      };

      const result = await ImagePicker.launchCameraAsync(options);

      if (result.cancelled) {
        console.log("User cancelled camera");
      } else {
        classifyImage(result.base64);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const classifyImage = async (base64) => {
    try {
      setLoading(true);
      const body = JSON.stringify({
        requests: [
          {
            features: [{ type: "LABEL_DETECTION", maxResults: 3 }],
            image: {
              content: base64,
            },
          },
        ],
      });
      const response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
        VISION_API_KEY,
        {
          method: "POST",
          body: body,
        }
      );
      const responseJson = await response.json();
      const data = responseJson.responses[0].labelAnnotations;
      let pred = [];
      data.forEach((prediction) => pred.push(prediction.description));
      setPredictions(pred);
    } catch (error) {
      console.error(error);
      alert("Error classifying image.");
    } finally {
      setLoading(false);
    }
  };

  const selectReceipt = async () => {
    getGalleryPermission();
    console.log("Select receipt");
    try {
      const options = {
        quality: 1,
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
      };

      const result = await ImagePicker.launchImageLibraryAsync(options);

      if (result.cancelled) {
        console.log("User cancelled image picker");
      } else {
        handleTextExtraction(result.base64);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTextExtraction = async (base64) => {
    try {
      setLoading(true);
      const body = JSON.stringify({
        requests: [
          {
            features: [{ type: "TEXT_DETECTION" }],
            image: {
              content: base64,
            },
          },
        ],
      });
      const response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
        VISION_API_KEY,
        {
          method: "POST",
          body: body,
        }
      );
      const responseJson = await response.json();
      const extractedText =
        responseJson.responses[0].textAnnotations[0].description;
      handleDataExtraction(extractedText);
    } catch (error) {
      console.error(error);
      alert("Error processing receipt.");
    } finally {
      setLoading(false);
    }
  };

  const handleDataExtraction = (extractedText) => {
    let text = extractedText;
    if (!text.includes("PayLah!")) {
      alert("Error processing receipt");
    } else {
      const lines = text.split("\n");

      //Regex matching decimal value at end of line
      const regexAmount = /\d+\.[0-9]{2}$/;
      const amountIndex = lines.findIndex((line) => regexAmount.test(line));
      const itemName = lines[amountIndex - 1];

      const amountLine = lines[amountIndex];
      const amount = amountLine.substring(amountLine.search(regexAmount));

      const dateLine = lines[amountIndex + 1];
      const dayMonth = dateLine.substring(0, 6);
      const year = new Date().getFullYear();
      const completeDate = dayMonth + " " + year;

      console.log(itemName);
      console.log(amount);
      console.log(completeDate);
      navigation.navigate("Add Expense", {
        item: itemName,
        amount: amount.toString(),
        date: completeDate,
      });
    }
  };

  // Actions for Floating Action Button
  const actions = [
    {
      text: "Camera",
      icon: <AntDesign name="camerao" size={20} />,
      name: "camera",
      position: 3,
    },
    {
      text: "Scan Receipt",
      icon: <AntDesign name="scan1" size={20} />,
      name: "receipt",
      position: 2,
    },
    {
      text: "Manual Input",
      icon: <AntDesign name="form" size={20} />,
      name: "manual",
      position: 1,
    },
  ];

  return (
    <Container style={styles.container}>
      <MonthlyExpense expense={expense} target={parseFloat(target)} />
      <View style={styles.chart}>
        <DataPieChart data={data} />
      </View>
      <ExpensePrediction expense={expense} target={target} />
      {loading && <Spinner style={styles.spinner} />}
      {predictions && (
        <PredictionModal
          predictions={predictions}
          setPredictions={setPredictions}
        />
      )}
      {!loading && (
        <FloatingAction
          actions={actions}
          actionsPaddingTopBottom={3}
          onPressItem={(name) => {
            if (name === "camera") {
              launchCamera();
            } else if (name === "receipt") {
              selectReceipt();
            } else {
              navigation.navigate("Add Expense", {});
            }
          }}
        />
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
