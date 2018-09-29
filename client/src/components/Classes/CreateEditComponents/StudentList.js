import React from 'react'
import Student from './Student'
import { array } from 'prop-types'

function StudentList (props) {
  const { students } = props

  return (
    <div>
      <h4>Student List</h4>
      <ul>
        {students && students.length > 0
          ? students.map(student => {
            return (
              <Student
                key={student.StudentID}
                studentName={student.StudentName} />
            )
          })
          : null}
      </ul>
    </div>
  )
}

StudentList.propTypes = {
  students: array
}

export default StudentList
