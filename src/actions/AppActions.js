import _ from 'lodash';
import axios from 'axios'

import { Actions } from 'react-redux';

import {
    CATEGORIA_CARREGADA_OK,
    CATEGORIA_CARREGADA_FALHA,
    ADICIONA_PRODUTO,
    ATUALIZA_ITEM_ID,
    REMOVE_PRODUTO,
    ATUALIZA_TOTAL_CARRINHO,
    ATUALIZA_QTD,
    CARREGA_INFO_MODAL,
    SHOW_MODAL,
    ATUALIZA_OBS,
    ATUALIZA_FORMA_PAGAMENTO,
    ATUALIZA_TROCO,
    PEDIDO_NAO_OK,
    PEDIDO_OK,
    CARREGA_TIPOS_PAGAMENTO_OK,
    CARREGA_TIPOS_PAGAMENTO_FALHA
} from './ActionTypes';

import {
    APP_URL,
    FILIAL,
    EMPRESA,
    SEM_DESCRICAO
} from '../Settings'



export const categoriasFetch = () => {
    return dispatch => {

        axios.get(`${APP_URL}/entregapp_sistema/RestCategorias/catsmobile.json?fp=${FILIAL}`)
            .then(res => {

                if (typeof res.data.categorias != 'undefined') {
                    return dispatch({ type: CATEGORIA_CARREGADA_OK, payload: res.data.categorias });
                } else {
                    //  console.log('deu erro');
                    return dispatch({ type: CATEGORIA_CARREGADA_FALHA, payload: false });
                }


            }).catch(error => {
                return dispatch({ type: CATEGORIA_CARREGADA_FALHA, payload: false });
            });
    }
}

export const tiposPagamentoFetch = () => {
    return dispatch => {

        axios.get(`${APP_URL}/entregapp_sistema/RestPagamentos/pagamentosmobile.json?fp=${FILIAL}`)
            .then(res => {
                
                if (typeof res.data.pagamentos != 'undefined') {
                    return dispatch({ type: CARREGA_TIPOS_PAGAMENTO_OK, payload: res.data.pagamentos });
                } else {
                    //  console.log('deu erro');
                    return dispatch({ type: CARREGA_TIPOS_PAGAMENTO_FALHA, payload: false });
                }


            }).catch(error => {
                //console.log('error');
                //console.log(error);
                return dispatch({ type: CARREGA_TIPOS_PAGAMENTO_FALHA, payload: false });
            });
    }
}

export const addToCart = (produto, carrinho) => {
    carrinho.push(produto);
    total = updateCart(carrinho);
    return dispatch => {
        dispatch({ type: ADICIONA_PRODUTO, payload: carrinho })
        dispatch({ type: ATUALIZA_TOTAL_CARRINHO, payload: total })
    }
}

export const updateItemId = (item_id) => {

    return dispatch => {
        return dispatch({ type: ATUALIZA_ITEM_ID, payload: item_id + 1 });
    }
}

export const removeFromCart = (item_id, carrinho) => {
    newItem = [];
    carrinho.map((item) => {
        if (item.item_id != item_id) {
            newItem.push(item);
        }
    });
    let total = updateCart(newItem);
    return dispatch => {
        dispatch({ type: REMOVE_PRODUTO, payload: newItem })
        dispatch({ type: ATUALIZA_TOTAL_CARRINHO, payload: total })

    }
}


export const updateCartQtd = (qtd) => {
    return dispatch => {
        dispatch({ type: ATUALIZA_QTD, payload: qtd })
    }
}


export const updateCart = (carrinho) => {
    total = 0;
    carrinho.map((item) => {
        total += item.preco_venda * item.qtd;

    });
    return total;
}

export const loadInfoModal = (content) => {
    if (typeof content == 'undefined') {
        content = SEM_DESCRICAO;
    }
    if (content == '') {
        content = SEM_DESCRICAO;
    }

    return dispatch => {
        return dispatch({ type: CARREGA_INFO_MODAL, payload: content });
    }
}
export const setModalVisible = (status, content) => {
    if (typeof content == 'undefined') {
        content = SEM_DESCRICAO;
    }
    if (content == '') {
        content = SEM_DESCRICAO;
    }
    return dispatch => {
        dispatch({ type: SHOW_MODAL, payload: status });
        dispatch({ type: CARREGA_INFO_MODAL, payload: content });
    }
}

export const atualizaTroco = (troco) => {
    return dispatch => {
        dispatch({ type: ATUALIZA_TROCO, payload: troco })
    }
}

export const atualizaObs = (obs) => {
    return dispatch => {
        dispatch({ type: ATUALIZA_OBS, payload: obs })
    }
}

export const atualizaFormaDePagamento = (pagamento) => {
    return dispatch => {
        dispatch({ type: ATUALIZA_FORMA_PAGAMENTO, payload: pagamento })
    }
}

export const enviaPedido = (pedido) => {
    return dispatch => {
        console.log('pedido');
        console.log(pedido);
        /*axios.post(`${APP_URL}/entregapp_sistema/RestPedidos/addmobile.json`, pedido)
        .then(res => {

            if (typeof res.data.categorias != 'undefined') {
                return dispatch({ type: CATEGORIA_CARREGADA_OK, payload: res.data.categorias });
            } else {
                //  console.log('deu erro');
                return dispatch({ type: CATEGORIA_CARREGADA_FALHA, payload: false });
            }


        }).catch(error => {
            return dispatch({ type: CATEGORIA_CARREGADA_FALHA, payload: false });
        });*/
    }
}

export const montaPedido = (pedido) => {
    let novoPedido = {
        Pedido:{
            mesa_id: 1,
            
        }
    }
}