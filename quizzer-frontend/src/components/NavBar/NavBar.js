import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './NavBar.css'

class NavBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      signupModal: false,
      loginModal: false,
      badCredentialsModal: false,
      userData: {
        username: '',
        password: ''
      }
    }
  }

  toggleSignup = () => {
    this.setState({
      signupModal: !this.state.signupModal
    })
  }

  toggleLogin = () => {
    this.setState({
      loginModal: !this.state.loginModal
    })
  }

  toggleBadCredentials = () => {
    this.setState({
      badCredentialsModal: !this.state.badCredentialsModal
    })
  }

  login = (username, password) => {
    if (!username || !password) {
      console.log('Username n password plz')
    } else {
      gql`
      {

      }`
    }
  }

  render () {
    return (
      <div className='nav_container'>
        <div className='nav_container_left'>
          <Link className='nav_container_left_logo_button' to='/'><h1>Quizzer</h1></Link>
          <Button className='nav_container_left_createquiz_button' onClick={this.toggleSignup}>
            <span className='createquiz_button_text' role='img' aria-labelledby='Plus Symbol'>&#x2795; Create Quiz</span>
          </Button>
        </div>
        <div className='nav_container_right'>
          <Button className='nav_container_right_login_button' onClick={this.toggleLogin}>Log in</Button>
          <Button className='nav_container_right_signup_button' color='info' onClick={this.toggleSignup}>Sign up</Button>
        </div>
        <Modal className='signup_loginModal' isOpen={this.state.signupModal} toggle={this.toggleSignup}>
          <ModalHeader className='signup_loginModal_header'>
            <span>Sign up for free to create study sets</span>
          </ModalHeader>
          <ModalBody className='signup_loginModal_body'>
            <form>
              <div className='modal_div'>
                <span>USERNAME</span>
                <input type='text' name='username' required />
              </div>
              <div className='modal_div'>
                <span>EMAIL</span>
                <input type='email' name='email' required />
              </div>
              <div className='modal_div'>
                <span>PASSWORD</span>
                <input type='password' name='password' required />
              </div>
              <div className='modal_div'>
                <span>CONFIRM PASSWORD</span>
                <input type='password' name='password' />
              </div>
              <div className='modal_div'>
                <span className='modal_text'>By clicking Sign up, you accept Quizzer's <span>Terms of Service</span> and <span>Privacy Policy</span></span>
                <Button type='submit' color='info' className='signup_loginModal_button'>Sign up</Button>
              </div>
            </form>
          </ModalBody>
          <ModalFooter className='signup_loginModal_footer'>
            <span>Already have an account? <span className='signup_loginModal_login'>Log in</span></span>
          </ModalFooter>
        </Modal>
        <Modal className='signup_loginModal' isOpen={this.state.loginModal} toggle={this.toggleLogin}>
          <ModalHeader className='signup_loginModal_header'>
            <span>Log in</span>
          </ModalHeader>
          <ModalBody className='signup_loginModal_body'>
            <div className='modal_div'>
              <span>USERNAME OR EMAIL</span>
              <input type='text' name='username' />
            </div>
            <div className='modal_div'>
              <span>PASSWORD</span>
              <input type='password' name='password' />
            </div>
            <div className='modal_div'>
              <Button color='info' className='signup_loginModal_button'>Log in</Button>
            </div>
          </ModalBody>
          <ModalFooter className='signup_loginModal_footer'>
            <span className='modal_text'>Remember to log out on shared devices. <span>Forgot password?</span></span>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
};

export default NavBar
