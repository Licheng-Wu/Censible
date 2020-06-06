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
      places: [],
    };
  }

  getNearbyPlaces = () => {
    console.log("get");
    // Buangkok MRT
    // lat:  1.3829, long: 103.8934

    // Orchard Road
    // lat: 1.304833, long: 103.831833
    return fetch(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
        "location=1.304833,103.831833&" +
        "radius=1500&" +
        "type=shopping_mall&" +
        "maxprice=2&" +
        "key=" +
        API_KEY
    )
      .then((response) => response.json())
      .then((json) => {
        const tempHolder = [];
        let id = 0;
        let latitude;
        let longitude;
        let name;
        let vicinity;
        let obj;

        json.results.forEach((place) => {
          latitude = place.geometry.location.lat;
          longitude = place.geometry.location.lng;
          name = place.name;
          vicinity = place.vicinity;
          obj = {
            id: id,
            latitude: latitude,
            longitude: longitude,
            name: name,
            vicinity: vicinity,
          };
          id++;
          tempHolder.push(obj);
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
          {this.state.places.map((place) => {
            return (
              <Marker
                key={place.id}
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude,
                }}
                title={place.name}
                description={place.vicinity}
              />
            );
          })}
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
            onPress={this.getNearbyPlaces}
            // onPress={this.testingAPI}
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
