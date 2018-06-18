import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Auth.css';

class Auth extends Component {
  render() {
    return (
      <div className='auth'>
        <div className='auth-content'>
          <img src={require('./../../assets/logo.png')} alt="helo-logo"/>
          <h1 className='auth-title'>Helo</h1>
          {/* <Link to='/Dashboard'> */}
            <button className="auth-btn">Login / Register</button>
          {/* </Link> */}
        </div>
      </div>

    );
  }
}

export default Auth;