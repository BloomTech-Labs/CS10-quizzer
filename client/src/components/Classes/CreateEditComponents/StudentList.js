import React, { Fragment } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Student from './Student'
import { string } from 'prop-types'

import styled from 'styled-components'

const StudentsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 2rem;
`

// const StudentsWrapper = styled.div`
//   display: flex;
//   justify-content: flex-start;
// `

const StudentsWrapper = styled.div`
  display: grid;
  grid-column-gap: 15px;
  grid-template-columns: 100%;
  grid-auto-rows: 50px;

  @media (min-width: 420px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 636px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

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
    <StudentsListWrapper className='students_list_wrapper'>
      <h4>Student List</h4>

      <Query query={GET_CLASS_STUDENTS} variables={{ ClassID: classID }}>
        {({ loading, data, error }) => {
          if (loading) return <h3>Loading...</h3>

          if (error) return <h3>{error.message}</h3>

          if (data) {
            const { classStudents } = data
            
            return (
              <StudentsWrapper className='students_list_wrapper__students_wrapper'>
                {classStudents && classStudents.length > 0
                  ? classStudents.map(student => {
                    return (
                      <Student
                        key={student.StudentID}
                        studentName={student.StudentName}
                        studentID={student.StudentID}
                      />
                    )
                  })
                  : <p>No students in this class yet.</p>}
              </StudentsWrapper>
            )
          }
        }}
      </Query>
    </StudentsListWrapper>
  )
}

StudentList.propTypes = {
  classID: string
}

export default StudentList
