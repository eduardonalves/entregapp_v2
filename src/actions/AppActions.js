import _ from 'lodash';
import axios from 'axios'

import { Actions } from 'react-redux';
import {
    CATEGORIA_CARREGADA_OK,
    CATEGORIA_CARREGADA_FALHA,
    ADICIONA_PRODUTO
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

export const removeFromCart = () => {
    return dispatch => {

    }
}