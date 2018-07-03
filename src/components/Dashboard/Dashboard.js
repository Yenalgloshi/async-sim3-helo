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
    let promise = axios.post('/api/recommended/add', {friendID})
    promise.then(res => {this.setState( {recommendations: res.data} )
    })
  }
    
  render() {
    //  this gets the selected sort criteria from the users info
    let userCriteria = this.state.userInfo[this.state.sortCriteria];
    //  this get all the recommended friends and compares their sort attribute
    //   to the users attribute
    let filteredRecFriends = this.state.recommendations.filter((val) => {
      return val[this.state.sortCriteria] === userCriteria
    })

    return (
      <div className='dashView'>
        <Header title='Dashboard'/>
      <div className='dash-container'>
        <div className='dash-profile-content'>
          <div className='dash-profile-preview'>
            <img src={this.state.userInfo.profile_img} 
                 className='dash-profile-img' 
                 alt="me"/>
            {/* users name will be rendered from state */}
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
          
          {/* conditional rendering if there are no recommended friends or if there are recommended friends */}
          <div className='search-list-wpr'>
            { filteredRecFriends === undefined || filteredRecFriends.length === 0
              ?  <p className='dash-noRec'>No Recommendations</p>
              :  filteredRecFriends.map((recFriend, i) => {      
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
                  )
                })}
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