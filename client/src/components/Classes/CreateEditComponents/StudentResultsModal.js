import React from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody, ListGroup } from 'reactstrap'
import { Query } from 'react-apollo'

const GET_STUDENT_SCORES = gql`
 query GetStudentScores($StudentID: String!) {
  studentScores(StudentID: $StudentID) {
    QuizName
    Score
  }
}`

function QuizSelectModal (props) {
  const { isOpen, toggle, name, studentID } = props

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <span>{name}'s Quiz Scores</span>
      </ModalHeader>
      <ModalBody>
        <Query query={GET_STUDENT_SCORES} variables={{ StudentID: studentID }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...'
            if (error) return error.message
            if (data) {
              const scores = data.studentScores
              return (
                <ListGroup>
                  <select name='scoreslist' size='10'>
                    {scores.map((score, index) => {
                      return (
                        <option
                          key={index}
                        >
                          {score.QuizName ? `Quiz: ${score.QuizName} Total: ${score.Score}` : 'Student must take this quiz before results are available.'}
                        </option>
                      )
                    })}
                  </select>
                </ListGroup>
              )
            }
          }}
        </Query>
      </ModalBody>
    </Modal>
  )
}

QuizSelectModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  studentID: PropTypes.string,
  name: PropTypes.string
}

export default QuizSelectModal
