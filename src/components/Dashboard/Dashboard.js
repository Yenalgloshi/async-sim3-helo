import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Dashboard.css';
import Header from '../Header/Header';

class Dashboard extends Component {
  constructor(){
    super()

    this.state = {
      recommendations: [],
      sortedRecommendations: [],
      sortCriteria: ""
    }

    this.handleSortSelector = this.handleSortSelector.bind(this);
    this.handleAddFrndBtnClick = this.handleAddFrndBtnClick.bind(this);

  }

  componentDidMount(){

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
      <div className='dash-container'>
        <div className='dash-profile-content'>
          <div className='dash-profile-preview'>
            <img src="https://robohash.org/me" className='dash-profile-img' alt="me"/>
            {/* below name will be rendered from state */}
            <h3 className='dash-name-wpr'>
              <p className='dash-profile-name'>
                Aiath
              </p>
              <p className='dash-profile-name'>
                Xornackiathis
              </p>
            </h3>
            <Link to='/Profile'>
              <button className='dash-edit-btn'>Edit Profile</button>
            </Link>
          </div>
          <div className='dash-profile-welcome'>
            Welcome to Helo!  Find recommended friends based on your simularities, and even search for them by name.  The more you update your profile, the better recommendations we can make!
          </div>
        </div>

        <div className='dash-rec-list-wpr'>
          <div className='dash-rec-hdr'>
            Recommended Friends
            <div className='dash-rec-sort'>
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

          </div>
          <div className='dash-rec-list'>
            No Recommendations
          </div>
          <div className='dash-rec-friend'>

          </div>
        </div>
      </div>
</div>

    );
  }
}

export default Dashboard;