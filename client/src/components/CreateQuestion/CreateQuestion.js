import React from 'react'

import CreateChoice from '../CreateChoice/CreateChoice'

import {
  Question,
  DeleteQuestion
} from './styled'

const CreateQuestions = (props) => {
  const {
    questions,
    choices
  } = props.state
  const {
    choiceCheck,
    choiceChange,
    deleteQuestion,
    enableOrDisable,
    questionChange
  } = props

  return (
    questions.map((question, index) => {
      return (
        <div key={index}>
          <Question
            cols='50'
            name={index}
            placeholder={`Question ${index + 1}`}
            onChange={event => questionChange(event)}
            rows='5'
            required
            value={question}
          />
          <fieldset>
            <CreateChoice
              checked={choices[index][0][1]}
              choices={choices}
              choiceChange={choiceChange}
              choiceCheck={choiceCheck}
              disabled={choices[index][0][2]}
              id={0}
              index={index}
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
          </fieldset>

          <DeleteQuestion
            color='danger'
            name={index}
            onClick={deleteQuestion}
          >Delete Question
          </DeleteQuestion>
        </div>
      )
    })
  )
}

export default CreateQuestions
