import React, { Component } from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Mutation } from 'react-apollo'
import '../NavBar/NavBar.css'

const newUserMutation = gql`
  mutation NewUser($TeacherName: String!, $TeacherEmail: String!, $TeacherPW: String!) {
    createTeacher(TeacherName: $TeacherName, TeacherEmail: $TeacherEmail, TeacherPW: $TeacherPW) {
      teacher {
        TeacherName
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
      passwordError: ''
    }
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    const { name, email, password, confirmPassword } = this.state
    return (
      <Modal className='signup_login_modal' isOpen={this.props.signUpModal} toggle={this.props.toggleSignUp}>
        <ModalHeader className='signup_login_modal_header'>
          <span>Sign up for free to create study sets</span>
        </ModalHeader>
        <Mutation mutation={newUserMutation}>
          {(createNewUser, { loading, error, data }) => (
            <form onSubmit={event => {
              event.preventDefault()
              if (this.state.password !== this.state.confirmPassword) {
                this.setState({ passwordError: 'Passwords do not match.' })
              } else {
                createNewUser({ variables: { TeacherName: name, TeacherEmail: email, TeacherPW: password } })
                this.setState({
                  name: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                  passwordError: false
                })
              }
            }}>
              <ModalBody className='signup_login_modal_body'>
                {loading ? <span>Checking information. Please wait...</span>
                  : <div>
                    <div className='modal_div'>
                      <span>NAME</span>
                      <input type='text' name='name' value={name} onChange={this.handleInputChange} required />
                    </div>
                    <div className='modal_div'>
                      <span>EMAIL</span>
                      <input type='email' name='email' value={email} onChange={this.handleInputChange} required />
                      {(data || error) && this.props.attemptSignUp(data, error)}
                    </div>
                    <div className='modal_div'>
                      <span>PASSWORD</span>
                      <input type='password' name='password' value={password} onChange={this.handleInputChange} required />
                      {this.state.passwordError ? <span className='error'>{this.state.passwordError}</span> : null}
                    </div>
                    <div className='modal_div'>
                      <span>CONFIRM PASSWORD</span>
                      <input type='password' name='confirmPassword' value={confirmPassword} onChange={this.handleInputChange} required />
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
      </Modal>
    )
  }
}

SignUpModal.propTypes = {
  signUpModal: PropTypes.bool,
  toggleSignUp: PropTypes.func,
  attemptSignUp: PropTypes.func
}

export default SignUpModal
