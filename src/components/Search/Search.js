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
      searchCnt: 0
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
  axios.get('/api/user/list').then(res => {
    console.log('all users', res.data)
    this.setState({allUsers: res.data})
  })
  
  axios.get('/api/friend/list').then(res => {
    console.log('friends', res.data)
    this.setState({friends: res.data})
  })

  axios.get('/api/user/total').then(res => {
    this.setState({searchCnt: res.data[0].count})
  })
}

handleNameFilterInput(){

}

handlePageNumBtnClick(){

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

handlePgBtnClick() {
    
}

  render() {
    let calcPages = Math.floor(this.state.searchCnt/8);
    let offset = calcPages * 8;
    console.log('calculated offset', offset)
    let pgArr = [];
    for (var i=1; i<=calcPages; i++){
      pgArr.push(i);
    }
  
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
              <input className='search-field' type="text"/>
              <button className='search-btn'>Search</button>
              <button className='search-reset-btn'>Reset</button>
          </div>
          <div className='search-list-wpr'>
            {this.state.allUsers.map((friend, i) => {
              return(
                <div className='search-fr-container' key={i}>
                  <img className='search-fr-img' src={friend.profile_img} alt=""/>
                  <div className='search-fr-nameBtn-wpr'>
                    <div className='search-fr-name-wpr'>
                      <p className='search-fr-name'>{friend.first_name}</p>
                      <p className='search-fr-name'>{friend.last_name}</p>
                    </div>
                    <button className='search-remove-btn'>Remove Friend</button>
                  </div>
                </div>
              )})
            }
          </div>
          <div className='search-pagination'>
            <div className='pagView'>
              {pgArr.map((pgNum, i) => {
                return (
                  <button onClick={this.handlePgBtnClick} 
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