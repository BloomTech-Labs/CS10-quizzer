import React from 'react'
import QuizCard from './QuizCard'

// Will need mutations for adding/removing students from the class.
// Each student needs to be a dropdown to either display a list of their quizzes and results,
// or provide an option to delete them from the class.

function QuizList (props) {
  return (
    <div>
      <h4>Quizzes</h4>
      <ul>
        <QuizCard />
      </ul>
    </div>
  )
}

export default QuizList
