import React, { Component } from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup } from 'reactstrap'
import { Query } from 'react-apollo'

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
        <ModalBody>
          <Query query={GET_QUIZZES} variables={{ encJwt: localStorage.getItem('token') }}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...'
              if (error) return error.message
              if (data) {
                const quizzes = data.teacher[0].quizSet
                return (
                  <ListGroup>
                    <select name='test' size='5'>
                      {quizzes.map((quiz) => {
                        return (
                          <option key={quiz.QuizID}>{quiz.QuizName}</option>
                        )
                      })}
                    </select>
                  </ListGroup>
                )
              }
            }}
          </Query>
        </ModalBody>
        <Button type='submit'>Add Quiz to Class</Button>
        <ModalFooter />
      </Modal>
    )
  }
}

QuizSelectModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func
}

export default QuizSelectModal
