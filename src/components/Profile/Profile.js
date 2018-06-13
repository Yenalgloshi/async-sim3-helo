import React, { Component } from 'react';
import './Profile.css';
import Header from '../Header/Header';

class Profile extends Component {
  render() {
    return (
      <div className="profileView">
        <Header/>
        Profile Page
      </div>
    );
  }
}

export default Profile;