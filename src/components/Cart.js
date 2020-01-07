import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addToCart } from '../actions/AppActions';
import EmptyCart from "./common/EmptyCart";
import CartButton from "./common/CartButton";
import Checkout from "../components/Checkout";
import FooterCheckout from "../components/FooterCheckout";

class Cart extends Component {
  constructor(props) {
    super(props);
  }
  handleNaviagation = () => {
    this.props.navigation.navigate("Restaurants");
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Cart",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: '#32a852',
      },
      headerRight: (
        <CartButton
          onPress={() => {
            navigation.navigate("Cart");
          }}
        />
      )
    };
  };
  render() {
    if (this.props.qtd_carrinho == 0) {
      return <EmptyCart />;
    } else {
      return (
        <View>
          <Checkout />
          <FooterCheckout />
        </View>
      );
    }


  }
}


const mapStateToProps = state => ({
  qtd_carrinho: state.AppReducer.qtd_carrinho
});
const mapDispatchToProps = dispatch => bindActionCreators({ addToCart }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Cart);