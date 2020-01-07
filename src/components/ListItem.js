import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity, 
  Alert,
  Picker
} from "react-native";
import { Overlay } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addToCart } from '../actions/AppActions';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
  }

  handleAddToCart = ()=>{
    const produto = {
      id: '0',
      nome: this.props.name,
      foto:this.props.image,
      preco_venda: this.props.price,
      descricao: '',
      parte_compre_ganhe:'',
      qtd: 1
    }
    
    this.props.addToCart(produto, this.props.carrinho);
  }
  handleClick = () => {
    this.setState({
      isClicked: !this.state.isClicked
    });
    this.props.handleNaviagation();
    Alert.alert(
      'Adicionar Produto',
      `Deseja mesmo adicionar o produto ${this.props.name} ao seu pedido?`,
      [
        {
          text: 'Sim',
          onPress: () => this.handleAddToCart(),
        },
        {
          text: 'Não', 
          onPress: () => console.log('Não Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };
  render() {
    return (
      <TouchableOpacity onPress={this.handleClick}>
        <View
          elevation={2}
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#ffffff",
            marginHorizontal: 24,
            marginVertical: 8,
            borderRadius: 4,
            shadowOpacity: 0.1,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 1
            }
          }}
        >
          <Image
            style={{
              width: 108,
              height: 108,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 4
            }}
            source={{ uri: this.props.image }}
          />
          <View
            style={{
              padding: 16
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#333"
              }}
            >
              {this.props.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#666"
              }}
            >
              {this.props.cuisine},{" "}
              {this.props.isVegetarian ? (
                <Text style={{ color: "#4caf50", fontWeight: "bold" }}>
                  R$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Text>
              ) : (
                <Text style={{ color: "#a92319", fontWeight: "bold" }}>
                  R$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                </Text>
              )}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#999"
              }}
            >
              {this.props.label}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                //justifyContent: "space-between"
                //width: "100%"
              }}
            >
              <View style={{flex:1}}>
              <Text
                style={{
                  fontSize: 21,
                  fontWeight: "bold",
                  color: "#ef6136"
                }}
              >
                {this.props.price}
              </Text>
              </View>
              <View style={{flex:1}}>
              <Picker
                selectedValue={this.state.language}
                style={{
                  height: 30, width: 100
                }}
                /*onValueChange={(itemValue, itemIndex) =>
                  this.setState({language: itemValue})
                }*/>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
              </View>
              {
              
              /* <Button
                onPress={e => alert("Hey")}
                title="ADD"
                style={{
                  backgroundColor: "4099ff",
                  color: "#fff",
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 8,
                  paddingBottom: 8
                }}
              /> */}
            </View>
            
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const mapStateToProps = state => ({
  carrinho: state.AppReducer.carrinho
});
const mapDispatchToProps = dispatch => bindActionCreators({addToCart}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);