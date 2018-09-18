import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './Landing.css'

class GetStartedModal extends Component {
  render () {
    return (
      <Modal className='getstarted_button_modal' isOpen={this.props.getStartedModal} toggle={this.props.toggleGetStarted}>
        <ModalHeader className='getstarted_button_modal_header'>
          <span>Sign up for free to create study sets</span>
        </ModalHeader>
        <ModalBody className='getstarted_button_modal_body'>
          <div className='modal_div'>
            <span>NAME</span>
            <input type='text' name='name' />
          </div>
          <div className='modal_div'>
            <span>EMAIL</span>
            <input type='email' name='email' />
          </div>
          <div className='modal_div'>
            <span>PASSWORD</span>
            <input type='password' name='password' />
          </div>
          <div className='modal_div'>
            <span>CONFIRM PASSWORD (ignore me for now)</span>
            <input type='password' name='password' />
          </div>
          <div className='modal_div'>
            <span className='modal_text'>By clicking Sign up, you accept Quizzer's <span>Terms of Service</span> and <span>Privacy Policy</span></span>
            <Button color='info' className='getstarted_button_modal_signup_button'>Sign up</Button>
          </div>
        </ModalBody>
        <ModalFooter className='getstarted_button_modal_footer'>
          <span>Already have an account? <span className='getstarted_button_modal_login'>Log in</span></span>
        </ModalFooter>
      </Modal>
    )
  }
}

GetStartedModal.propTypes = {
  getStartedModal: PropTypes.bool,
  toggleGetStarted: PropTypes.func
}

export default GetStartedModal
