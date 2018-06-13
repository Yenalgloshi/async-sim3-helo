import React, { Component } from 'react';
import './Dashboard.css';
import Header from '../Header/Header';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashView">
        <Header />
        Dashboard Page
      </div>
    );
  }
}

export default Dashboard;