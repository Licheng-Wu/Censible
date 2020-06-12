import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as tf from "@tensorflow/tfjs";
import { fetch } from "@tensorflow/tfjs-react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as jpeg from "jpeg-js";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as ImagePicker from "expo-image-picker";
import cat from "../../assets/cat.jpg";
import { Camera } from "expo-camera";

export default class ImageRecognition extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTfReady: false,
      isModelReady: false,
      predictions: null,
      // image: cat,
      image: false,
      cameraStatus: null,
      cameraRef: null,
    };
  }

  async componentDidMount() {
    await tf.ready();
    this.setState({
      isTfReady: true,
    });
    console.log(this.state.isTfReady);
    this.model = await mobilenet.load();
    this.setState({ isModelReady: true });
    //Output in Expo console
    console.log(this.state.isModelReady);
    // this.classifyImage();
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // if (status !== "granted") {
    //   alert("Sorry, we need camera roll permissions to make this work!");
    // }
    const { cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
    if (cameraStatus !== "granted") {
      this.setState({ cameraStatus: false });
      alert("Sorry, we need camera permissions to make this work!");
    } else {
      this.setState({ cameraStatus: true });
    }

    // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // if (status !== "granted") {
    //   alert("Sorry, we need camera roll permissions to make this work!");
    // }
  };

  imageToTensor(rawImageData) {
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
  }

  classifyImage = async () => {
    try {
      console.log("Classifying");
      console.log(this.state.image);
      // References the image object which has the properties uri, width, and height
      // const imageAssetPath = Image.resolveAssetSource(this.state.image);
      // console.log(imageAssetPath);
      // fetch returns a response
      // const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });

      const response = await fetch(
        this.state.image.uri,
        {},
        { isBinary: true }
      );
      console.log(response);
      // const response = await fetch(this.state.image, {}, { isBinary: true });
      // turn the response into an ArrayBuffer (binary data)
      const rawImageData = await response.arrayBuffer();
      const imageTensor = this.imageToTensor(rawImageData);
      const predictions = await this.model.classify(imageTensor);
      this.setState({ predictions });
      console.log(predictions);
    } catch (error) {
      console.log("error classifying");
      console.log(error);
    }
  };

  selectImage = async () => {
    try {
      console.log("select image");
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!response.cancelled) {
        const source = { uri: response.uri };
        this.setState({ image: source });
        this.classifyImage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    // if (this.state.image) {
    //   console.log("if");
    //   console.log(this.state.image);
    //   return (
    //     <View>
    //       <Image source={this.state.image} />
    //     </View>
    //   );
    // }
    return (
      // <View style={styles.container}>
      //   <Text>
      //     Model ready?{" "}
      //     {this.state.isModelReady ? (
      //       <Text>Yes</Text>
      //     ) : (
      //       <Text>Loading Model...</Text>
      //     )}
      //   </Text>
      //   <Text>TFJS ready? {this.state.isTfReady ? <Text>Yes</Text> : ""}</Text>
      //   <TouchableOpacity
      //     // style={styles.imageWrapper}
      //     onPress={this.state.isModelReady ? this.selectImage() : undefined}
      //   >
      //     {this.state.image && (
      //       <Image source={this.state.image} style={styles.imageContainer} />
      //     )}

      //     {this.state.isModelReady && !this.state.image && (
      //       <Text style={styles.transparentText}>Tap to choose image</Text>
      //     )}
      //   </TouchableOpacity>
      // </View>
      // <View>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        ref={(ref) => {
          this.camera = ref;
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={async () => {
              if (this.camera) {
                const options = {
                  quality: 1,
                  base64: false,
                  // fixOrientation: true,
                  // exif: true,
                };
                let photo = await this.camera.takePictureAsync(options);
                console.log(photo);
                photo.height = 800;
                photo.width = 600;
                // console.log(photo.uri);
                // photo.uri = "data:image/jpg;base64," + photo.uri;
                // console.log("+++++++++++++++++++++++++++++++++++++++");
                this.setState({ image: photo });
                this.classifyImage();
              }
            }}
          >
            <View
              style={{
                borderWidth: 2,
                // borderRadius: "50%",
                borderColor: "white",
                height: 50,
                width: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  // borderRadius: "50%",
                  borderColor: "white",
                  height: 40,
                  width: 40,
                  backgroundColor: "white",
                }}
              ></View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
