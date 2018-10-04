import React, { Fragment } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Student from './Student'
import { string } from 'prop-types'

// This query gets cached by Apollo and can now be used anywhere for
// refetch calls without needing to redeclare it elsewhere.
const GET_CLASS_STUDENTS = gql`
query getStudents($ClassID: String!) {
  classStudents(ClassID: $ClassID) {
    StudentID
    StudentName
  }
}`

function StudentList (props) {
  const { classID } = props

  return (
    <div>
      <h4>Student List</h4>
      <Query query={GET_CLASS_STUDENTS} variables={{ ClassID: classID }}>
        {({ loading, data, error }) => {
          if (loading) return <h3>Loading...</h3>
          if (error) return <h3>{error.message}</h3>
          if (data) {
            const { classStudents } = data
            return (
              <Fragment>
                {classStudents && classStudents.length > 0
                  ? classStudents.map(student => {
                    return (
                      <Student
                        key={student.StudentID}
                        studentName={student.StudentName}
                        studentID={student.StudentID} />
                    )
                  })
                  : <p>No students in this class yet.</p>}
              </Fragment>
            )
          }
        }}
      </Query>
    </div>
  )
}

StudentList.propTypes = {
  classID: string
}

export default StudentList
