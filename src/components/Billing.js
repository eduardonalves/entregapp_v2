import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Picker,
    Button
} from "react-native";
import { Input } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { atualizaFormaDePagamento, atualizaTroco, tiposPagamentoFetch, enviaPedido } from '../actions/AppActions';
import CartButton from "./common/CartButton";

class Billing extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.props.tiposPagamentoFetch();
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Pagamento",
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
    }
    render() {
      
        
        //let payments = [];
        let payments = this.props.tipos_pagamento.map((v, k) => {
            
            return (
                <Picker.Item label={v.Pagamento.tipo} value={v.Pagamento.id} key={k} />
            );
        });
        return (
            <View >
                <View style={styles.container} >
                    <View>
                        <Text style={{
                            textAlign: "center", fontSize: 18, textAlign: "center", flex: 1,
                            color: "#333"
                        }}>Forma de Pagamento</Text>
                        <Picker
                            selectedValue={this.props.forma_pagamento}
                            style={{ height: 22, width: 150, flex: 1, justifyContent: "center" }}
                            onValueChange={(itemValue, itemIndex) => this.props.atualizaFormaDePagamento(itemValue)}
                        >
                            {payments}

                        </Picker>
                    </View>
                    {
                        this.props.forma_pagamento== 1 ? (
                            <View style={{
                                flex: 1,
                                flexDirection: "row"
                            }}>
                                <Input
                                    placeholder="Troco p/ quanto?"
                                    label="Levar Troco?"
                                    onChange={(value) => this.props.atualizaTroco(value)}
                                />
                            </View>
                        ) : (
                            <View style={{
                                flex: 1,
                                flexDirection: "row"
                            }}>
                                <Input
                                    placeholder="Troco p/ quanto?"
                                    label="Levar Troco?"
                                    onChange={(value) => this.props.atualizaTroco(value)}
                                    editable={false}
                                />
                            </View>
                        )
                    }
                    


                </View>
                <View >
                    <View style={{width:"100%", padding:16}} >
                        <Button
                            title="Finalizar" color="#4099ff"  style={styles.button} onPress={enviaPedido(
                                {
                                    carrinho: this.props.carrinho,
                                    total_carrinho: this.props.total_carrinho,
                                    troco_pedido: this.props.troco_pedido,
                                    obs: this.props.obs_pedido

                                }
                            )}
                        />
                    </View>
                </View>
            </View>
        );
    }


}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        marginTop: 8,
        marginBottom: 8,
        justifyContent: "center",
        padding: 16,
    },
    button: {
        backgroundColor: "#4099ff",
        color: "#fff",
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        height:50,
        flex:1,
        justifyContent:"center",
      },
});
const mapStateToProps = state => ({
    carrinho: state.AppReducer.carrinho,
    total_carrinho: state.AppReducer.total_carrinho,
    forma_pagamento: state.AppReducer.forma_pagamento,
    tipos_pagamento: state.AppReducer.tipos_pagamento,
    troco_pedido: state.AppReducer.troco_pedido,
    obs_pedido: state.AppReducer.obs_pedido
});

const mapDispatchToProps = dispatch => bindActionCreators({ atualizaFormaDePagamento, atualizaTroco, tiposPagamentoFetch, enviaPedido }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Billing);