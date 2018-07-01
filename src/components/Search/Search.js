import React, { Component } from 'react';
import axios from 'axios';
import './Search.css';
import Header from '../Header/Header';

class Search extends Component {
  constructor(){
    super()

    this.state = {
      searchInput:'',
      allUsers: [],
      friends: [],
      filterSearchResults: [],
      pages: [],
      usersPerPg: 10,
      searchCnt: 0,
      currentPg: 1,
      offset: 0,
      name: ''
    }

  this.handleNameFilterInput = this.handleNameFilterInput.bind(this);
  this.handlePageNumBtnClick = this.handlePageNumBtnClick.bind(this);
  this.handleSearchBtnClick = this.handleSearchBtnClick.bind(this);
  this.handleAddFrndBtnClick = this.handleAddFrndBtnClick.bind(this);
  this.handleDelFrndBtnClick = this.handleDelFrndBtnClick.bind(this);
  this.handleResetBtnClick = this.handleResetBtnClick.bind(this);
  this.handleNameFilterSelector = this.handleNameFilterSelector.bind(this);
  }

componentDidMount(){
  axios.post('/api/user/list', this.state.offset).then(res => {
    this.setState({allUsers: res.data})
  })
  
  axios.get('/api/friend/list').then(res => {
    this.setState({friends: res.data})
  })

  axios.get('/api/user/total').then(res => {
    this.setState({searchCnt: res.data[0].count})
  })
}

handleNameFilterInput(val){
  this.setState({name: val})
}

handlePageNumBtnClick(userOffset){
  this.setState({offset: userOffset})
  
  let promise = axios.post('/api/user/list', {userOffset})
  promise.then(res => {this.setState({allUsers: res.data})
    console.log('page button #', this.state.offset)
  })
}

handleSearchBtnClick(){

}

handleAddFrndBtnClick(){

}

handleDelFrndBtnClick(){

}

handleResetBtnClick(){

}

handleNameFilterSelector(){

}

  render() {
    let {searchCnt, usersPerPg} = this.state;
    let calcPages = Math.floor((searchCnt/usersPerPg) + 1);
    // let calcOffset = (currentPg * usersPerPg) - usersPerPg;
    // console.log('calculated offset', offset)
    let pgArr = [];
    for (var i=1; i<=calcPages; i++){
      pgArr.push(i);
    }

    let friendsID = this.state.friends.map(friend => friend.user_id)
    // console.log('allUsers info on state', this.state.allUsers)
    let newList = this.state.allUsers.map((user, i) => {
      if (friendsID.includes(user.user_id)) {
        return(
          <div className='search-fr-container' key={i}>
            <img className='search-fr-img' src={user.profile_img} alt=""/>
            <div className='search-fr-nameBtn-wpr'>
              <div className='search-fr-name-wpr'>
                <p className='search-fr-name'>{user.first_name}</p>
                <p className='search-fr-name'>{user.last_name}</p>
              </div>
              <button className='search-remove-btn'>Remove Friend</button>
            </div>
          </div>
        )
      } else{
        return(
          <div className='search-fr-container' key={i}>
            <img className='search-fr-img' src={user.profile_img} alt=""/>
            <div className='search-fr-nameBtn-wpr'>
              <div className='search-fr-name-wpr'>
                <p className='search-fr-name'>{user.first_name}</p>
                <p className='search-fr-name'>{user.last_name}</p>
              </div>
              <button className='search-add-btn'>Add Friend</button>
            </div>
          </div>)
          }
    })
  
    return (
      <div className='searchView'>
        <Header title='Search'/>

        <div className='search-content'>
          <div className='search-tools'>
              <select onChange=''
                  ref=''
                  className='search-selector'
                  value=''>
                <option value="" disabled>All</option>  
                <option value="First Name">First Name</option>
                <option value="Last Name">Last Name</option>
              </select>
              <input onChange={(e) => this.handleNameFilterInput(e.target.value)} 
                     className='search-field' 
                     type="text"/>
              <button className='search-btn'>Search</button>
              <button className='search-reset-btn'>Reset</button>
          </div>
          <div className='search-list-wpr'>
            {newList}
          </div>
          <div className='search-pagination'>
            <div className='pagView'>
              {pgArr.map((pgNum, i) => {
                return (
                  <button onClick={() => this.handlePageNumBtnClick((pgNum * usersPerPg) - usersPerPg)} 
                    key={i} 
                    className='pag-btn' >
                    {pgNum}</button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Search;