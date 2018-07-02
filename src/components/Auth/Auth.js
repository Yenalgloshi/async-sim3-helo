import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import './Auth.css';

class Auth extends Component {
  render() {
    return (
      <div className='auth'>
        <div className='auth-content'>
          <img src={require('./../../assets/logo.png')} className='auth-logo' alt="helo-logo"/>
          <h1 className='auth-title'>Helo</h1>
          {/* Buttons usually fire an axios call, and because axios requests (http requests) have some security issues with them and <a> tag is used instead of a button. */}

          {/* Referencing the .env file will make hosting much easier.  Also, in order to use the .env in your front end, you have to set up the environmental variable you are referencing in your .env file with "REACT_APP" */}
          <a href={process.env.REACT_APP_LOGIN} className="auth-btn">Login / Register</a>
        </div>
      </div>
    );
  }
}

export default Auth;