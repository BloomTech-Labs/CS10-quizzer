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
  state = {
    value: 'none'
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state.value)
  }

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
                  <form>
                    <ListGroup>
                      <select name='quizlist' onChange={this.handleChange} size='10'>
                        <option value='none'>Create New Quiz?</option>
                        {quizzes.map((quiz) => {
                          return (
                            <option
                              key={quiz.QuizID}
                              value={quiz.QuizID}
                              required>
                              {quiz.QuizName}
                            </option>
                          )
                        })}
                      </select>
                    </ListGroup>
                    <Button type='submit' onClick={this.handleSubmit}>{(this.state.value === 'none') ? 'Create New Quiz' : 'Add Quiz to Class'}</Button>
                  </form>
                )
              }
            }}
          </Query>
        </ModalBody>
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
