import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { signUpUser } from '../../actions/index';


class Signup extends Component {

    handleSubmitFunc(){
        this.props.signUpUser(this.props.fields);
    }

    renderSubmitErr(){
        console.log(this.props.errorMsg)
        if(this.props.errorMsg){
            return (
                <div className="alert alert-danger">
                    {this.props.errorMsg.data.error}
                </div>
            )
        }
    }

    render(){
        const { email, password, repassword } = this.props.fields;
        const handleSubmit = this.props.handleSubmit;
        return (
            <form onSubmit={handleSubmit(this.handleSubmitFunc.bind(this))}>
                <fieldset className="form-group">
                    <lable>email</lable>
                    <input type="text" className="form-control" {...email}/>
                    {email.touched&&email.error&&<div className="text-danger">{email.error}</div>}
                </fieldset>

                <fieldset className="form-group">
                    <lable>password</lable>
                    <input type="password" className="form-control" {...password}/>
                    {password.touched&&password.error&&<div className="text-danger">{password.error}</div>}
                </fieldset>

                <fieldset className="form-group">
                    <lable>confirm password</lable>
                    <input type="password" className="form-control" {...repassword}/>
                    {repassword.touched&&repassword.error&&<div className="text-danger">{repassword.error}</div>}
                </fieldset>

                <button className="btn btn-primary" type="submit">Sign Up</button>
                {this.renderSubmitErr()}
            </form>
        )
    }
}

function validate(formProps){
    console.log(formProps)
    let error = {};
    if(!formProps.email){
        error.email = 'Please enter the email';
    }
    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)){
        error.email = 'email address is not valid';
    }
    if(!formProps.password){
        error.password = 'Please enter your password';
    }
    if(!formProps.repassword){
        error.repassword = 'Please enter your confirm password';
    }
    if(formProps.password!=formProps.repassword){
        error.repassword = 'Password and Confirm password should be the same';
    }
    return error;
}

function mapStateToProps(state){
    return {
        errorMsg: state.auth.autherr,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        signUpUser,
    }, dispatch)
}

export default reduxForm({
    form: 'signup',
    fields: [
        'email', 'password', 'repassword'
    ],
    validate,
}, mapStateToProps, mapDispatchToProps)(Signup)