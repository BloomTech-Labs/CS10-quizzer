import React from 'react'

import EditChoice from '../EditChoice/EditChoice'

import {
  Question,
  ChoiceSet,
  DeleteQuestion
} from './styled'

const EditQuestion = (props) => {
  const {
    questionSet,
    questionTextChange,
    choiceChecked,
    choiceTextChange,
    deleteQuestion
  } = props

  return (
    questionSet.map((question, index) => {
      return (
        <div key={index}>
          <Question
            cols='50'
            name={index}
            onChange={event => questionTextChange(event)}
            placeholder={`Question ${index + 1}`}
            required rows='5'
            value={question.QuestionText}
          />
          <ChoiceSet>
            <EditChoice
              choices={question.choiceSet}
              choiceChecked={choiceChecked}
              choiceTextChange={choiceTextChange}
              id={0}
              index={index}
            />
            <EditChoice
              choices={question.choiceSet}
              choiceChecked={choiceChecked}
              choiceTextChange={choiceTextChange}
              id={1}
              index={index}
            />
            <EditChoice
              choices={question.choiceSet}
              choiceChecked={choiceChecked}
              choiceTextChange={choiceTextChange}
              id={2}
              index={index}
            />
            <EditChoice
              choices={question.choiceSet}
              choiceChecked={choiceChecked}
              choiceTextChange={choiceTextChange}
              id={3}
              index={index}
            />
          </ChoiceSet>
          <DeleteQuestion
            color='danger'
            name={index}
            onClick={event => deleteQuestion(event)}
            type='button'
          >
          Delete Question
          </DeleteQuestion>
        </div>
      )
    })
  )
}

export default EditQuestion
