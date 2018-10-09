import React from 'react'
import { Button } from 'reactstrap'
import './EditChoice.css'

const EditChoice = (props) => {
    const { choice, choices } = props
    return (
      <div>
        <input checked={choices.length >= choice + 1 ? choices[choice].isCorrect : null} disabled={choices.length >= choice + 1 ? false : true} id={choices.length >= choice + 1 ? choices[choice].ChoiceID : null} readOnly required type='radio' />
        <input className='question_choices' disabled={choices.length >= choice + 1 ? false : true} id={choices.length >= choice + 1 ? choices[choice].ChoiceID : null} placeholder={`Choice ${choice + 1}`} readOnly required type='text' value={choices.length >= choice + 1 ? choices[choice].ChoiceText : ''} />
        {choice > 1
          ? choices.length >= choice + 1
            ? <Button choice={choice} className='enable_disable_choice'>Disable Choice</Button>
            : <Button choice={choice} color='info' className='enable_disable_choice'>Enable Choice</Button>
        : null} 
      </div>
    )
}

export default EditChoice
