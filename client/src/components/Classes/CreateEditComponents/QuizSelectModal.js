import React, { Component } from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Query, Mutation } from 'react-apollo'

const GET_QUIZZES = gql`
 query GetAllQuizzes($encJwt: String!) {
    teacher(encJwt: $encJwt) {
      quizSet {
        QuizID
        QuizName
        Public
      }
    }
  }`

class QuizSelectModal extends Component {
  state = {}

  render () {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader>
          <span>Add a Quiz</span>
        </ModalHeader>
        <Query query={GET_QUIZZES} variables={{ encJwt: localStorage.getItem('token') }}>
          {({ loading, error, data }) => (
            <div>
              <ModalBody>
                Temp
              </ModalBody>
              <Button type='submit'>Add Quiz to Class</Button>
              <ModalFooter>
                {loading && <span>Saving new class...</span>}
                {error && <span>{error.message}</span>}
                {data && <span>Data Get!</span>}
              </ModalFooter>
            </div>
          )}
        </Query>
      </Modal>
    )
  }
}

QuizSelectModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func
}

export default QuizSelectModal
