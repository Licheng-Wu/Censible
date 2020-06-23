import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { List, ListItem, Separator } from "native-base";
import firebase from "../../../firebaseDb";
import { useNavigation } from "@react-navigation/native";

const DateList = (props) => {
  const [data, setData] = React.useState([]);
  const navigation = useNavigation();

  React.useEffect(() => {
    let uid = firebase.auth().currentUser.uid;

    var unsubscribe = firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .collection(props.month)
      .doc(props.date)
      .collection("All Expenses")
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        const results = [];

        querySnapshot.docs.forEach((documentSnapshot) => {
          results.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setData(results);
      });
    return unsubscribe;
  }, []);

  if (data.length) {
    return (
      <List>
        <Separator style={styles.separator}>
          <Text style={styles.separatorText}>{props.date.substring(0, 6)}</Text>
        </Separator>
        {data.map((txn) => {
          return (
            <ListItem
              style={styles.item}
              onPress={() =>
                navigation.navigate("Details", {
                  id: txn.id,
                  name: txn.name,
                  price: txn.price,
                  category: txn.category,
                  date: txn.date,
                  description: txn.description,
                })
              }
              key={txn.id}
            >
              <View style={styles.itemDetails}>
                <Text style={{ fontSize: 16 }}>{txn.name}</Text>
                <Text style={{ color: "grey", fontSize: 12 }}>
                  {txn.category}
                </Text>
              </View>
              <Text style={{ color: "red", fontSize: 20 }}>
                {parseFloat(-txn.price).toFixed(2)}
              </Text>
            </ListItem>
          );
        })}
      </List>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  separator: {
    height: 45,
    marginTop: 25,
    marginBottom: -10,
    backgroundColor: "white",
  },
  separatorText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
  },
  itemDetails: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default DateList;
