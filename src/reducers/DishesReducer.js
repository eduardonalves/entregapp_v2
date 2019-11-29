const INITIAL_STATE = {
    adiciona_contato_email: '',
    msgErroCadastroUsuario: '',
    cadastroResultadoUsuario: false,
    produtos:'',
    mensagem: ''
};

import {
    PRODUTO_CARREGADO_OK
} from '../actions/ActionTypes';

export default (state = INITIAL_STATE, action) => {
    //console.log(action);
    switch(action.type) {
        case PRODUTO_CARREGADO_OK:
            return { ...state, produtos: action.payload };

        default:
            return state;
    }
}