import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import * as actions from '../../actions/index';

class Signin extends Component {

    handleFormSubmit({email, password}){
        this.props.signinUser({email, password});
    }

    showErrMsg(){
        if(this.props.auth.autherr) {
            return (
                <div className="alert alert-danger">Some thing goes wrong!</div>
            )
        }

    }

    render(){
        const { handleSubmit, fields: {email, password}} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <lable>email:</lable>
                    <input type="text" className="form-control" {...email}/>
                </fieldset>

                <fieldset className="form-group">
                    <lable>password:</lable>
                    <input type="text" className="form-control" {...password}/>
                </fieldset>
                {this.showErrMsg()}
                <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
        )
    }
}

function mapStateToProps(state){

    return {
        auth: state.auth,
    }
}

export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
}, mapStateToProps, actions)(Signin)