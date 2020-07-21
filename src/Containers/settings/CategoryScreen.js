import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, TouchableOpacity, Alert, LayoutAnimation } from "react-native";
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
import { addCategory, removeCategory, orderCategory } from "../../redux/actions";
import AddCategoryModal from "./AddCategoryModal";
import DraggableFlatList from "react-native-draggable-flatlist";
import SwipeableItem from "react-native-swipeable-item";
import Animated from "react-native-reanimated";

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
    // Animation when item is deleted
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);    
    // dispatch actions to RemoveCategory
    this.props.removeCategory(category)
  };

  confirmDelete = (category) => {
    Alert.alert(
      "Delete",
      "Do you really want to delete this category?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => this.handleRemoveCategory(category) },
      ],
      { cancelable: false }
    );
  };

  setModalVisible = (modalVisible) => this.setState({ modalVisible });

  itemRefs = new Map();

  renderItem = ({ item, index, drag }) => {
    return (
      <SwipeableItem
        key={item}
        item={{ item, drag }}
        ref={ref => {
          if (ref && !this.itemRefs.get(item)) {
            this.itemRefs.set(item, ref);
          }
        }}
        onChange={({ open }) => {
          if (open) {
            // Close all other open items
            [...this.itemRefs.entries()].forEach(([key, ref]) => {
              if (key !== item && ref) ref.close();
            });
          }
        }}
        overSwipe={50}
        renderUnderlayLeft={this.renderUnderlayLeft}
        snapPointsLeft={[50]}
        renderOverlay={this.renderOverlay}
      />
    );
  };

  renderOverlay = ({ item }) => {
    return (
      <ListItem style={styles.item} onLongPress={item.drag} noIndent>
          <Text style={styles.itemText}>{item.item}</Text>
      </ListItem>
    );
  };

  renderUnderlayLeft = ({ item, percentOpen }) => (
    <Animated.View
      style={[styles.row, styles.underlayLeft, { opacity: percentOpen }]} // Fade in on open
    >
      <TouchableOpacity onPress={() => this.confirmDelete(item.item)}>
        <Ionicons name="md-trash" size={24} color="red" />
      </TouchableOpacity>
    </Animated.View>
  );

  render() {
    return (
      <Container style={styles.container}>
        {/* <List style={styles.categoryList}>
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
        </List> */}
        <DraggableFlatList
          activationDistance={15}
          keyExtractor={item => item}
          data={this.props.category}
          renderItem={this.renderItem}
          onDragEnd={({ data }) => {
            this.props.orderCategory(data);
          }}
          
        />
        <Ionicons
          name="md-add-circle-outline"
          size={40}
          color="blue"
          style={styles.addButton}
          onPress={() => {
            if (this.props.category.length >= 10) {
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
        />
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
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
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
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 15
  },
  underlayLeft: {
    flex: 1,
    backgroundColor: "pink",
    justifyContent: "flex-end"
  },
  item: {
    height: 50,
    backgroundColor: "white"
  },
  itemText: {
    fontSize: 20,
  },
  addButton: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 10
  }
});

const mapStateToProps = (state) => {
  return {
    category: state.category,
  };
};

const mapDispatchToProps = { addCategory, removeCategory, orderCategory };

export default connect(mapStateToProps, mapDispatchToProps)(Category);
