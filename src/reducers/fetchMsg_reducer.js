import { FETCH_MSG_SUCESS, FETCH_MSG_ERROR } from '../actions/types';

export default function(state='', action){
    switch (action.type){
        case FETCH_MSG_SUCESS:
            return action.payload;
        case FETCH_MSG_ERROR:
            return 'error';
        default:
            return state;
    }
}