import React from 'react'
import { func, object, number } from 'prop-types'

import QuestionBody from './QuestionBody'
import QuestionTitle from './QuestionTitle'

const Questions = ({ page, quiz, setIsAnswerCorrect }) => {
  const { choiceSet, Question } = quiz.questionSet[ page ]

  return (
    <div>
      <QuestionTitle
        title={Question}
      />

      <QuestionBody
        choiceSet={choiceSet}
        page={page}
        setIsAnswerCorrect={setIsAnswerCorrect}
      />
    </div>
  )
}

Questions.propTypes = {
  page: number,
  quiz: object,
  setIsAnswerCorrect: func
}

export default Questions
