import { Button } from 'reactstrap'
import styled from 'styled-components'

export const Question = styled.textarea`
  border: 2px solid #003366;
  font-family: monospace;
  font-size: 20px;
  margin: 0 0 20px 0;
  padding: 10px;
  resize: none;
  width: 100%;
`

export const DeleteQuestion = styled(Button)`
  font-family: monospace;
  font-size: 20px !important;
  font-weight: bold !important;
  margin: 0 0 50px 0;
  width: 100%;
`
