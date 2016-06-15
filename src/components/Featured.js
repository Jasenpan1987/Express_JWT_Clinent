import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMsg } from '../actions/index';

class Featured extends Component{

    componentWillMount(){
        this.props.fetchMsg();
    }

    renderMessage(){
        if(!this.props.msg){
            return (
                <div>
                    <h3>Loading...</h3>
                </div>
            )
        }else{
            if(this.props.msg=='error'){
                return (
                    <div>
                        <h3>Hacker!!!</h3>
                    </div>
                )
            }else{
                return (
                    <div>
                        <h3>{this.props.msg}</h3>
                    </div>
                )
            }
        }
    }

    render(){
        return (
            <div>
                {this.renderMessage()}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        msg: state.msg,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchMsg,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Featured);