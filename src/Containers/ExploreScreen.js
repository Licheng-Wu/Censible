import React, { Component } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { API_KEY } from "react-native-dotenv";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Button } from "native-base";
import { Icon } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export default class ExploreScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      errorMessage: "",
      userLocation: {},
    };

    this.requestLocationPermission();
  }

  // componentWillMount() {
  //   this.requestLocationPermission();
  // }

  requestLocationPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      console.log("Permission not granted");

      this.setState({ errorMessage: "Permission not granted" });
    }

    const userLocation = await Location.getCurrentPositionAsync();

    this.setState({ userLocation: userLocation });
    // console.log(JSON.stringify(this.state.userLocation.coords.latitude));
    // console.log(JSON.stringify(this.state.userLocation.coords.longitude));
  };

  getNearbyPlaces = () => {
    console.log("get");
    // Buangkok MRT
    // lat:  1.3829, long: 103.8934

    // Orchard Road
    // lat: 1.304833, long: 103.831833
    return fetch(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
        "location=" +
        this.state.userLocation.coords.latitude +
        "," +
        this.state.userLocation.coords.longitude +
        "&" +
        "radius=1500&" +
        "type=restaurants&" +
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
            // onPress={this.requestLocationPermission}
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
