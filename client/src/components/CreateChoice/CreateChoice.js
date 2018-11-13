import React from 'react'
import PropTypes from 'prop-types'
import {
  ChoiceContainer,
  ChoiceRadio,
  ChoiceText,
  EnableOrDisable
} from './styled'

const CreateChoice = (props) => {
  const {
    checked,
    choices,
    choiceCheck,
    choiceChange,
    enableOrDisable,
    index,
    id,
    value
  } = props

  return (
    <ChoiceContainer>
      <ChoiceRadio
        checked={checked}
        disabled={choices[index][id][2]}
        name={index}
        id={id}
        onChange={event => choiceCheck(event)}
        required
        type='radio'
      />

      <ChoiceText
        disabled={choices[index][id][2]}
        id={id}
        name={index}
        placeholder={`Choice ${id + 1}`}
        onChange={event => choiceChange(event)}
        required
        type='text'
        value={value}
      />

      {id > 1
        ? choices[index][id][2]
          ? <EnableOrDisable
            id={id}
            name={index}
            onClick={enableOrDisable}
          >Enable Choice
          </EnableOrDisable>
          : <EnableOrDisable
            id={id}
            color='info'
            name={index}
            onClick={enableOrDisable}
          >Disable Choice
          </EnableOrDisable>
        : null
      }
    </ChoiceContainer>
  )
}

CreateChoice.propTypes = {
  checked: PropTypes.bool,
  choices: PropTypes.array,
  choiceCheck: PropTypes.func,
  choiceChange: PropTypes.func,
  enableOrDisable: PropTypes.func,
  index: PropTypes.number,
  id: PropTypes.number,
  value: PropTypes.string
}

export default CreateChoice
