import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
// import {withRouter} from 'react-router';

class Header extends Component{
  
  render() {
    return (
      <div className="header">
        <div className="header-nav">
          <h3>Helo</h3>
          <Link to='/dashboard'>
            <img src={require('./../../assets/home.png')} alt="home-logo"/>
          </Link>
          <Link to='/Search'>
            <img src={require('./../../assets/search.png')} alt="search-logo"/>
          </Link>
        </div>
        <h4>{this.props.title}</h4>
        {/* Buttons usually fire an axios call, and because axios requests (http requests) have some security issues with them and <a> tag is used instead of a button. */}

        {/* Referencing the .env file will make hosting much easier.  Also, in order to use the .env in your front end, you have to set up the environmental variable you are referencing in your .env file with "REACT_APP" */}
        <a href={process.env.REACT_APP_LOGOUT} className="header-logout-btn">Logout</a>
      </div>
    );
  }
}

export default Header;