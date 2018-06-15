import React, { Component } from 'react';
import './Search.css';
import Header from '../Header/Header';

class Search extends Component {
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
                <option value="" disabled></option>
                <option value="First Name">First Name</option>
                <option value="Last Name">Last Name</option>
              </select>
              <input className='search-field' type="text"/>
              <button className='search-btn'>Search</button>
              <button className='search-reset-btn'>Reset</button>
          </div>
          <div className='search-list-wpr'>
            <div className='search-fr-container'>
              friends
            </div>
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