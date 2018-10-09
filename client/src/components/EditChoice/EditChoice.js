import React from 'react'
import { Button } from 'reactstrap'
import './EditChoice.css'

const EditChoice = (props) => {
    const { choices, choiceChecked, choiceTextChange, id, index } = props
    return (
      <div>
        <input 
          checked={choices.length >= id + 1 ? choices[id].isCorrect : null} 
          id={id} 
          disabled={choices.length >= id + 1 ? false : true} 
          name={index}
          onChange={event => choiceChecked(event)}
          required 
          type='radio' 
        />
        <input 
          id={id}
          className='question_choices' 
          disabled={choices.length >= id + 1 ? false : true} 
          name={index} 
          onChange={event => choiceTextChange(event)}
          placeholder={`Choice ${id + 1}`} 
          type='text' 
          value={choices.length >= id + 1 ? choices[id].ChoiceText : ''} 
        />
        {id > 1
          ? choices.length >= id + 1
            ? <Button id={id} className='enable_disable_choice' name={index}>Disable Choice</Button>
            : <Button id={id} color='info' className='enable_disable_choice' name={index}>Enable Choice</Button>
        : null} 
      </div>
    )
}

export default EditChoice
