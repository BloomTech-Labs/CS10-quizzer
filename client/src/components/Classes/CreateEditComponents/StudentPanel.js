import React, { Component } from 'react'
import { InputGroup, Input, Button } from 'reactstrap'
import { Mutation } from 'react-apollo'
import { string } from 'prop-types'
import gql from 'graphql-tag'
import StudentList from './StudentList'

import styled from 'styled-components'

const AddStudentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 250px;
`

const AddStudentsFormWrapper = styled(InputGroup)`
  height: 140px;
  margin-bottom: 2rem;
`

const AddStudentsForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const CREATE_NEW_STUDENT = gql`
mutation CreateNewStudent($ClassID: String!, $StudentName: String!, $StudentEmail: String!, $encJwt: String!) {
  createStudent(ClassID: $ClassID, StudentName: $StudentName, StudentEmail: $StudentEmail, encJwt: $encJwt) {
    student {
      StudentID
      StudentName
      StudentEmail
    }
  }
}`

class StudentPanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: ''
    }
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    const { classID } = this.props
    const { name, email } = this.state
    return (
      <AddStudentsWrapper className='add_student_wrapper'>
        <h4>Add Students</h4>

        <AddStudentsFormWrapper className='add_student_wrapper__add_students_form'>
          <Mutation mutation={CREATE_NEW_STUDENT}>
            {(createNewStudent, { loading, error }) => (
              <div style={{ width: '100%' }}>
                <AddStudentsForm onSubmit={event => {
                  event.preventDefault()
                  createNewStudent({
                    variables: {
                      ClassID: classID,
                      StudentName: name,
                      StudentEmail: email,
                      encJwt: localStorage.getItem('token')
                    },
                    refetchQueries: ['GetClassQuizzes', 'getStudents', 'getClasses']
                  })
                  this.setState({
                    name: '',
                    email: ''
                  })
                }}>
                  <Input type='text' value={name} placeholder={'Name'} name='name' onChange={this.handleInputChange} required />
                  <Input type='email' value={email} placeholder={'Email'} name='email' onChange={this.handleInputChange} required />
                  <Button type='submit'>Add</Button>
                </AddStudentsForm>
                {loading && <span>Saving student...</span>}
                {error && <span>{error.message}</span>}
              </div>
            )}
          </Mutation>
        </AddStudentsFormWrapper>

        <StudentList classID={classID} />
      </AddStudentsWrapper>
    )
  }
}

StudentPanel.propTypes = {
  classID: string
}

export default StudentPanel
