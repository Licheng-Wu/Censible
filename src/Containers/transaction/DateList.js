import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  List,
  ListItem,
  Separator,
} from "native-base";
import firebase from "../../../firebaseDb";
import { useNavigation } from "@react-navigation/native";

const DateList = (props) => {
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
      .onSnapshot((querySnapshot) => {
        const results = [];
        querySnapshot.docs.forEach((doc) => {
          results.push(doc.data());
        });
        setData(results);
        console.log(data);
      });
  }, []);

  return (
    <List keyExtractor={(index) => index.toString()}>
      <ListItem itemDivider>
        <Title>{props.date.substring(0, 6)}</Title>
      </ListItem>
      {data.map((txn, index) => {
        return (
          <ListItem
            style={styles.item}
            onPress={() => navigation.navigate("Details")}
            key={index}
          >
            <View style={styles.itemDetails}>
              <Text style={{ fontSize: 20 }}>{txn.name}</Text>
              <Text style={{ color: "grey" }}>{txn.category}</Text>
            </View>
            <Text style={{ color: "red", fontSize: 25 }}>
              {parseFloat(-txn.price).toFixed(2)}
            </Text>
          </ListItem>
        );
      })}
    </List>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
  },
  itemDetails: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default DateList;
