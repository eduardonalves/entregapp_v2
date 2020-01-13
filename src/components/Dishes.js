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
import ListItem from "./ListItem";
import CartButton from "./common/CartButton";
import CustomModal from "../components/common/CustomModal";


class Dishes extends Component {
  constructor(props) {
    super(props);
    this.props.produtosFetch(this.props.navigation.getParam('categoria_id'));
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Produtos",
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
    this.props.navigation.navigate("Dishes");
  };
  render() {
    

    return (
      <View style={styles.container}>
        <CustomModal />
        <FlatList
          data={this.props.produtos}
          keyExtractor={item => item.Produto.id}
          renderItem={({ item }) => (
            <ListItem
              id={item.Produto.id}
              name={item.Produto.nome}
              image={item.Produto.foto}
              cuisine={item.Produto.nome}
              price={item.Produto.preco_venda}
              description={item.Produto.descricao}
              isVegetarian={item.Produto.parte_compre_ganhe}
              handleNaviagation={this.handleNaviagation}
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
  produtos: state.DishesReducer.produtos
});
const mapDispatchToProps = dispatch => bindActionCreators({produtosFetch}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dishes);