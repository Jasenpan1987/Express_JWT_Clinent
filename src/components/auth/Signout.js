import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signOutUser } from '../../actions/index';

class Signout extends Component {

    handleClick(){
        console.log('handle click btn is pressed');
        this.props.signOutUser();
    }

    renderUnauthUser(){
        if(this.props.auth&&this.props.auth.userauth){
            return (
                <div>
                    <h4>Are you sure you want to Sign Out?</h4>
                    <button className="btn btn-danger" onClick={this.handleClick.bind(this)}>Sign Out</button>
                </div>
            )
        }else{
            return (
                <div>
                    <h4>You have already Sign Out</h4>
                </div>
            )
        }
    }
    render(){
        return (
            <div>{this.renderUnauthUser()}</div>
        )
    }
}

function mapStateToProps(state){
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        signOutUser
    }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(Signout)