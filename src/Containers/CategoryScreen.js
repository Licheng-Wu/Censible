import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, Modal } from "react-native";
import {
  Button,
  ListItem,
  Left,
  Right,
  Switch,
  Body,
  Container,
  Item,
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
    this.props.removeCategory(category);
  };

  setModalVisible = (modalVisible) => this.setState({ modalVisible });

  render() {
    return (
      <Container style={styles.container}>
        {/* <View style={styles.categoryList}> */}
        {this.props.category.map((indvCategory) => {
          return (
            <ListItem icon key={indvCategory.key}>
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
              {/* <Right>
                <Switch value={false} />
              </Right> */}
            </ListItem>
          );
        })}
        {/* </View> */}
        <Button
          full
          rounded
          info
          style={{ alignSelf: "flex-end" }}
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <Text>Add</Text>
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
    justifyContent: "center",
    padding: 20,
  },
  categoryList: {
    backgroundColor: "yellow",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
  },
});

const mapStateToProps = (state) => {
  return {
    category: state.category,
  };
};

const mapDispatchToProps = { addCategory, removeCategory };

export default connect(mapStateToProps, mapDispatchToProps)(Category);
