import React from 'react'
import EditChoice from '../EditChoice/EditChoice'
import { Button } from 'reactstrap'
import './EditQuestion.css'

const EditQuestion = (props) => {
    const { questionSet, questionTextChange } = props
    return (
      questionSet.map((question, index) => {
        return (
          <div key={index}>
            <textarea cols='50' name={index} onChange={event => questionTextChange(event)} placeholder={`Question ${index + 1}`} required rows='5' value={question.Question} />
            <fieldset className='question_fieldset'>
              <EditChoice choice={0} choices={question.choiceSet} />
              <EditChoice choice={1} choices={question.choiceSet} /> 
              <EditChoice choice={2} choices={question.choiceSet} /> 
              <EditChoice choice={3} choices={question.choiceSet} />
            </fieldset>
            <Button color='danger' className='delete_question' id={question.QuestionID} type='button'>Delete Question</Button>
            </div>
        )
      })
    )
}

export default EditQuestion
