import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
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
      logInModal: false,
      redirectSign: false,
      redirectLog: false
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

  attemptSignUp = (data, error) => {
    if (error) {
      return this.state.logInModal ? <span className='error'>Email Already Exists</span> : null
    }
  }

  attemptLogIn = (data, error) => {
    if (error) {
      return this.state.logInModal ? <span className='error'>Invalid Credentials</span> : <span className='error'>An error occurred. Please try again.</span>
    }

    if (data) {
      if (data.queryTeacher && data.queryTeacher.jwtString) {
        localStorage.setItem('token', data.queryTeacher.jwtString)
        localStorage.setItem('id', data.queryTeacher.teacher.TeacherID)
        this.setState({
          redirectLog: true
        })
      } else if (data.queryTeacher && !data.queryTeacher.jwtString) {
        return <span className='error'>Invalid Credentials</span>
      }
    }
  }

  render () {
    return (
      <div className='nav_container'>
        <NavContainerLeft toggleSignUp={this.toggleSignUp} />
        <NavContainerRight logOut={this.logOut} toggleLogIn={this.toggleLogIn} toggleSignUp={this.toggleSignUp} />
        <SignUpModal signUpModal={this.state.signUpModal} toggleSignUp={this.toggleSignUp} attemptSignUp={this.attemptSignUp} />
        <LogInModal logInModal={this.state.logInModal} toggleLogIn={this.toggleLogIn} attemptLogIn={this.attemptLogIn} />
        {this.state.redirectLog ? <Redirect to={`/rocketlist/${localStorage.getItem('id')}`} /> : null}
      </div>
    )
  }
}

export default NavBar
