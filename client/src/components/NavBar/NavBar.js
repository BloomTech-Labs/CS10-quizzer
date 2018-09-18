import React, { Component } from 'react'
import NavContainerLeft from './NavContainerLeft'
import NavContainerRight from './NavContainerRight'
import LogInModal from './LogInModal'
import SignUpModal from './SignUpModal'
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
      return <pre>Error: {error.graphQLErrors.map(({ message }, i) => (<span key={i}>{message}</span>))}</pre>
      // return this.state.logInModal ? <p>Invalid user name or password.</p> : <p>Something went wrong, please try again.</p>
    }

    // if (data) {
    //   if (data.queryTeacher && data.queryTeacher.jwtString) {
    //     window.localStorage.setItem('token', data.queryTeacher.jwtString)
    //     return <p>Successfully signed in!</p>
    //   } else if (data.queryTeacher && !data.queryTeacher.jwtString) {
    //     return <p>Invalid user name or password</p>
    //   } else if (data.createTeacher) {
    //     window.localStorage.setItem('token', data.createTeacher.jwtString)
    //     return <p>Successfully created new user!</p>
    //   }
    // }
    if (data) {
      data.createTeacher ? window.localStorage.setItem('token', data.createTeacher.jwtString) : window.localStorage.setItem('token', data.queryTeacher.jwtString)
      return this.state.logInModal ? <span>Successfully signed in!</span> : <span>Successfully created new user!</span>
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
