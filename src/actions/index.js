import { browserHistory } from 'react-router';
import axios from 'axios';
import { AUTHUSER, AUTH_ERROR, UNAUTHUSER, FETCH_MSG_SUCESS, FETCH_MSG_ERROR } from './types';

const API_URL_ROOT = 'http://localhost:3090';

export function signinUser({email, password}){
    //normally we return an object {type:xxx, payload:xxx}
    //here redux-thunk let us return a function, it can manipulate dispatch function
    //which is more flexible
    return function(dispatch){
        //Submit email and password to the server
        axios.post(`${API_URL_ROOT}/signin`, {email, password}).
            then((response)=>{
            //If the request is good...
            //- update state to indicate user is authenticated
            //- save the JWT token
            //- redirect user to /feature page

            dispatch({type: AUTHUSER});
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/featured');
        }).catch((err)=> {
            //If the request is bad...
            //- Show an error message

            dispatch(authErr(err));
        });
    }
}

function authErr(err){
    return {
        type: AUTH_ERROR,
        payload: err,
    }
}

export function signOutUser(){
    console.log('signoutUser creator is getting called');
    localStorage.removeItem('token');
    return {
        type: UNAUTHUSER,
    }
}

export function signUpUser({email, password}){
    console.log('go to signupuser creator')
    console.log(email, password)

    return function(dispatch){
        console.log('in return function')
        axios.post(`${API_URL_ROOT}/signup`, {email: email.value, password:password.value}).
        then(response => {
            console.log(response)
            dispatch({type: AUTHUSER});
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/');
        }).catch(error=>{
            console.log(error)
            dispatch(authErr(error));
        })
    };
}

export function fetchMsg(){
    return function(dispatch){
        axios.get(`${API_URL_ROOT}`, {
            headers: {authorization: localStorage.token}
        }).then(response=>{
            dispatch({
                type: FETCH_MSG_SUCESS,
                payload: response.data.message,
            })
        }).catch(error=>{
            dispatch({
                type: FETCH_MSG_ERROR,
                payload: error,
            })
        })
    }
}