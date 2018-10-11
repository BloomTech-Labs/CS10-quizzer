import React from 'react'

import CreateChoice from '../CreateChoice/CreateChoice'

import './CreateQuestion.css'
import {
  QuestionFieldSetStyled,
  QuizFormQuestionTextStyled,
  DeleteQuestionBtnStyled
} from './styled'

const CreateQuestions = (props) => {
  const { questions, choices } = props.state
  const { choiceCheck, choiceChange, deleteQuestion, enableOrDisable, questionChange } = props

  return (
    questions.map((question, index) => {
      return (
        <div key={index}>
          <QuizFormQuestionTextStyled
            cols='50'
            name={index}
            placeholder={`Question ${index + 1}`}
            onChange={event => questionChange(event)}
            rows='5'
            required
            value={question}
          />

          <QuestionFieldSetStyled className='question_fieldset'>
            <CreateChoice
              checked={choices[index][0][1]}
              choices={choices}
              choiceChange={choiceChange}
              choiceCheck={choiceCheck}
              disabled={choices[index][0][2]}
              id={0} index={index}
              value={choices[index][0][0]}
            />

            <CreateChoice
              checked={choices[index][1][1]}
              choices={choices}
              choiceChange={choiceChange}
              choiceCheck={choiceCheck}
              disabled={choices[index][1][2]}
              id={1}
              index={index}
              value={choices[index][1][0]}
            />

            <CreateChoice
              checked={choices[index][2][1]}
              choices={choices}
              choiceChange={choiceChange}
              choiceCheck={choiceCheck}
              disabled={choices[index][2][2]}
              id={2}
              index={index}
              value={choices[index][2][0]}
              enableOrDisable={enableOrDisable}
            />

            <CreateChoice
              checked={choices[index][3][1]}
              choices={choices}
              choiceChange={choiceChange}
              choiceCheck={choiceCheck}
              disabled={choices[index][3][2]}
              id={3}
              index={index}
              value={choices[index][3][0]}
              enableOrDisable={enableOrDisable}
            />
          </QuestionFieldSetStyled>

          <DeleteQuestionBtnStyled
            color='danger'
            className='delete_question'
            name={index}
            onClick={deleteQuestion}
            type='button'
          >
            Delete Question
          </DeleteQuestionBtnStyled>
        </div>
      )
    })
  )
}

export default CreateQuestions
