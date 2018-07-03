import React, { Component } from 'react';
import axios from 'axios';
import './Search.css';
import Header from '../Header/Header';

class Search extends Component {
  constructor(){
    super()

    this.state = {
      allUsers: [],
      friends: [],
      searchCnt: 0,
      searchInput:'',
      offset: 0,
      searchSelection: '',
      pages: [],
      usersPerPg: 10,
      currentPg: 1,
      searchBtnActive: false,
      searchedUsers: []
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
  this.setState({searchInput: val})
}

handlePageNumBtnClick(btnPage, userOffset){
  this.setState({offset: userOffset})
  this.setState({currentPg: btnPage})
  let promise = axios.post('/api/user/list', {userOffset})
  promise.then(res => {this.setState({allUsers: res.data})
  })
}

handleSearchBtnClick(){
  let {searchSelection, searchInput} = this.state 
  this.setState({searchBtnActive: !this.state.searchBtnActive})
  let promise = axios.post('/api/user/search', {searchSelection, searchInput})
  promise.then(res => {this.setState({searchedUsers: res.data})
  console.log('res.data', res.data)
  })
}

handleAddFrndBtnClick(friendID){
  let promise = axios.post('/api/friend/add', {friendID}, this.state.offset)
  promise.then(res => {this.setState( {allUsers: res.data} )
  })
  axios.get('/api/friend/list').then(res => {
    this.setState({friends: res.data})
  })
}

handleDelFrndBtnClick(friendID){
  let promise = axios.post('/api/friend/remove', {friendID}, this.state.offset)
  promise.then(res => {this.setState({allUsers: res.data})
  })
  axios.get('/api/friend/list').then(res => {
    this.setState({friends: res.data})
  })
}

handleResetBtnClick(){
  this.setState({searchInput: ''})
  this.setState({searchSelection: ''})
  this.setState({searchBtnActive: false})
}

handleNameFilterSelector(val){
  this.setState({searchSelection: val})
}

  render() {
    let {searchCnt, usersPerPg} = this.state;
    let calcPages = Math.floor((searchCnt/usersPerPg) + 1);
    let pgArr = [];
    for (var i=1; i<=calcPages; i++){
      pgArr.push(i);
    }

    let friendsID = this.state.friends.map(friend => friend.user_id)
    let allSearchList = this.state.allUsers.map((user, i) => {
        if (friendsID.includes(user.user_id)) {
          return(
            <div className='search-fr-container' key={i}>
              <img className='search-fr-img' src={user.profile_img} alt=""/>
              <div className='search-fr-nameBtn-wpr'>
                <div className='search-fr-name-wpr'>
                  <p className='search-fr-name'>{user.first_name}</p>
                  <p className='search-fr-name'>{user.last_name}</p>
                </div>
                <button onClick={()=> this.handleDelFrndBtnClick(user.user_id)} 
                        className='search-remove-btn'>Remove Friend</button>
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
                <button onClick={() => this.handleAddFrndBtnClick(user.user_id)} 
                        className='search-add-btn'>Add Friend</button>
              </div>
            </div>)
            }
      })

      // let searchResults = this.state.allUsers.filter((val) => {
      //   return val[this.state.searchSelection] === this.state.searchInput
      // })  
      // console.log('search results', searchResults)

      let specificSearchList = this.state.searchedUsers.map((user, i) => {
        if (friendsID.includes(user.user_id)) {
          return(
            <div className='search-fr-container' key={i}>
              <img className='search-fr-img' src={user.profile_img} alt=""/>
              <div className='search-fr-nameBtn-wpr'>
                <div className='search-fr-name-wpr'>
                  <p className='search-fr-name'>{user.first_name}</p>
                  <p className='search-fr-name'>{user.last_name}</p>
                </div>
                <button onClick={()=> this.handleDelFrndBtnClick(user.user_id)} 
                        className='search-remove-btn'>Remove Friend</button>
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
                <button onClick={() => this.handleAddFrndBtnClick(user.user_id)} 
                        className='search-add-btn'>Add Friend</button>
              </div>
            </div>)
            }
      })
  
    return (
      <div className='searchView'>
        <Header title='Search'/>

        <div className='search-content'>
          <div className='search-tools'>
              <select onChange={(e) => this.handleNameFilterSelector(e.target.value)}
                  ref=''
                  className='search-selector'
                  value={this.state.searchSelection}>
                <option value="">All</option>  
                <option value="first_name">First Name</option>
                <option value="last_name">Last Name</option>
              </select>

              <input onChange={(e) => this.handleNameFilterInput(e.target.value)} 
                     className='search-field' 
                     type="text"
                     value={this.state.searchInput}/>
              <button onClick={this.handleSearchBtnClick} 
                      className='search-btn'>Search</button>
              <button onClick={this.handleResetBtnClick} 
                      className='search-reset-btn'>Reset</button>

          </div>
          <div className='search-list-wpr'>
            {this.state.searchBtnActive === false ? allSearchList : specificSearchList}
          </div>
          <div className='search-pagination'>
            <div className='search-pag-btn-wpr'>
              {pgArr.map((pgNum, i) => {
                return(
                  this.state.currentPg === pgNum
                    ?  <button onClick={() => this.handlePageNumBtnClick(pgNum, (pgNum * usersPerPg) - usersPerPg)} 
                          key={i} 
                          className={'search-currPag-btn'} >
                          Page{pgNum}</button>
                    : <button onClick={() => this.handlePageNumBtnClick(pgNum, (pgNum * usersPerPg) - usersPerPg)} 
                        key={i} 
                        className={'search-pag-btn'} >
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