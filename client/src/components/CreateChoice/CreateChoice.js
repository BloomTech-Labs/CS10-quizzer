import React from 'react'
import PropTypes from 'prop-types'

import {
  AnswerWrapperStyled,
  AnswerInputWrapperStyled,
  ChoiceRadioStyled,
  ChoiceTextStyled,
  EnableDisableChoiceBtnStyled
} from './styled'

const CreateChoice = (props) => {
  const {
    checked,
    choices,
    choiceCheck,
    choiceChange,
    index,
    id,
    value
  } = props

  const enableExtraChoices = () => {
    const { id, choices, index, enableOrDisable } = props

    if (id > 1) {
      if (choices[ index ][ id ][2]) {
        return (
          <EnableDisableChoiceBtnStyled
            id={id}
            className='enable_disable_choice'
            name={index} onClick={enableOrDisable}
          >
            Enable Choice
          </EnableDisableChoiceBtnStyled>
        )
      } else {
        return (
          <EnableDisableChoiceBtnStyled
            id={id}
            color='info'
            className='enable_disable_choice'
            name={index}
            onClick={enableOrDisable}
          >
            Disable Choice
          </EnableDisableChoiceBtnStyled>
        )
      }
    } else {
      return null
    }
  }

  return (
    <AnswerWrapperStyled>
      <AnswerInputWrapperStyled
        className='question_fieldset__answer_wrapper__input_wrapper'
      >
        <ChoiceRadioStyled
          checked={checked}
          disabled={choices[index][id][2]}
          name={index}
          id={id}
          onChange={event => choiceCheck(event)}
          required
          type='radio'
        />

        <ChoiceTextStyled
          className='question_choices'
          disabled={choices[index][id][2]}
          id={id}
          name={index}
          placeholder={`Choice ${id + 1}`}
          onChange={event => choiceChange(event)}
          required
          type='text'
          value={value}
        />
      </AnswerInputWrapperStyled>

      {enableExtraChoices()}
    </AnswerWrapperStyled>
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
