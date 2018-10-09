import React from 'react'
import EditChoice from '../EditChoice/EditChoice'
import { Button } from 'reactstrap'
import './EditQuestion.css'

const EditQuestion = (props) => {
    const { questionSet } = props
    return (
      questionSet.map((question, index) => {
        return (
          <div key={index}>
            <textarea id={question.QuestionID} cols='50' name={index} placeholder={`Question ${index + 1}`} readOnly required rows='5' value={question.Question} />
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
