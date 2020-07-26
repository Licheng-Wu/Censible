import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  LayoutAnimation,
} from "react-native";
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
import { addCategory, removeCategory, orderCategory } from "../redux/actions";
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
    console.log(this.props);
  }

  handleAddCategory = (category) => {
    // dispatch actions to AddCategory
    this.props.addCategory(category);
  };

  handleRemoveCategory = (category) => {
    // Animation when item is deleted
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    // dispatch actions to RemoveCategory
    this.props.removeCategory(category);
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
        ref={(ref) => {
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
        renderUnderlayRight={this.renderUnderlayRight}
        snapPointsRight={[50]}
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

  renderUnderlayRight = ({ item, percentOpen }) => (
    <Animated.View
      style={[styles.row, styles.underlayRight, { opacity: percentOpen }]} // Fade in on open
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
        <View style={styles.categoryList}>
          <DraggableFlatList
            activationDistance={15}
            keyExtractor={(item) => item}
            data={this.props.category}
            renderItem={this.renderItem}
            onDragEnd={({ data }) => {
              this.props.orderCategory(data);
            }}
          />
        </View>
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
    flex: 0.8,
    backgroundColor: "white",
    // justifyContent: "flex-end",
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
    padding: 15,
  },
  underlayRight: {
    flex: 1,
    backgroundColor: "pink",
    justifyContent: "flex-start",
  },
});

const mapStateToProps = (state) => {
  return {
    category: state.category,
  };
};

const mapDispatchToProps = { addCategory, removeCategory, orderCategory };

export default connect(mapStateToProps, mapDispatchToProps)(Category);
