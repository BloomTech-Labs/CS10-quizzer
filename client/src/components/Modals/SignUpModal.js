import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Mutation } from 'react-apollo'
import '../NavBar/NavBar.css'

const newUserMutation = gql`
  mutation NewUser($TeacherName: String!, $TeacherEmail: String!, $TeacherPW: String!) {
    createTeacher(TeacherName: $TeacherName, TeacherEmail: $TeacherEmail, TeacherPW: $TeacherPW) {
      teacher {
        TeacherID
      }
      jwtString
    }
  }`

class SignUpModal extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordError: '',
      signUpError: '',
      redirect: false
    }
  }

  handleInputChange = event => {
    if (event.target.name === 'name' || event.target.name === 'email') {
      this.setState({
        [event.target.name]: event.target.value,
        signUpError: ''
      })
    } else if (event.target.name === 'password' || event.target.name === 'confirmPassword') {
      this.setState({
        [event.target.name]: event.target.value,
        passwordError: ''
      })
    }
  }

  render () {
    const { name, email, password, confirmPassword } = this.state
    return (
      <Modal className='signup_login_modal' isOpen={this.props.signUpModal || this.props.getStartedModal} toggle={this.props.toggleSignUp || this.props.toggleGetStarted}>
        <ModalHeader className='signup_login_modal_header'>
          <span>Sign up for free to create study sets</span>
        </ModalHeader>
        <Mutation mutation={newUserMutation}>
          {(createNewUser, { loading }) => (
            <form onSubmit={event => {
              event.preventDefault()
              if (this.state.password !== this.state.confirmPassword) {
                this.setState({ passwordError: 'Passwords do not match.' })
              } else {
                const createdUser = createNewUser({ variables: { TeacherName: name, TeacherEmail: email, TeacherPW: password } })
                createdUser.then(data => {
                  const createdUserData = data.data.createTeacher
                  if (createdUserData) {
                    localStorage.setItem('token', createdUserData.jwtString)
                    localStorage.setItem('id', createdUserData.teacher.TeacherID)
                    this.setState({
                      name: '',
                      email: '',
                      password: '',
                      confirmPassword: '',
                      passwordError: '',
                      signUpError: '',
                      redirect: true
                    })
                  }
                }).catch(() => {
                  this.setState({
                    signUpError: 'An Account Already Exists'
                  })
                })
              }
            }}>
              <ModalBody className='signup_login_modal_body'>
                {loading ? <span>Checking information. Please wait...</span>
                  : <div>
                    <div className='modal_div'>
                      <span>NAME</span>
                      <input type='text' name='name' value={name} onChange={this.handleInputChange} style={this.state.signUpError ? { borderBottom: '1.5px solid red' } : null} required />
                      {this.state.signUpError ? <span className='error'>{this.state.signUpError}</span> : null}
                    </div>
                    <div className='modal_div'>
                      <span>EMAIL</span>
                      <input type='email' name='email' value={email} onChange={this.handleInputChange} style={this.state.logInError ? { borderBottom: '1.5px solid red' } : null} required />
                      {this.state.signUpError ? <span className='error'>{this.state.signUpError}</span> : null}
                    </div>
                    <div className='modal_div'>
                      <span>PASSWORD</span>
                      <input type='password' name='password' value={password} onChange={this.handleInputChange} style={this.state.passwordError ? { borderBottom: '1.5px solid red' } : null} required />
                      {this.state.passwordError ? <span className='error'>{this.state.passwordError}</span> : null}
                    </div>
                    <div className='modal_div'>
                      <span>CONFIRM PASSWORD</span>
                      <input type='password' name='confirmPassword' value={confirmPassword} onChange={this.handleInputChange} style={this.state.passwordError ? { borderBottom: '1.5px solid red' } : null} required />
                      {this.state.passwordError ? <span className='error'>{this.state.passwordError}</span> : null}
                    </div>
                    <div className='modal_div'>
                      <span className='modal_text'>By clicking Sign up, you accept Quizzer's <span>Terms of Service</span> and <span>Privacy Policy</span></span>
                      <Button type='submit' color='info' className='signup_login_modal_button'>Sign Up</Button>
                    </div>
                  </div>
                }
              </ModalBody>
              {loading ? null : <ModalFooter className='signup_login_modal_footer'>
                <span>Already have an account? <span className='signup_login_modal_login'>Log in</span></span>
              </ModalFooter>}
            </form>
          )}
        </Mutation>
        {this.state.redirect ? <Redirect to={`/${localStorage.getItem('id')}/quizzes`} /> : null}
      </Modal>
    )
  }
}

SignUpModal.propTypes = {
  signUpModal: PropTypes.bool,
  getStartedModal: PropTypes.bool,
  toggleSignUp: PropTypes.func,
  toggleGetStarted: PropTypes.func
}

export default SignUpModal
