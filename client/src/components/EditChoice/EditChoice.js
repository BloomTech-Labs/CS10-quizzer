import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import './EditChoice.css'

class EditChoice extends Component {
  constructor (props) {
    super(props)
    this.state = {
      choices: props.choices,
      id: props.id,
      index: props.index
    }
  }

  render () {
    const { choices, id, index } = this.state
    const { choiceChecked, choiceTextChange } = this.props

    return (
      <div>
        <input
          checked={choices.length >= id + 1 ? choices[id].isCorrect : null}
          id={id}
          disabled={choices.length >= id + 1 ? null : true}
          name={index}
          onChange={event => choiceChecked(event)}
          required
          type='radio'
        />
        <input
          className='question_choices'
          disabled={choices.length >= id + 1 ? null : true}
          id={id}
          name={index}
          onChange={event => choiceTextChange(event)}
          placeholder={`Choice ${id + 1}`}
          type='text'
          value={choices.length >= id + 1 ? choices[id].ChoiceText : ''}
        />
        {id > 1
          ? choices.length >= id + 1
            ? <Button
              id={id}
              className='enable_disable_choice'
              name={index}
            >
            Disable Choice
            </Button>
            : <Button
              id={id}
              color='info'
              className='enable_disable_choice'
              name={index}
            >
            Enable Choice
            </Button>
          : null}
      </div>
    )
  }
}

EditChoice.propTypes = {
  choices: PropTypes.array,
  choiceChecked: PropTypes.func,
  choiceTextChange: PropTypes.func,
  id: PropTypes.number,
  index: PropTypes.number
}

export default EditChoice
