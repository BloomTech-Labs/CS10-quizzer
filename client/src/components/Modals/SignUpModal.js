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
      password: ''
    }
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    const { name, email, password } = this.state
    return (
      <Modal className='signup_login_modal' isOpen={this.props.signUpModal} toggle={this.props.toggleSignUp}>
        <ModalHeader className='signup_login_modal_header'>
          <span>Sign up for free to create study sets</span>
        </ModalHeader>
        <ModalBody className='signup_login_modal_body'>
          <Mutation mutation={newUserMutation}>
            {(createNewUser, { loading, error, data }) => (
              <div>
                <form onSubmit={event => {
                  event.preventDefault()
                  createNewUser({ variables: { TeacherName: name, TeacherEmail: email, TeacherPW: password } })
                  this.setState({
                    name: '',
                    email: '',
                    password: ''
                  })
                }}>
                  <div className='modal_div'>
                    <span>NAME</span>
                    <input type='text' name='name' value={name} onChange={this.handleInputChange} required />
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
                    <span>CONFIRM PASSWORD (ignore me for now)</span>
                    <input type='password' name='password' />
                  </div>
                  <div className='modal_div'>
                    <span className='modal_text'>By clicking Sign up, you accept Quizzer's <span>Terms of Service</span> and <span>Privacy Policy</span></span>
                    <Button type='submit' color='info' className='signup_login_modal_button'>Sign Up</Button>
                  </div>
                </form>
                {loading && <p>Saving new user...</p>}
                {(data || error) && this.props.attemptLogIn(data, error)}
              </div>
            )}
          </Mutation>
        </ModalBody>
        <ModalFooter className='signup_login_modal_footer'>
          <span>Already have an account? <span className='signup_login_modal_login'>Log in</span></span>
        </ModalFooter>
      </Modal>
    )
  }
}

SignUpModal.propTypes = {
  signUpModal: PropTypes.bool,
  toggleSignUp: PropTypes.func,
  attemptLogIn: PropTypes.func
}

export default SignUpModal
