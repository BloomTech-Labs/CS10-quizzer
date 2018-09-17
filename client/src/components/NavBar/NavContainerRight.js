import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import './NavBar.css'

class NavContainerRight extends Component {
  render () {
    return (
      <div className='nav_container_right'>
        {window.localStorage.getItem('token')
          ? <Button className='nav_container_right_logout_button' color='warning' onClick={this.props.logOut}>Log out</Button>
          : <div className='nav_container_right'>
            <Button className='nav_container_right_login_button' onClick={this.props.toggleLogIn}>Log in</Button>
            <Button className='nav_container_right_signup_button' color='info' onClick={this.props.toggleSignUp}>Sign up</Button>
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
