import React from 'react'
import { array, number, func } from 'prop-types'

const QuestionBody = ({ choiceSet, page, setIsAnswerCorrect }) => {
  return (
    <ul>
      {choiceSet.map(({ ChoiceID, ChoiceText, isCorrect }) => (
        <li key={ChoiceID}>
          <input
            data-correct-answer={isCorrect}
            name={page}
            onClick={setIsAnswerCorrect}
            type='radio'
          />

          <label htmlFor={page}>
            { ChoiceText }
          </label>
        </li>
      ))}
    </ul>
  )
}

QuestionBody.propTypes = {
  choiceSet: array.isRequired,
  page: number.isRequired,
  setIsAnswerCorrect: func.isRequired
}

export default QuestionBody
