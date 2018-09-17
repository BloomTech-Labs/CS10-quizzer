import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const SignUp = (props) => {
  return (
    <Modal className='signup_loginModal' isOpen={this.state.signupModal} toggle={this.toggleSignup}>
      <ModalHeader className='signup_loginModal_header'>
        <span>Sign up for free to create study sets</span>
      </ModalHeader>
      <ModalBody className='signup_loginModal_body'>
        <Mutation mutation={props.newUserMutation}>
          {(createNewUser, { loading, error, data }) => (
            <div>
              <form onSubmit={event => {
                event.preventDefault()
                createNewUser({ variables: { teacher, email, password } })
                this.setState({
                  teacher: '',
                  email: '',
                  password: ''
                })
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
              {data && <p>User successfully created!</p> && window.localStorage.setItem('token', data.createTeacher.jwtString)}
            </div>
          )}
        </Mutation>
      </ModalBody>
      <ModalFooter className='signup_loginModal_footer'>
        <span>Already have an account? <span className='signup_loginModal_login'>Log in</span></span>
      </ModalFooter>
    </Modal>
  )
}
