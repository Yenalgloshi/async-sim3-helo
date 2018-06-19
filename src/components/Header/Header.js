import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import {withRouter} from 'react-router';

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
        <h4>Page Title</h4>
        <Link to='/'>
          <button className="header-logout-btn">Logout</button>
        </Link>
      </div>
    );
  }
}

export default withRouter(Header);