import React, { Component } from 'react';
import './Profile.css';
import Header from '../Header/Header';

class Profile extends Component {
  constructor(){
    super()

    this.state = {
      firstName: '',
      lastName: '',
      gender: '',
      hairColor: '',
      eyeColor: '',
      hobby: '',
      bDay: 1,
      bMonth: '',
      bYear: 1918
    }

  this.handleUpdateBtnClick = this.handleUpdateBtnClick.bind(this);
  this.handleCancelBtnClick = this.handleCancelBtnClick.bind(this);
  this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
  this.handleLastNameInput = this.handleLastNameInput.bind(this);
  this.handleGenderSelector = this.handleGenderSelector.bind(this);
  this.handleHairSelector = this.handleHairSelector.bind(this);
  this.handleEyeSelector = this.handleEyeSelector.bind(this);
  this.handleHobbySelector = this.handleHobbySelector.bind(this);
  this.handleBDaySelector = this.handleBDaySelector.bind(this);
  this.handleBMonthSelector = this.handleBMonthSelector.bind(this);
  this.handleBYearSelector = this.handleBYearSelector.bind(this);

  }

handleUpdateBtnClick(){
  
}

handleCancelBtnClick(){
  this.setState({firstName: '',
                  lastName: '',
                  gender: '',
                  hairColor: '',
                  eyeColor: '',
                  hobby: '',
                  bDay: 1,
                  bMonth: '',
                  bYear: 1918})
}

handleFirstNameInput(val){
  this.setState({firstName: val})
}

handleLastNameInput(val){
  this.setState({lastName: val})
}

handleGenderSelector(val){
  this.setState({gender: val})
}

handleHairSelector(val){
  this.setState({hairColor: val})
}

handleEyeSelector(val){
  this.setState({eyeColor: val})
}

handleHobbySelector(val){
  this.setState({hobby: val})
}

handleBDaySelector(val){
  this.setState({bDay: val})
}

handleBMonthSelector(val){
  this.setState({bMonth: val})
}

handleBYearSelector(val){
  this.setState({bYear: val})
}
  
  render() {
    let days = [];
      for (let i = 1; i < 32; i++) {
      days.push(<option value={i} key={i}>{i}</option>)
      }

      let years = [];
      for (let i = 1918; i < 2011; i++) {
      years.push(<option value={i} key={i}>{i}</option>)
      }
    
    return (
      <div className='profileView'>
     <Header/>

     <div className='profile-wpr'>
        <div className='profile-info'>
          <div className='profile-picName'>
            <img src="https://robohash.org/me" alt="me"/>
            {/* below name will be rendered from state */}
            <h3>Jason Begay</h3>
          </div>
          <div className='profile-update-btns'>
            <button className='profile-update-btn'>Update</button>
            <button onClick={this.handleCancelBtnClick} 
                    className='profile-cancel-btn'>Cancel</button>
          </div>
        </div>
        <div className='profile-edit'>
          <p>First Name</p>
          <input onChange={(e) => this.handleFirstNameInput(e.target.value)} 
                 className='profile-firstName' 
                 type="text"
                 value={this.state.firstName}/>
          <p>Last Name</p>
          <input onChange={(e) => this.handleLastNameInput(e.target.value)}
                 className='profile-lastName' 
                 type="text"
                 value={this.state.lastName}/>
          <p>Gender</p>
          <select onChange={(e) => this.handleGenderSelector(e.target.value)}
                  ref=''
                  className='profile-gender-selector'
                  value={this.state.gender}>
            <option value="" disabled></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <p>Hair Color</p>
          <select onChange={(e) => this.handleHairSelector(e.target.value)}
                  ref=''
                  className='profile-hair-selector'
                  value={this.state.hairColor}>
            <option value="" disabled></option>
            <option value="Black">Black</option>
            <option value="Brown">Brown</option>
            <option value="Blond">Blond</option>
            <option value="Auburn">Auburn</option>
            <option value="Red">Red</option>
            <option value="Gray">Gray</option>
            <option value="White">White</option>
            <option value="Bald">Bald</option>
          </select>
          <p>Eye Color</p>
          <select onChange={(e) => this.handleEyeSelector(e.target.value)}
                  ref=''
                  className='profile-eye-selector'
                  value={this.state.eyeColor}>
            <option value="" disabled></option>
            <option value="Amber">Amber</option>
            <option value="Blue">Blue</option>
            <option value="Brown">Brown</option>
            <option value="Black">Black</option>
            <option value="Gray">Gray</option>
            <option value="Green">Green</option>
            <option value="Hazel">Hazel</option>
            <option value="Red">Red</option>
          </select>
          <p>Hobby</p>
          <select onChange={(e) => this.handleHobbySelector(e.target.value)}
                  ref=''
                  className='profile-hobby-selector'
                  value={this.state.hobby}>
            <option value="" disabled></option>
            <option value="Video Games">Video Games</option>
            <option value="Reading">Reading</option>
            <option value="Music">Music</option>
            <option value="Art">Art</option>
            <option value="Sports">Sports</option>
            <option value="Camping">Camping</option>
            <option value="Photography">Photography</option>
            <option value="Biking">Biking</option>
            <option value="Comics">Comics</option>
            <option value="Coding">Coding</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Hunting/Fishing">Hunting/Fishing</option>
            <option value="Guns">Guns</option>
            <option value="Movies">Movies</option>
          </select>
          <p>Birthday Day</p>
          <select onChange={(e) => this.handleBDaySelector(e.target.value)}
                  ref=''
                  className='profile-bDay-selector'
                  value={this.state.bDay}>
                  {days}
          </select>
          <p>Birthday Month</p>
          <select onChange={(e) => this.handleBMonthSelector(e.target.value)}
                  ref=''
                  className='profile-bMonth-selector'
                  value={this.state.bMonth}>
            <option value="" disabled></option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <p>Birthday Year</p>
          <select onChange={(e) => this.handleBYearSelector(e.target.value)}
                  ref=''
                  className='profile-bYear-selector'
                  value={this.state.bYear}>
                  {years}
          </select>
        </div>
     </div>
</div>

    );
  }
}

export default Profile;