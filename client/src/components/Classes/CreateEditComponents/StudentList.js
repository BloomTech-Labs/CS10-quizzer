import React from 'react'
import Student from './Student'

// GraphQL query to get full list of students. Alternatively, have parent component make
// query and then receive students in props.

function StudentList (props) {
  return (
    <div>
      <h4>Student List</h4>
      <ul>
        <Student />
      </ul>
    </div>
  )
}

export default StudentList
