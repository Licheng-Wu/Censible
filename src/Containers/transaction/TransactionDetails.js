import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Container, Title, Content, Button } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { deleteExpense } from "../../../ExpenseAPI";

const TransactionDetails = ({ route, navigation }) => {
  const { id, name, price, category, date, description } = route.params;

  const confirmDelete = () => {
    Alert.alert(
      "Delete transaction",
      "Delete this transaction?",
      [
        {
          text: "Delete",
          onPress: () => {
            deleteExpense({
              id: id,
              price: price,
              category: category,
              date: date,
            });
            navigation.goBack();
          },
          style: "destructive",
        },
        { text: "Cancel" },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        <Title style={styles.header}>Details</Title>

        <View style={styles.detailsContainer}>
          <View style={styles.field}>
            <Text style={styles.textLeft}>Name</Text>
            <Text style={styles.textRight}>{name}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.textLeft}>Category</Text>
            <Text style={styles.textRight}>{category}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.textLeft}>Price</Text>
            <Text style={styles.textRight}>{price}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.textLeft}>Payment Date</Text>
            <Text style={styles.textRight}>{date.substr(0, 11)}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.textLeft}>Description</Text>
            <Text style={styles.textRight}>{description}</Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <AntDesign
            name="edit"
            size={40}
            color="#529FF3"
            onPress={() =>
              navigation.navigate("UpdateExpenseScreen", {
                id: id,
                name: name,
                price: price,
                category: category,
                date: date,
                description: description,
              })
            }
          />
          <AntDesign
            name="delete"
            size={40}
            color="red"
            onPress={confirmDelete}
          />
        </View>
      </Content>
    </Container>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e2eeff",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  content: {
    marginTop: 50,
  },
  header: {
    flex: 1,
    justifyContent: "flex-start",
    textAlign: "left",
    fontSize: 34,
    marginLeft: 10,
    color: "#3F6DB3",
  },
  detailsContainer: {
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 30,
    margin: 5,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
    elevation: 5,
  },
  field: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  textLeft: {
    fontSize: 20,
    color: "#bfc6ea",
  },
  textRight: {
    fontSize: 20,
    flexShrink: 1,
    textAlign: "right",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 50,
  },
});
