import React, { Component } from 'react'
import { Button, Modal, ModalBody } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class QuizPaywallModal extends Component {
  state = {
    redirect: false
  }

  upgradePlan = () => {
    this.setState({
      redirect: true
    })
  }

  render () {
    const { toggle, isOpen } = this.props
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalBody>
          You have reached your maximum quizzes. Upgrade your plan?
        </ModalBody>
        <Button color='success' onClick={this.upgradePlan}>Upgrade!</Button>
        <Button color='danger' onClick={toggle}>No thanks</Button>
        {this.state.redirect ? <Redirect to={'/rocket/billing'} /> : null}
      </Modal>
    )
  }
}

QuizPaywallModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool
}
