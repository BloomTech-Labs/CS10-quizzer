import React, { Component } from 'react'
import { InputGroup, Input, Button } from 'reactstrap'
import { Mutation } from 'react-apollo'
import { string } from 'prop-types'
import gql from 'graphql-tag'
import StudentList from './StudentList'

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
      <div>
        <h4>Add Students</h4>
        <InputGroup>
          <Mutation mutation={CREATE_NEW_STUDENT}>
            {(createNewStudent, { loading, error }) => (
              <div>
                <form onSubmit={event => {
                  event.preventDefault()
                  createNewStudent({
                    variables: {
                      ClassID: classID,
                      StudentName: name,
                      StudentEmail: email
                    },
                    refetchQueries: ['getStudents'] // this query is created in StudentList.js and saved in the Apollo cache, which is where it is called from and why it's a string here.
                  })
                  this.setState({
                    name: '',
                    email: ''
                  })
                }}>
                  <Input type='text' value={name} placeholder={'Name'} name='name' onChange={this.handleInputChange} required />
                  <Input type='email' value={email} placeholder={'Email'} name='email' onChange={this.handleInputChange} required />
                  <Button type='submit'>Add</Button>
                </form>
                {loading && <span>Saving student...</span>}
                {error && <span>{error.message}</span>}
              </div>
            )}
          </Mutation>
        </InputGroup>
        <StudentList classID={classID} />
      </div>
    )
  }
}

StudentPanel.propTypes = {
  classID: string
}

export default StudentPanel