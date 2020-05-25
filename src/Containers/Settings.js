import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import firebase from 'firebase';
import { Icon } from 'react-native-elements';
const Settings = () => {

  signOut = () =>
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("Signed out");
      })
      .catch(error => {
        // An error happened.
        console.log(error.toString());
      });

  return (
    <View style={styles.container}>
      <Icon
        reverse
        name="ios-log-out"
        color="#529FF3"
        type="ionicon"
        onPress={signOut}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Settings;