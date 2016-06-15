import { AUTHUSER, UNAUTHUSER, AUTH_ERROR } from '../actions/types';

export default function(state={}, action){
    switch (action.type){
        case AUTHUSER:
            return {...state, userauth: true};
        case UNAUTHUSER:
            return {...state, userauth: false};
        case AUTH_ERROR:
            return {...state, autherr: action.payload};
        default:
            return state;
    }
}