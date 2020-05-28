import React from "react";
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity } from "react-native";
import { Container, Header, Title, Content, List, ListItem, Separator } from "native-base";
import firebase from "../../../firebaseDb"
import { useNavigation } from "@react-navigation/native"

const DateList = props => {

  const [data, setData] = React.useState([]);
  const navigation = useNavigation();

  React.useEffect(() => {

    let uid = firebase.auth().currentUser.uid;
    let month = new Date().toString().substr(4, 3);

    firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .collection(month)
      .doc(props.date)
      .collection("All Expenses")
      .orderBy("date", "desc")
      .get()
      .then(querySnapshot => {
        const results = [];
        querySnapshot.docs.forEach(documentSnapshot => {
          results.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id
          })
        })
        setData(results);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <List>
      <Separator bordered style={{height: 45}}>
        <Text style={{fontSize: 15}}>
          {props.date.substring(0, 6)}
        </Text>
      </Separator>
      {
        data.map(txn => {
          return (
            <ListItem
              style={styles.item}
              button={true}
              onPress={() => navigation.navigate("Details")}
              key={txn.id}
            >
              <View style={styles.itemDetails}>
                <Text style={{ fontSize: 20 }}>{txn.name}</Text>
                <Text style={{ color: 'grey' }}>{txn.category}</Text>
              </View>
              <Text style={{ color: 'red', fontSize: 25 }}>{parseFloat(-txn.price).toFixed(2)}</Text>
            </ListItem>
          )
        })
      }
    </List>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
})

export default DateList;