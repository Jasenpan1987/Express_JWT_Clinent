import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function(InnerComponent){
    class AuthedComponent extends Component{
        render(){
            return (
                <InnerComponent {...this.props}/>
            )
        }

        componentWillMount(){
            console.log(this.props.auth)
            if(!this.props.auth){
                console.log('user is not authed -- componentWillMount');
                browserHistory.push('/');
            }
        }

        componentWillUpdate(nextProps){
            if(!nextProps.auth){
                console.log('user is not authed -- componentWillUpdate');
                browserHistory.push('/')
            }
        }
    }

    function mapStateToProps(state){
        return {
            auth: state.auth.userauth,
        }
    }

    return connect(mapStateToProps)(AuthedComponent)
}