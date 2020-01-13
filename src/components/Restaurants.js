import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { categoriasFetch } from '../actions/AppActions';


import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import restaurantsData from "../api/restaurants.json";
import RestaurantItem from "./RestaurantItem";
import CartButton from "./common/CartButton";

class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.props.categoriasFetch();
   
  }
  
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Cardápio",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor:'#32a852',
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
  handleNaviagation = (categoria_id) => {
   
    this.props.navigation.navigate("Dishes",{categoria_id : categoria_id});
  };
  render() {
    
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.categorias}
          keyExtractor={item => item.Categoria.id}
          renderItem={({ item }) => (
            <RestaurantItem
              name={item.Categoria.nome}
              image={item.Categoria.nome}
              cuisine={item.Categoria.nome}
              location={item.Categoria.nome}
              isVegetarian={item.Categoria.nome}
              handleNaviagation={() => this.handleNaviagation(item.Categoria.id)}
              categoria_id={ item.Categoria.id}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8
  }
});


const mapStateToProps = state => ({
    categorias: state.AppReducer.categorias
});
const mapDispatchToProps = dispatch => bindActionCreators({categoriasFetch}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);