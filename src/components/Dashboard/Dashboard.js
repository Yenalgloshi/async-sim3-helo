import React, { Component } from 'react';
import axios from 'axios';
import './Dashboard.css';
import Header from '../Header/Header';

class Dashboard extends Component {
  constructor(){
    super()

    this.state = {
      rcommendations: [],
      sortedRecommendations: [],
      sortCriteria: ""
    }

    this.handleEditBtnClick = this.handleEditBtnClick.bind(this);
    this.handleSortSelector = this.handleSortSelector.bind(this);
    this.handleAddFrndBtnClick = this.handleAddFrndBtnClick.bind(this);

  }

  componentDidMount(){
    
  }

  handleEditBtnClick(){

  }

  handleSortSelector(val){
    this.setState({sortCriteria: val})
  }

  handleAddFrndBtnClick(){

  }


  render() {

    let displaySortedRec;

    return (
      <div className='dashView'>
        <Header/>

      <div className='dash-profile-content'>
        <div className='dash-profile-preview'>
          <img src="https://robohash.org/me" alt="me"/>
          {/* below name will be rendered from state */}
          <h3>Jason Begay</h3>
          <button onClick={this.handleEditBtnClick} 
                  className='dash-edit-btn'>Edit Profile</button>
        </div>
        <div className='dash-profile-welcome'>
          Welcome to Helo!  Find recommended friends based on your simularities, and even search for them by name.  The more you update your profile, the better recommendations we can make!
        </div>
      </div>

      <div className='dash-rec-list-wpr'>
        <div className='dash-rec-sort'>
          Recommended Friends
          Sorted by
          <select onChange={(e) => this.handleSortSelector(e.target.value)}
                  ref=''
                  className='dash-selector'
                  value={this.state.sortCriteria}>
            <option value="" disabled>All</option>
            <option value="Gender">Gender</option>
            <option value="Hobby">Hobby</option>
          </select>
        </div>
        <div className='dash-rec-list'>
          <div className='dash-rec-friend'>

          </div>
        </div>
      </div>
</div>

    );
  }
}

export default Dashboard;