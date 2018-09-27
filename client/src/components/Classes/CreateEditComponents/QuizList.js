import React from 'react'
import QuizCard from './QuizCard'

// Will need mutations for adding/removing students from the class.
// Each student needs to be a dropdown to either display a list of their quizzes and results,
// or provide an option to delete them from the class.

function StudentList (props) {
  return (
    <div>
      <h3>Student List</h3>
      <ul>
        <QuizCard />
      </ul>
    </div>
  )
}

export default StudentList
