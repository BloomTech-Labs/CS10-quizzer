import React from 'react'
import { number } from 'prop-types'
import { Link } from 'react-router-dom'

const QuizComplete = ({ questionsLength, quizScore, page }) => {
  console.log(quizScore)
  
  return (
    <div>
      <p>
        Quiz Complete! You got a score of {quizScore / (questionsLength * 10) * 100}%!
      </p>

      <Link to='/'>
        Back to Quizzer Homepage
      </Link>
    </div>
  )
}

QuizComplete.propTypes = {
  page: number.isRequired,
  quizScore: number.isRequired
}
 
export default QuizComplete
