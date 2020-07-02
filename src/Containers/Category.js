import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { Button } from "native-base";
import { addCategory, removeCategory } from "../redux/actions";

class Category extends React.Component {
  handleAddCategory = () => {
    // dispatch actions to AddCategory
    this.props.addCategory("TEst");
  };

  handleRemoveCategory = () => {
    // dispatch actions to RemoveCategory
    this.props.removeCategory("TEst");
  };

  render() {
    return (
      <View>
        <Text>{this.props.category}</Text>
        <Button onPress={this.handleAddCategory}>
          <Text>Add</Text>
        </Button>
        <Button onPress={this.handleRemoveCategory}>
          <Text>Remove</Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
  };
};

const mapDispatchToProps = { addCategory, removeCategory };

export default connect(mapStateToProps, mapDispatchToProps)(Category);
