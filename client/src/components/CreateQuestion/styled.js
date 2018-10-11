import { Button } from 'reactstrap'
import styled from 'styled-components'

export const QuestionFieldSetStyled = styled.fieldset`
  margin-left: 20px;
`

export const QuizFormQuestionTextStyled = styled.textarea`
  border: 2px solid #003366;
  font-family: monospace;
  font-size: 20px;
  margin-bottom: 1rem;
  padding: 10px;
  width: 100%;
`

export const DeleteQuestionBtnStyled = styled(Button)`
  font-family: monospace;
  font-size: 20px !important;
  font-weight: bold !important;
  margin: 0 0 5rem 0;
  width: 100%;
`
