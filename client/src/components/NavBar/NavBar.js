import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import NavContainerLeft from './NavContainerLeft'
import NavContainerRight from './NavContainerRight'
import LogInModal from '../Modals/LogInModal'
import SignUpModal from '../Modals/SignUpModal'
import { client } from '../../index'
import './NavBar.css'

import { navContainerStyle } from './style/style'

class NavBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      signUpModal: false,
      logInModal: false,
      redirect: false
    }
  }

  toggleSignUp = () => {
    this.setState({
      signUpModal: !this.state.signUpModal
    })
  }

  toggleLogIn = () => {
    this.setState({
      logInModal: !this.state.logInModal
    })
  }

  logOut = () => {
    client.clearStore()
    localStorage.clear()
    this.forceUpdate()
    this.setState({
      redirect: true
    })
  }

  render () {
    return (
      <div style={navContainerStyle} className='nav_container'>
        <NavContainerLeft toggleSignUp={this.toggleSignUp} />
        <NavContainerRight logOut={this.logOut} toggleLogIn={this.toggleLogIn} toggleSignUp={this.toggleSignUp} />
        <SignUpModal signUpModal={this.state.signUpModal} toggleSignUp={this.toggleSignUp} toggleLogIn={this.toggleLogIn} />
        <LogInModal logInModal={this.state.logInModal} toggleLogIn={this.toggleLogIn} />
        {this.state.redirect ? <Redirect to='/' /> : null }
      </div>
    )
  }
}

export default withRouter(NavBar)
