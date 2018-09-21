import React, { Component } from 'react'
import Home from '../Home/Home'
import { Route, Link, withRouter } from 'react-router-dom'
import './RocketList.css'

class RocketList extends Component {
  constructor () {
    super()
    this.state = {
      username: ''
    }
  }

  render () {
    return (
      <div className='rocket_list_container'>
        <span className='username'>Welcome {this.state.username}</span>
        <div className='rocket_list_navbar'>
          <Link to='/quizzes'>Quizzes</Link>
          <Link to='/classes'>Classes</Link>
          <Link to='/billing'>Billing</Link>
          <Link to='/settings'>Settings</Link>
        </div>
        <Route exact path='/:userId' Component={Home} />
      </div>
    )
  }
}

export default withRouter(RocketList)
