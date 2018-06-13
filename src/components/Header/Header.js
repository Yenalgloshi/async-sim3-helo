import React, { Component } from 'react';
import './Header.css';
import {withRouter} from 'react-router';

class Header extends Component{
  
  render() {
    return (
      <div className="header">
        <div className="header-nav">
          <h3>Helo</h3>
          <img src={require('./../../assets/home.png')} alt="home-logo"/>
          <img src={require('./../../assets/search.png')} alt="search-logo"/>
        </div>
        <h3>Page Title</h3>
        <button className="header-logout-btn">Logout</button>
      </div>
    );
  }
}

export default withRouter(Header);