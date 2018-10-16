import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

const ModalMessage = (props) => {
  return (
    <Modal className='modal_message' isOpen={props.modalOpen}>
      <ModalHeader className='modal_message_header'>
        {props.modalTitle}
      </ModalHeader>
      <ModalBody className='modal_message_body'>
        {props.modalText}
      </ModalBody>
      {props.modalSuccess
        ? <div className='modal_success_container'>
          <Button
            color='danger'
            className='yes_button'
            onClick={props.modalFuncOne}
          >Yes
          </Button>
          <Button
            color='warning'
            className='no_button'
            onClick={props.modalFuncTwo}
          >No
          </Button>
        </div>
        : null}
      {props.modalLoading
        ? null
        : <Button
          color='info'
          className='okay_button'
          onClick={props.modalFuncTwo}
        >OK
        </Button>
      }
    </Modal>
  )
}

ModalMessage.propTypes = {
  modalOpen: PropTypes.bool,
  modalTitle: PropTypes.string,
  modalText: PropTypes.string,
  modalLoading: PropTypes.bool,
  modalSuccess: PropTypes.bool,
  modalFuncOne: PropTypes.func,
  modalFuncTwo: PropTypes.func
}

export default ModalMessage
