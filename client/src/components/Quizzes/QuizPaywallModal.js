import React from 'react'
import { Button, Modal, ModalBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function QuizPaywallModal (props) {
  const { toggle, isOpen } = props

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalBody>
        You have reached your maximum quizzes. <Link to='/rocket/billing'>Upgrade your plan?</Link>
      </ModalBody>
      <Button color='info' onClick={toggle}>Understood</Button>
    </Modal>
  )
}

QuizPaywallModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool
}
