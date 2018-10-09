import React from 'react'
import { Button } from 'reactstrap'
import './CreateChoice.css'

const CreateChoice = (props) => {
    const { checked, choices, choiceCheck, choiceChange, enableOrDisable, index, id, value } = props
    return (
      <div>
        <input checked={checked} disabled={choices[index][id][2]} name={index} id={id} onChange={event => choiceCheck(event)} required type='radio' />
        <input className='question_choices' disabled={choices[index][id][2]} id={id} name={index} placeholder={`Choice ${id + 1}`} onChange={event => choiceChange(event)} required type='text' value={value} />
        {id > 1
          ? choices[index][id][2] 
          ? <Button id={id} className='enable_disable_choice' name={index} onClick={enableOrDisable}>Enable Choice</Button>
          : <Button id={id} color='info' className='enable_disable_choice' name={index} onClick={enableOrDisable}>Disable Choice</Button>
        : null} 
      </div>
    )
  }

export default CreateChoice
