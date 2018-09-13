import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import './NavBar.css'

const newUserMutation = gql`
mutation NewUser($teacher: String!, $email: String!, $password: String!) {
  createTeacher(TeacherName: $teacher) {
    teacher {
      TeacherName
    }
    jwtString
  }
}`

// const userLoginQuery = gql`
// {

// }`

class NavBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      signupModal: false,
      loginModal: false,
      badCredentialsModal: false,
      teacher: '',
      email: '',
      password: ''
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

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    const { teacher, email, password } = this.state

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
            <Mutation mutation={newUserMutation}>
              {(createNewUser, { loading, error, data }) => (
                <div>
                  <form onSubmit={event => {
                    event.preventDefault()
                    createNewUser({ variables: { teacher, email, password } })
                  }}>
                    <div className='modal_div'>
                      <span>USERNAME</span>
                      <input type='text' name='teacher' value={teacher} onChange={this.handleInputChange} required />
                    </div>
                    <div className='modal_div'>
                      <span>EMAIL</span>
                      <input type='email' name='email' value={email} onChange={this.handleInputChange} required />
                    </div>
                    <div className='modal_div'>
                      <span>PASSWORD</span>
                      <input type='password' name='password' value={password} onChange={this.handleInputChange} required />
                    </div>
                    <div className='modal_div'>
                      <span>CONFIRM PASSWORD</span>
                      <input type='password' name='password' required />
                    </div>
                    <div className='modal_div'>
                      <span className='modal_text'>By clicking Sign up, you accept Quizzer's <span>Terms of Service</span> and <span>Privacy Policy</span></span>
                      <Button type='submit' color='info' className='signup_loginModal_button'>Sign Up</Button>
                    </div>
                  </form>
                  {loading && <p>Saving new user...</p>}
                  {error && <p>Something went wrong, please try again</p>}
                  {data && window.localStorage.setItem('token', data.createTeacher.jwtString)}
                </div>
              )}
            </Mutation>
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
            <div>
              <form onSubmit={event => {
                event.preventDefault()
              }}>
                <div className='modal_div'>
                  <span>USERNAME OR EMAIL</span>
                  <input type='text' name='teacher' value={teacher} onChange={this.handleInputChange} required />
                </div>
                <div className='modal_div'>
                  <span>PASSWORD</span>
                  <input type='password' name='password' value={password} onChange={this.handleInputChange} />
                </div>
                <div className='modal_div'>
                  <Button type='submit' color='info' className='signup_loginModal_button'>Log in</Button>
                </div>
              </form>
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
