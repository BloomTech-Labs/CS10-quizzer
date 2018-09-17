import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import './NavBar.css'

class NavContainerLeft extends Component {
  render () {
    return (
      <div className='nav_container_left'>
        <Link className='nav_container_left_logo_button' to='/'><h1>Quizzer</h1></Link>
        <Button className='nav_container_left_createquiz_button' onClick={this.props.toggleSignUp}>
          <span className='createquiz_button_text' role='img' aria-labelledby='Plus Symbol'>&#x2795; Create Quiz</span>
        </Button>
      </div>
    )
  }
}

NavContainerLeft.propTypes = {
  toggleSignUp: PropTypes.func
}

export default NavContainerLeft
