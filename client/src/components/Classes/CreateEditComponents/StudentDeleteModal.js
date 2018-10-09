import React from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Mutation } from 'react-apollo'

const DELETE_STUDENT = gql`
mutation DeleteStudent($StudentID: String!, $encJwt: String!) {
  deleteStudent(StudentID: $StudentID, encJwt: $encJwt) {
    student {
      StudentID
    }
  }
}`

const StudentDeleteModal = (props) => {
  const { name, studentID, isOpen, toggle } = props

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        <span>Delete {name}?</span>
      </ModalHeader>
      <Mutation mutation={DELETE_STUDENT}>
        {(deleteStudent, { loading, error, data }) => (
          <div>
            <ModalBody>
              <Button onClick={event => {
                event.preventDefault()
                deleteStudent({
                  variables: {
                    StudentID: studentID,
                    encJwt: localStorage.getItem('token')
                  },
                  refetchQueries: ['getStudents']
                })
              }}>
              Delete Student
              </Button>
            </ModalBody>
            <ModalFooter>
              {loading && <span>Removing student from class...</span>}
              {error && <span>{error.message}</span>}
              {data && <span>Student successfully removed.</span>}
            </ModalFooter>
          </div>
        )}
      </Mutation>
    </Modal>
  )
}

StudentDeleteModal.propTypes = {
  name: PropTypes.string,
  studentID: PropTypes.string,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func
}

export default StudentDeleteModal
