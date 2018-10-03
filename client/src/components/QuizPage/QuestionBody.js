import React from 'react'

const QuestionBody = ({ choiceSet, page, setIsAnswerCorrect }) => {
  return (
    <ul>
      {choiceSet.map(({ChoiceID, ChoiceText, isCorrect }) => (
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

export default QuestionBody
