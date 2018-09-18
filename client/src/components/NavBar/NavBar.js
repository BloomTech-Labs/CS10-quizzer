import React, { Component } from 'react'
import NavContainerLeft from './NavContainerLeft'
import NavContainerRight from './NavContainerRight'
import LogInModal from '../Modals/LogInModal'
import SignUpModal from '../Modals/SignUpModal'
import './NavBar.css'

class NavBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      signUpModal: false,
      logInModal: false
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
    window.localStorage.clear()
    this.forceUpdate()
  }

  attemptLogIn = (data, error) => {
    if (error) {
      return this.state.logInModal ? <p>Invalid user name or password.</p> : <p>Something went wrong, please try again.</p>
    }

    if (data) {
      if (data.queryTeacher && data.queryTeacher.jwtString) {
        window.localStorage.setItem('token', data.queryTeacher.jwtString)
        return <p>Successfully signed in!</p>
      } else if (data.queryTeacher && !data.queryTeacher.jwtString) {
        return <p>Invalid user name or password</p>
      } else if (data.createTeacher) {
        window.localStorage.setItem('token', data.createTeacher.jwtString)
        return <p>Successfully created new user!</p>
      }
    }
  }

  render () {
    return (
      <div className='nav_container'>
        <NavContainerLeft toggleSignUp={this.toggleSignUp} />
        <NavContainerRight logOut={this.logOut} toggleLogIn={this.toggleLogIn} toggleSignUp={this.toggleSignUp} />
        <SignUpModal signUpModal={this.state.signUpModal} toggleSignUp={this.toggleSignUp} handleInputChange={this.handleInputChange} attemptLogIn={this.attemptLogIn} />
        <LogInModal logInModal={this.state.logInModal} toggleLogIn={this.toggleLogIn} attemptLogIn={this.attemptLogIn} />
      </div>
    )
  }
}

export default NavBar
