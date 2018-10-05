import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import './NavBar.css'

import { buttonStyle, logout, signup } from './style/style'

class NavContainerRight extends Component {
  render () {
    return (
      <div className='nav_container_right'>
        {window.localStorage.getItem('token')
          ? <Button style={logout} className='nav_container_right_logout_button' onClick={this.props.logOut}>Log out</Button>
          : <div className='nav_container_right'>
            <Button style={buttonStyle} className='nav_container_right_login_button' onClick={this.props.toggleLogIn}>Log in</Button>
            <Button style={signup} className='nav_container_right_signup_button' color='info' onClick={this.props.toggleSignUp}>Sign up</Button>
          </div>
        }
      </div>
    )
  }
}

NavContainerRight.propTypes = {
  logOut: PropTypes.func,
  toggleLogIn: PropTypes.func,
  toggleSignUp: PropTypes.func
}

export default NavContainerRight
