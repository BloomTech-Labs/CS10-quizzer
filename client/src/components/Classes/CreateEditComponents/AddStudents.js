import React from 'react'
import { InputGroup, Input, Button } from 'reactstrap'
import { Mutation } from 'react-apollo'
import { string, func } from 'prop-types'
import gql from 'graphql-tag'

const CREATE_NEW_STUDENT = gql`
mutation CreateNewStudent($ClassID: String!, $StudentName: String!, $StudentEmail: String!) {
  createStudent(ClassID: $ClassID, StudentName: $StudentName, StudentEmail: $StudentEmail) {
    student {
      StudentID
      StudentName
      StudentEmail
    }
  }
}`

function AddStudents (props) {
  const { classID, name, email, handleInputChange } = props

  return (
    <div>
      <h4>Add Students</h4>
      <InputGroup>
        <Mutation mutation={CREATE_NEW_STUDENT}>
          {(createNewStudent, { loading, error, data }) => (
            <div>
              <form onSubmit={event => {
                event.preventDefault()
                createNewStudent({ variables: { ClassID: classID, StudentName: name, StudentEmail: email } })
              }}>
                <Input type='text' value={name} placeholder={'Name'} name='name' onChange={handleInputChange} required />
                <Input type='email' value={email} placeholder={'Email'} name='email' onChange={handleInputChange} required />
                <Button type='submit'>Add</Button>
              </form>
              {loading && <span>Saving student...</span>}
              {error && <span>{error.message}</span>}
              {data && <span>Student saved to class!</span>}
            </div>
          )}
        </Mutation>
      </InputGroup>
    </div>
  )
}

AddStudents.propTypes = {
  name: string,
  email: string,
  classID: string,
  handleInputChange: func
}

export default AddStudents
