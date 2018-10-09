import React from 'react'
import EditChoice from '../EditChoice/EditChoice'
import { Button } from 'reactstrap'
import './EditQuestion.css'

const EditQuestion = (props) => {
    const { questionSet, questionTextChange, choiceChecked, choiceTextChange } = props
    return (
      questionSet.map((question, index) => {
        return (
          <div key={index}>
            <textarea 
              cols='50' 
              name={index} 
              onChange={event => questionTextChange(event)} 
              placeholder={`Question ${index + 1}`} 
              required rows='5' 
              value={question.Question} 
            />
            <fieldset className='question_fieldset'>
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
            </fieldset>
            <Button color='danger' className='delete_question' id={question.QuestionID} type='button'>Delete Question</Button>
            </div>
        )
      })
    )
}

export default EditQuestion
