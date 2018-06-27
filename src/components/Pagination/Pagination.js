import React, { Component } from 'react';
import axios from 'axios';
import './Pagination.css';


class Pagination extends Component {
  constructor(){
    super()

    this.state = {
      pages: [],
      searchCnt: 0
    }
  }
  
  componentDidMount() {
    axios.get('/api/user/total').then(res => {
      this.setState({searchCnt: res.data[0].count})
    })
  }

  handlePgBtnClick() {
    
  }


render() {
  let offset = calcPages * 8;
  console.log(offset)
  let calcPages = Math.floor(this.state.searchCnt/8);
  let pgArr = [];
  for (var i=1; i<=calcPages; i++){
    pgArr.push(i);
  }

  return (
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
  )
}

}

export default Pagination;