import { Button } from 'reactstrap'
import styled from 'styled-components'

export const Question = styled.textarea`
  border: 2px solid #003366;
  font-family: monospace;
  font-size: 20px;
  margin: 0 0 1rem 0;
  padding: 10px;
  width: 100%;
`

export const ChoiceSet = styled.fieldset`
  margin: 0 0 0 20px;
`

export const DeleteQuestion = styled(Button)`
  font-family: monospace;
  font-size: 20px !important;
  font-weight: bold !important;
  margin: 0 0 5rem 0;
  width: 100%;
`
