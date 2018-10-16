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
      choiceTextChange,
      enableOrDisable
    } = this.props

    return (
      <ChoiceContainer>
        <ChoiceRadio
          checked={choices[id] ? choices[id].isCorrect : null}
          id={id}
          disabled={choices[id] ? choices[id].status : true}
          name={index}
          onChange={event => choiceChecked(event)}
          required
          type='radio'
        />
        <ChoiceText
          disabled={choices[id] ? choices[id].status : true}
          id={id}
          name={index}
          onChange={event => choiceTextChange(event)}
          placeholder={`Choice ${id + 1}`}
          required
          type='text'
          value={choices[id] ? choices[id].ChoiceText : ''}
        />
        {id > 1
          ? choices[id] && !choices[id].status
            ? <EnableOrDisable
              onClick={event => enableOrDisable(event)}
              id={id}
              name={index}
            >Disable Choice
            </EnableOrDisable>
            : <EnableOrDisable
              onClick={event => enableOrDisable(event)}
              id={id}
              color='info'
              name={index}
            >Enable Choice
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
  enableOrDisable: PropTypes.func,
  id: PropTypes.number,
  index: PropTypes.number
}

export default EditChoice
