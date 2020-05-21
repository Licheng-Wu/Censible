import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import firebase from 'firebase'
import Login from './Login'

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  logoutUser = () => {
    try {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('User signed out!');
        })
    } catch (error) {
      console.log(error.toString(error));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress = {this.logoutUser}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})