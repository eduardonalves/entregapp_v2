import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";

import EmptyCart from "./common/EmptyCart";

export default class Cart extends Component {
  constructor(props) {
    super(props);
  }
  handleNaviagation = () => {
    this.props.navigation.navigate("Restaurants");
  };

  render() {
    return <EmptyCart />;
  }
}
