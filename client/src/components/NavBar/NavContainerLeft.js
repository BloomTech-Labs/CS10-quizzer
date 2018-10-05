import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import './NavBar.css'

import { navContainerLeftStyle } from './style/style'

class NavContainerLeft extends Component {
  render () {
    return (
      <div style={navContainerLeftStyle} className='nav_container_left'>
        <Link className='nav_container_left_logo_button' to='/'><h1>Quizzer</h1></Link>
      </div>
    )
  }
}

NavContainerLeft.propTypes = {
  toggleSignUp: PropTypes.func
}

export default NavContainerLeft
