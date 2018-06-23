import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Auth.css';

class Auth extends Component {
  render() {
    return (
      <div className='auth'>
        <div className='auth-content'>
          <img src={require('./../../assets/logo.png')} className='auth-logo' alt="helo-logo"/>
          <h1 className='auth-title'>Helo</h1>
            <a href={process.env.REACT_APP_LOGIN} className="auth-btn">Login / Register</a>
        </div>
      </div>

    );
  }
}

export default Auth;