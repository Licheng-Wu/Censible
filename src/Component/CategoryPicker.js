import React, { Component } from "react";

import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default class CategoryPicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DropDownPicker
        items={[
          { label: "Food", value: "Food" },
          { label: "Transport", value: "Transport" },
          { label: "Education", value: "Education" },
          { label: "Entertainment", value: "Entertainment" },
          { label: "Sports", value: "Sports" },
          { label: "Others", value: "Others" },
        ]}
        dropDownStyle={{ backgroundColor: "#fafafa",  }}
        // style={{ marginTop: 10, paddingVertical: 20 }}
        containerStyle={{ height: 50 }}
        itemStyle={{ alignItems: "flex-start" }}
        labelStyle={{ fontSize: 16, color: "#000", alignItems: "flex-end" }}
        // activeItemStyle={{ alignItems: "flex-end" }}
        activeLabelStyle={{ alignItems: "flex-start" }}
        onChangeItem={(item) => this.props.handleCategory(item.value)}
        value={this.props.category}
      />
    );
  }
}
