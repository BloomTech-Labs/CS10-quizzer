import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  ChoiceContainer,
  ChoiceRadio,
  ChoiceText,
  EnableOrDisable
} from './styled'

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
    const {
      choices,
      id,
      index
    } = this.state
    const {
      choiceChecked,
      choiceTextChange
    } = this.props

    return (
      <ChoiceContainer>
        <ChoiceRadio
          checked={choices.length >= id + 1 ? choices[id].isCorrect : null}
          id={id}
          disabled={choices.length >= id + 1 ? null : true}
          name={index}
          onChange={event => choiceChecked(event)}
          required
          type='radio'
        />
        <ChoiceText
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
            ? <EnableOrDisable
              id={id}
              name={index}
            >
            Disable Choice
            </EnableOrDisable>
            : <EnableOrDisable
              id={id}
              color='info'
              name={index}
            >
            Enable Choice
            </EnableOrDisable>
          : null}
      </ChoiceContainer>
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
