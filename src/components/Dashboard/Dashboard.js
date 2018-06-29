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
      sortCriteria: '',
      userInfo:{}
    }

    this.handleSortSelector = this.handleSortSelector.bind(this);
    this.handleAddFrndBtnClick = this.handleAddFrndBtnClick.bind(this);

  }

  componentDidMount() {
    axios.get('/api/auth/authenticated').then(res => {
      this.setState({userInfo: res.data})
    })

    axios.get('/api/recommended').then(res => {
      this.setState({recommendations: res.data})
    })

    // Another axios request to check to see if a user is on 
    // sessions .then and .catch will be used to redirect if
    // necessary.
  }
  
  
  handleSortSelector(val){
    this.setState({sortCriteria: val})
  }
  
  handleAddFrndBtnClick(friendID){
    let promise = axios.post('/recommended/add', {friendID})
    promise.then(res => {this.setState( {recommendations: res.data} )
    })
  }
  
  
  render() {
    let userCriteria = this.state.userInfo[this.state.sortCriteria];
    let filteredRecFriends = this.state.recommendations.filter((val) => {
      return val[this.state.sortCriteria] === userCriteria
    })
    console.log('Bob is your uncle', this.state.userInfo[0])

    return (
      <div className='dashView'>
        <Header title='Dashboard'/>
      <div className='dash-container'>
        <div className='dash-profile-content'>
          <div className='dash-profile-preview'>
            <img src={this.state.userInfo.profile_img} 
                 className='dash-profile-img' 
                 alt="me"/>
            {/* below name will be rendered from state */}
            <h3 className='dash-name-wpr'>
              <p className='dash-profile-name'>
                {this.state.userInfo.first_name}
              </p>
              <p className='dash-profile-name'>
              {this.state.userInfo.last_name}
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
                <option value="">All</option>
                <option value="gender">Gender</option>
                <option value="hobby">Hobby</option>
                <option value="eye_color">Eye Color</option>
                <option value="hair_color">Hair Color</option>
              </select>
            </div>

          </div>
          <div className='search-list-wpr'>
            {filteredRecFriends.map((recFriend, i) => {
              return(
                <div className='search-fr-container' key={i}>
                  <img className='search-fr-img' src={recFriend.profile_img} alt=""/>
                  <div className='search-fr-nameBtn-wpr'>
                    <div className='search-fr-name-wpr'>
                      <p className='search-fr-name'>{recFriend.first_name}</p>
                      <p className='search-fr-name'>{recFriend.last_name}</p>
                    </div>
                    <button onClick={() => this.handleAddFrndBtnClick(recFriend.user_id)} 
                            className='search-add-btn'>Add Friend</button>
                  </div>
                </div>
              )})
            }
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