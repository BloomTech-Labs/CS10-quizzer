import React from 'react'
import { string, number } from 'prop-types'

const QuizList = props => {
  const { QuizName, amountOfClasses } = props

  return (
    <React.Fragment>
      <p>{QuizName}</p>
      <p>Classes Assigned: {amountOfClasses}</p>

      <button
        onClick={() => console.log(`EDIT ${QuizName}`)}
      >
        Edit
      </button>
    </React.Fragment>
  )
}

QuizList.propTypes = {
  QuizName: string,
  amountOfClasses: number
}

export default QuizList
