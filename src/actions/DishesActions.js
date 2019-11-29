import _ from 'lodash';
import axios from 'axios'

import { Actions } from 'react-redux';
import {
    PRODUTO_CARREGADO_OK,
    PRODUTO_CARREGADO_FALHA
} from './ActionTypes';

import {
    APP_URL,
    FILIAL,
    EMPRESA
} from '../Settings'



export const produtosFetch = (categoria_id) => {
    return dispatch => {

        axios.get(`${APP_URL}/entregapp_sistema/RestProdutos/prodsmobilebycat.json?fp=${FILIAL}&cat=${categoria_id}`)
            .then(res => {
                console.log(res.data);
                if (typeof res.data.produtos != 'undefined') {
                    return dispatch({ type: PRODUTO_CARREGADO_OK, payload: res.data.produtos });
                } else {
                    //  console.log('deu erro');
                    return dispatch({ type: PRODUTO_CARREGADO_FALHA, payload: false });
                }


            }).catch(error => {
                return dispatch({ type: PRODUTO_CARREGADO_FALHA, payload: false });
            });
    }
}

