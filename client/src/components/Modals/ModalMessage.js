import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

class ModalMessage extends Component {
  constructor () {
    super()
    this.state = {
      redirect: false
    }
  }

  redirect = () => {
    this.setState({
      redirect: true
    })
  }

  render () {
    return (
      <Modal className='modal_message' isOpen={this.props.modalMessage}>
        <ModalHeader className='modal_message_header'>
          {this.props.modalTitle}
        </ModalHeader>
        <ModalBody className='modal_message_body'>
          {this.props.modalText}
        </ModalBody>
        {this.props.modalSuccess
          ? <div className='modal_success_container'>
            <Button color='danger' className='yes_button' onClick={this.redirect}>Yes</Button>
            <Button color='warning' className='no_button' onClick={this.props.toggleModalMessage}>No</Button>
          </div>
          : null}
        {this.props.modalSaving ? null : <Button color='info' className='okay_button' onClick={this.props.toggleModalMessage}>OK</Button>}
        {this.state.redirect ? <Redirect to='/rocket/quizzes' /> : null}
      </Modal>
    )
  }
}

ModalMessage.propTypes = {
  modalMessage: PropTypes.bool,
  modalTitle: PropTypes.string,
  modalText: PropTypes.string,
  modalSaving: PropTypes.bool,
  modalSuccess: PropTypes.bool,
  toggleModalMessage: PropTypes.func
}

export default withRouter(ModalMessage)
