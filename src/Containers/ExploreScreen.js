import React, { Component } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { API_KEY } from "react-native-dotenv";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Button, ActionSheet } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export default class ExploreScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLocation: {},
      places: [],
      errorMessage: "",
    };

    this.requestLocationPermission();
  }

  requestLocationPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      console.log("Permission not granted");

      this.setState({ errorMessage: "Permission not granted" });
    }

    const userLocation = await Location.getCurrentPositionAsync();

    this.setState({ 
      initialRegion: {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.005
      }
       
    });

    console.log(JSON.stringify(this.state.initialRegion.latitude));
    console.log(JSON.stringify(this.state.initialRegion.longitude));
  };

  chooseCategory = () => {
    var BUTTONS = ["Food", "Education", "Entertainment", "Sports", "Cancel"];
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 4,
        destructiveButtonIndex: 4,
        title: "Choose a category"
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.getNearbyPlaces();
        } else if (buttonIndex === 1) {

        } else if (buttonIndex === 2) {

        } else {

        } 
      }
    )
  }

  getNearbyPlaces = () => {
    console.log("get");
    // Buangkok MRT
    // lat:  1.3829, long: 103.8934

    // Orchard Road
    // lat: 1.304833, long: 103.831833

    const { latitude, longitude } = this.state.initialRegion;
    let radius = 1500;
    let placeType = "restaurant";
    let price = 4;

    return fetch(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
        "location=" + latitude + "," + longitude +
        "&radius=" + radius +
        "&type=" + placeType +
        "&maxprice=" + price +
        "&key=" + API_KEY
    )
      .then((response) => response.json())
      .then((json) => {
        const tempHolder = [];
        let id = 0;
        json.results.forEach((place) => {
          let obj = {
            id: id,
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
            name: place.name,
            vicinity: place.vicinity,
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
          ref={map => this.map = map}
          showsUserLocation
          initialRegion={this.state.initialRegion}
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
            height: 60,
            top: "90%", // to align vertically at the bottom
            alignSelf: "center", // to align horizontally center
            zIndex: 10,
          }}
        >
          <Ionicons
            reverse
            name="md-compass"
            color="#378BE5"
            size={55}
            style={{borderRadius: 10}}
            onPress={this.chooseCategory}
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
