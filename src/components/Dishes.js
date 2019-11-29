import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView

} from "react-native";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { produtosFetch } from '../actions/DishesActions';
import Constants from "../utils/constants";
import foodData from "../food-data.json";

import CartButton from "./common/CartButton";
import { Card, ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class Dishes extends Component {
  constructor(props) {
    super(props);
    //console.log(props);


    this.props.produtosFetch(this.props.navigation.getParam('categoria_id'));
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Menu",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: '#32a852'
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
    this.props.navigation.navigate("Dishes");
  };
  render() {
    console.log('produtos');
    console.log(this.props.produtos);

    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.produtos}
          keyExtractor={item => item.Produto.id}
          renderItem={({ item }) => (
           

            <Card
            title={item.Produto.nome}
            //image={require('../../assets/thumbs/Dosa.jpeg')}
            image={item.Produto.foto}
            >
              <Text style={{ marginBottom: 10 }}>
              {item.Produto.descricao}
              </Text>
              <Button
               iconRight
                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                title='Adicionar ' 
                icon={<Icon name='shopping-cart' color='#ffffff'  />}
                />
          </Card>
          )}
        />
        
        
      </View>
    );
  }
}
/** 
 * 
 * <FlatList
      data={this.props.produtos}
      keyExtractor={item => item.Produto.id}
      renderItem={({ item }) => (
        <ListItem
          name={item.Produto.nome}
          image={item.Produto.foto}
          cuisine={item.Produto.nome}
          price={item.Produto.preco_venda}
          label={item.Produto.descricao}
          isVegetarian={item.Produto.parte_compre_ganhe}
          handleNaviagation={this.handleNaviagation}
        />
      )}
    />
        **/
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8
  }
});

const mapStateToProps = state => ({
  produtos: state.DishesReducer.produtos
});
const mapDispatchToProps = dispatch => bindActionCreators({ produtosFetch }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dishes);