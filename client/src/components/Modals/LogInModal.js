import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import '../NavBar/NavBar.css'

const userLoginQueryMutation = gql`
  mutation LoginUser($TeacherEmail: String!, $TeacherPW: String!) {
    queryTeacher(TeacherEmail: $TeacherEmail, TeacherPW: $TeacherPW) {
      teacher {
        TeacherID
      }
      jwtString
    }
  }`

class LogInModal extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      logInError: '',
      redirect: false
    }
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      logInError: ''
    })
  }

  render () {
    const { email, password } = this.state
    return (
      <Modal className='signup_login_modal' isOpen={this.props.logInModal} toggle={this.props.toggleLogIn}>
        <ModalHeader className='signup_login_modal_header'>
          <span>Log in</span>
        </ModalHeader>
        <Mutation mutation={userLoginQueryMutation}>
          {(loginUser, { loading }) => (
            <div>
              <form onSubmit={event => {
                event.preventDefault()
                const login = loginUser({ variables: { TeacherEmail: email, TeacherPW: password } })
                login.then(data => {
                  const logInData = data.data.queryTeacher
                  if (logInData) {
                    localStorage.setItem('token', logInData.jwtString)
                    this.setState({
                      email: '',
                      password: '',
                      logInError: '',
                      redirect: true
                    })
                  }
                }).catch(() => {
                  this.setState({
                    logInError: 'Invalid Credentials'
                  })
                })
              }}>
                <ModalBody className='signup_login_modal_body'>
                  {loading ? <span>Checking Credentials. Please Wait...</span>
                    : <div>
                      <div className='modal_div'>
                        <span>EMAIL</span>
                        <input type='email' name='email' value={email} onChange={this.handleInputChange} style={this.state.logInError ? { borderBottom: '1.5px solid red' } : null} required />
                        {this.state.logInError ? <span className='error'>Invalid Credentials</span> : null}
                      </div>
                      <div className='modal_div'>
                        <span>PASSWORD</span>
                        <input type='password' name='password' value={password} onChange={this.handleInputChange} style={this.state.logInError ? { borderBottom: '1.5px solid red' } : null} required />
                        {this.state.logInError ? <span className='error'>Invalid Credentials</span> : null}
                      </div>
                      <div className='modal_div'>
                        <Button type='submit' color='info' className='signup_login_modal_button'>Log in</Button>
                      </div>
                    </div>
                  }
                </ModalBody>
                {loading ? null : <ModalFooter className='signup_login_modal_footer'>
                  <span className='modal_text'>Remember to log out on shared devices. <span>Forgot password?</span></span>
                </ModalFooter>}
              </form>
            </div>
          )}
        </Mutation>
        {this.state.redirect ? <Redirect to='/rocket/quizzes' /> : null}
      </Modal>
    )
  }
}

LogInModal.propTypes = {
  logInModal: PropTypes.bool,
  toggleLogIn: PropTypes.func
}

export default LogInModal
