import React, { Component } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addToCart } from '../../actions/AppActions';

class CartButton extends Component {
  constructor(props) {
    super(props);
    this.handleNavigate = this.handleNavigate.bind(this);
    
  }

  handleNavigate = () => {
    this.props.onPress();
  };

  render() {
    console.log('carrinho cart');
    console.log(this.props.carrinho);
    return (
      <TouchableOpacity onPress={this.handleNavigate}>
        <Image
          style={{ width: 32, height: 32, marginRight: 16 }}
          source={require("../../../assets/shopping-bag.png")}
        />
        <View
          style={{
            height: 20,
            width: 20,
            borderRadius: 10,
            backgroundColor: "#ef6136",
            position: "absolute",
            right: 8,
            top: 2
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 13,
              textAlign: "center",
              lineHeight: 20
            }}
          >
            {this.props.qtd_carrinho}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}



const mapStateToProps = state => ({
  qtd_carrinho: state.AppReducer.qtd_carrinho
});
const mapDispatchToProps = dispatch => bindActionCreators({addToCart}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CartButton);
