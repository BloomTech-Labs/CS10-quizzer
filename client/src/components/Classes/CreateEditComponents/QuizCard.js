import React from 'react'
import { Button } from 'reactstrap'

function QuizCard (props) {
  return (
    <div>
      <h4>Quiz Name</h4>
      <p>Completed: Number</p>
      <Button>Email to Students</Button>
    </div>
  )
}

export default QuizCard
