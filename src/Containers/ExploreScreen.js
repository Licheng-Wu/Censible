import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { API_KEY } from "react-native-dotenv";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Button } from "native-base";
import { Icon } from "react-native-elements";

export default class ExploreScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: ["1"],
    };
  }

  getNearbyPlaces = () => {
    return fetch(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=" +
        API_KEY
    )
      .then((response) => response.json())
      .then((json) => {
        const tempHolder = [];
        json.results.forEach((place) => {
          tempHolder.push(place);
        });
        this.setState({ places: tempHolder });
        console.log(this.state.places);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  testingAPI = () => {
    return fetch("https://reactnative.dev/movies.json")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1, zIndex: -1 }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          initialRegion={{
            latitude: 1.3521,
            longitude: 103.8198,
            latitudeDelta: 0.8922,
            longitudeDelta: 0.2421,
          }}
        >
          <Marker coordinate={{ latitude: 1.2521, longitude: 103.8198 }} />
        </MapView>
        <View
          style={{
            flex: 1,
            position: "absolute",
            width: 50,
            height: 50,
            top: "90%", // to align vertically at the bottom
            alignSelf: "center", // to align horizontally center
            zIndex: 10,
          }}
        >
          <Icon
            reverse
            name="explore"
            color="#378BE5"
            onPress={this.testingAPI}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
