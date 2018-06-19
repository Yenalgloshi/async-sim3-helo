import React, { Component } from 'react';
import axios from 'axios';
import './Search.css';
import Header from '../Header/Header';

class Search extends Component {
  constructor(){
    super()

    this.state = {
      searchInput:'',
      searchResults: [],
      filterSearchResults: []
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
  axios.get('/api/user/list').then(response => {
    this.setState({searchResults: response.data})
    console.log(this.state.searchResults)
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

  render() {
    return (
      <div className='searchView'>
        <Header/>

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
            {this.state.searchResults.map((e, i) => {
              return(
                <div className='search-fr-container'>
                  <img className='search-fr-img' src={e.profile_img} alt=""/>
                  <p className='search-fr-name'>{e.first_name}</p>
                  <p className='search-fr-name'>{e.last_name}</p>
                  <button className='search-fr-btn'>Add Friend</button>
                </div>
              )})
            }
          </div>
          <div className='search-pagination'>
            pagination
          </div>
        </div>
      </div>

    );
  }
}

export default Search;