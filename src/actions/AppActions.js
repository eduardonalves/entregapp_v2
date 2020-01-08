import _ from 'lodash';
import axios from 'axios'

import { Actions } from 'react-redux';
import {
    CATEGORIA_CARREGADA_OK,
    CATEGORIA_CARREGADA_FALHA,
    ADICIONA_PRODUTO,
    ATUALIZA_ITEM_ID,
    REMOVE_PRODUTO
} from './ActionTypes';

import {
    APP_URL,
    FILIAL,
    EMPRESA 
} from '../Settings'



export const categoriasFetch = () => {
    return dispatch => {
        
        axios.get(`${APP_URL}/entregapp_sistema/RestCategorias/catsmobile.json?fp=${FILIAL}`)
        .then(res => {
            
            if(typeof res.data.categorias != 'undefined'){
               return dispatch({ type: CATEGORIA_CARREGADA_OK, payload: res.data.categorias });
            }else{
              //  console.log('deu erro');
              return dispatch({ type: CATEGORIA_CARREGADA_FALHA, payload: false });
            }
            
            
        }).catch(error =>{
            return dispatch({ type: CATEGORIA_CARREGADA_FALHA, payload: false });
        });
    }
}

export const addToCart = (produto, carrinho) =>{
    carrinho.push(produto);  
    return dispatch => {
        return dispatch({ type: ADICIONA_PRODUTO, payload: carrinho });
    }
}

export const updateItemId = (item_id) =>{
   
    return dispatch => {
        return dispatch({ type: ATUALIZA_ITEM_ID, payload: item_id + 1 });
    }
}

export const removeFromCart = (item_id, carrinho) => {
    return dispatch => {
        newItem = [];
        carrinho.map( (item) =>{
            
            if(item.item_id != item_id){
                newItem.push(item);
            }
        });
        return dispatch({ type: REMOVE_PRODUTO, payload: newItem });
    }
}