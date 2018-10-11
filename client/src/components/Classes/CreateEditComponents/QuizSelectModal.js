import React, { Component } from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup } from 'reactstrap'
import { Redirect } from 'react-router-dom'
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

const ADD_QUIZ_TO_CLASS = gql`
  mutation AddQuizToClass($Classroom: String!, $QuizID: String!, $encJWT: String!) {
    addQuizToClass(Classroom: $Classroom, QuizID: $QuizID, encJWT: $encJWT) {
      quiz {
        QuizName
      }
    }
  }`

class QuizSelectModal extends Component {
  state = {
    value: 'none',
    redirect: false
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  componentDidMount = () => {
    this.setState({
      value: 'none',
      redirect: false
    })
  }

  render () {
    const { classID, isOpen, toggle } = this.props

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
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
                      <select value={this.state.value} name='quizlist' onChange={this.handleChange} size='10'>
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
                    <Mutation mutation={ADD_QUIZ_TO_CLASS}>
                      {(addQuiztoClass, { loading, error }) => (
                        <div>
                          <Button type='submit' onClick={event => {
                            event.preventDefault()
                            if (this.state.value === 'none') {
                              this.setState({
                                redirect: true
                              })
                            } else {
                              addQuiztoClass({
                                variables: {
                                  Classroom: classID,
                                  encJWT: window.localStorage.getItem('token'),
                                  QuizID: this.state.value
                                },
                                refetchQueries: ['GetClassQuizzes', 'getClasses', 'GetStudentScores']
                              })
                            }
                          }}>{(this.state.value === 'none') ? 'Create New Quiz' : 'Add Quiz to Class'}</Button>
                          <ModalFooter>
                            {loading && <span>Adding to class...</span>}
                            {error && <span>{error.message}</span>}
                          </ModalFooter>
                        </div>
                      )}
                    </Mutation>
                  </form>
                )
              }
            }}
          </Query>
        </ModalBody>
        {this.state.redirect ? <Redirect to='/rocket/quizzes/createquiz/' /> : null}
      </Modal>
    )
  }
}

QuizSelectModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  classID: PropTypes.string
}

export default QuizSelectModal
