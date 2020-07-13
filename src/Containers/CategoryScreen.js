import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, Modal, Alert } from "react-native";
import {
  Button,
  List,
  ListItem,
  Left,
  Right,
  Switch,
  Body,
  Container,
  Item,
  Toast,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { addCategory, removeCategory } from "../redux/actions";
import AddCategoryModal from "./AddCategoryModal";

class Category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }

  handleAddCategory = (category) => {
    // dispatch actions to AddCategory
    this.props.addCategory(category);
  };

  handleRemoveCategory = (category) => {
    // dispatch actions to RemoveCategory
    this.createRemoveCategoryAlert(category);
  };

  createRemoveCategoryAlert = (category) => {
    Alert.alert(
      "Delete",
      "Do you really want to delete this category?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => this.props.removeCategory(category) },
      ],
      { cancelable: false }
    );
  };

  setModalVisible = (modalVisible) => this.setState({ modalVisible });

  render() {
    return (
      <Container style={styles.container}>
        <List style={styles.categoryList}>
          {this.props.category.map((indvCategory) => {
            return (
              <ListItem icon key={indvCategory}>
                <Left>
                  <Button
                    transparent
                    onPress={() => this.handleRemoveCategory(indvCategory)}
                  >
                    <Ionicons name="md-close" size={32} color="red" />
                  </Button>
                </Left>
                <Body>
                  <Text>{indvCategory}</Text>
                </Body>
              </ListItem>
            );
          })}
        </List>
        <Button
          full
          rounded
          info
          style={{ alignSelf: "flex-end" }}
          onPress={() => {
            if (this.props.category.length > 10) {
              Toast.show({
                text: "Too many categories",
                duration: 3000,
                buttonText: "Close",
                type: "warning",
                style: { marginBottom: 40 },
              });
            } else {
              this.setModalVisible(!this.state.modalVisible);
            }
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Add new category</Text>
        </Button>
        <AddCategoryModal
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          handleAddCategory={this.handleAddCategory}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e2eeff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,
  },
  categoryList: {
    backgroundColor: "white",
    justifyContent: "flex-end",
    shadowColor: "#000",
    borderRadius: 20,
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
    elevation: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    category: state.category,
  };
};

const mapDispatchToProps = { addCategory, removeCategory };

export default connect(mapStateToProps, mapDispatchToProps)(Category);
