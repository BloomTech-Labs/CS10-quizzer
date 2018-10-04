import React from 'react'
import { number } from 'prop-types'
import { Link } from 'react-router-dom'

const QuizComplete = ({ quizScore, page }) => {
  return (
    <div>
      <p>
        Quiz Complete! You got a score of {quizScore} out of {(page + 1) * 10}
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
