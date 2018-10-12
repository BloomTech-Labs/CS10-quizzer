import { Button, Input } from 'reactstrap'
import styled from 'styled-components'

export const AnswerWrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const AnswerInputWrapperStyled = styled.div`
  width: 100%;
`

export const ChoiceRadioStyled = styled(Input)`
  margin-top: 12px !important;
  width: auto;

  &:after {
    margin: 0 !important;
  }
`

export const ChoiceTextStyled = styled(Input)`
  margin-left: 0;
`

export const EnableDisableChoiceBtnStyled = styled(Button)`
  font-family: monospace;
  font-size: 15px !important;
  font-weight: bold !important;
  margin-bottom: 1rem;
`
