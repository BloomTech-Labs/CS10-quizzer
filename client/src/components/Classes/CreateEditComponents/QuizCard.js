import React from 'react'
import { Button } from 'reactstrap'
import { string } from 'prop-types'

function QuizCard (props) {
  const { quizName } = props
  return (
    <div>
      <h4>{quizName}</h4>
      <p>Completed: Number</p>
      <Button>Email to Students</Button>
    </div>
  )
}

QuizCard.propTypes = {
  quizName: string
}

export default QuizCard
