import './Profile.css';
import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header/Header';

class Profile extends Component {
  constructor(){
    super()

    this.state = {
      userId: null,
      first_name: '',
      last_name: '',
      gender: '',
      hair_color: '',
      eye_color: '',
      hobby: '',
      birth_day: 1,
      birth_month: '',
      birth_year: 1918,
      profile_img: '' 
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

componentDidMount(){
  axios.get('/api/auth/authenticated').then(res => {
    this.setState({
      userID: res.data.user_id,
      first_name: res.data.first_name,
      last_name: res.data.last_name,
      gender: res.data.gender,
      hair_color: res.data.hair_color,
      eye_color: res.data.eye_color,
      hobby: res.data.hobby,
      birth_day: res.data.birth_day,
      birth_month: res.data.birth_month,
      birth_year: res.data.birth_year,
      profile_img: res.data.profile_img
    })
  })
}  

handleUpdateBtnClick(){
  let promise = axios.patch(`/api/patch/${this.state.userID}`, 
    { first_name: this.state.first_name,
      last_name: this.state.last_name,
      gender: this.state.gender,
      hair_color: this.state.hair_color,
      eye_color: this.state.eye_color,
      hobby: this.state.hobby,
      birth_day: this.state.birth_day,
      birth_month: this.state.birth_month,
      birth_year: this.state.birth_year
    })
    promise.then(res => {
    console.log('update successful')
  })  
}

handleCancelBtnClick(){
  axios.get('/api/auth/authenticated').then(res => {
    this.setState({
      userInfo: res.data
    })
  })
}

handleFirstNameInput(val){
  this.setState({first_name: val})
}

handleLastNameInput(val){
  this.setState({last_name: val})
}

handleGenderSelector(val){
  this.setState({gender: val})
}

handleHairSelector(val){
  this.setState({hair_color: val})
}

handleEyeSelector(val){
  this.setState({eye_color: val})
}

handleHobbySelector(val){
  this.setState({hobby: val})
}

handleBDaySelector(val){
  this.setState({birth_day: val})
}

handleBMonthSelector(val){
  this.setState({birth_month: val})
}

handleBYearSelector(val){
  this.setState({birth_year: val})
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
     <Header title='Profile'/>

     <div className='profile-container'>
        <div className='profile-info'>
          <div className='profile-picName'>
            <img src={this.state.profile_img} 
                 className='profile-img' 
                 alt="me"/>
            {/* below name will be rendered from state */}
            <h3 className='profile-name-wpr'>
              <p className='profile-name'>
                {this.state.first_name}
              </p>
              <p className='profile-name'>
              {this.state.last_name}
              </p>
            </h3>
          </div>
          <div className='profile-btns'>
            <button onClick={this.handleUpdateBtnClick}
                    className='profile-update-btn'>Update</button>
            <button onClick={this.handleCancelBtnClick} 
                    className='profile-cancel-btn'>Cancel</button>
          </div>
        </div>
        <div className='profile-edit'>
          <p className='profile-sel-title'>First Name</p>
          <input onChange={(e) => this.handleFirstNameInput(e.target.value)} 
                 className='profile-edit-name' 
                 type="text"
                 value={this.state.first_name}/>
          <p className='profile-sel-title'>Last Name</p>
          <input onChange={(e) => this.handleLastNameInput(e.target.value)}
                 className='profile-edit-name' 
                 type="text"
                 value={this.state.last_name}/>
          <p className='profile-sel-title'>Gender</p>
          <select onChange={(e) => this.handleGenderSelector(e.target.value)}
                  ref=''
                  className='profile-selector'
                  value={this.state.gender}>
            <option value="" disabled></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <p className='profile-sel-title'>Hair Color</p>
          <select onChange={(e) => this.handleHairSelector(e.target.value)}
                  ref=''
                  className='profile-selector'
                  value={this.state.hair_color}>
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
          <p className='profile-sel-title'>Eye Color</p>
          <select onChange={(e) => this.handleEyeSelector(e.target.value)}
                  ref=''
                  className='profile-selector'
                  value={this.state.eye_color}>
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
          <p className='profile-sel-title'>Hobby</p>
          <select onChange={(e) => this.handleHobbySelector(e.target.value)}
                  ref=''
                  className='profile-selector'
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
          <p className='profile-sel-title'>Birthday Day</p>
          <select onChange={(e) => this.handleBDaySelector(e.target.value)}
                  ref=''
                  className='profile-selector'
                  value={this.state.birth_day}>
                  {days}
          </select>
          <p className='profile-sel-title'>Birthday Month</p>
          <select onChange={(e) => this.handleBMonthSelector(e.target.value)}
                  ref=''
                  className='profile-selector'
                  value={this.state.birth_month}>
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
          <p className='profile-sel-title'>Birthday Year</p>
          <select onChange={(e) => this.handleBYearSelector(e.target.value)}
                  ref=''
                  className='profile-selector'
                  value={this.state.birth_year}>
                  {years}
          </select>
        </div>
     </div>
</div>

    );
  }
}

export default Profile;