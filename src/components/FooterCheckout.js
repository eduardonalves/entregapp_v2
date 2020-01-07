import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Button
} from "react-native";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { produtosFetch } from '../actions/DishesActions';
import Constants from "../utils/constants";
import foodData from "../food-data.json";
import ListCart from "./ListCart";
import CartButton from "./common/CartButton";

class FooterCheckout extends Component {
  constructor(props) {
    super(props);
    //console.log(props);
    
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Carrinho",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor:'#32a852'
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

  handleNaviagation = () => {
    this.props.navigation.navigate("Checkout");
  };
  render() {
    

    return (
      <View style={styles.container}>
          <View style={{ flex: 1, 
          borderTopLeftRadius: 4,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 4 }}>
              <Text style={{
                   fontSize: 21,
                   fontWeight: "bold",
                   color: "#a92319",
              }}>
                Valor Total
            </Text>
          </View>
          <View style={{ flex: 1, 
          borderTopLeftRadius: 4,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 4,
          flexDirection:"row-reverse" }}>
              <Text style={{
                   fontSize: 21,
                   fontWeight: "bold",
                   color: "#ef6136",
              }}>
                R$ 200,00
            </Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8,
    flexDirection: "row",
    padding: 25,
  }
});

const mapStateToProps = state => ({
    carrinho: state.AppReducer.carrinho
});

const mapDispatchToProps = dispatch => bindActionCreators({produtosFetch}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(FooterCheckout);