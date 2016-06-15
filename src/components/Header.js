import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

class Header extends Component {

    renderText(){
        if(this.props.auth&&this.props.auth.userauth){
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/signout">Sign out</Link>
                </li>
            )
        }else{
            return [
                <li className="nav-item" key={`signin`}>
                    <Link className="nav-link" to="/signin">Sign In</Link>
                </li>,
                <li className="nav-item" key={`signup`}>
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
            ]
        }
    }

    render(){
        return (
            <nav className="nav narbar-light">
                <ul className="nav navbar-nav">
                    {this.renderText()}
                </ul>
            </nav>
        )
    }
}

function mapStateToProps(state){
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Header);



{/*

 import React, { Component } from 'react';

 class Header extends Component {
 render(){
 return (
 <nav className="nav narbar-light">
 <ul className="nav navbar-nav">
 <li className="nav-item">Sign In</li>
 </ul>
 </nav>
 )
 }
 }

 export default Header;


*/}