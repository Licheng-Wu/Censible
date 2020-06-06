import React, { Component } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { API_KEY } from "react-native-dotenv";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Button, ActionSheet } from "native-base";
import { Icon } from "react-native-elements";
import { request, PERMISSIONS } from "react-native-permissions";
import Geolocation from '@react-native-community/geolocation';

export default class ExploreScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialRegion: undefined,
      places: [],
    };
  }

  componentDidMount() {
    this.requestLocationPermission();
  }

  requestLocationPermission = async () => {
    if (Platform.OS === "ios") {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (response === "granted") {
        this.locateCurrentPosition();
      }
    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (response === "granted") {
        this.locateCurrentPosition();
      }
    }
  }

  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(position => {
      console.log(JSON.stringify(position));

      let initialRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.05
      }

      this.setState({ initialRegion })
    })
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1, zIndex: -1 }}
          provider={PROVIDER_GOOGLE}
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
