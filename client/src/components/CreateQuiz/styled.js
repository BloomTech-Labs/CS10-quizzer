import { Button, Input } from 'reactstrap'
import styled from 'styled-components'

export const CreateQuizContainer = styled.div`
  flex: 1
  margin: 0 auto;
  width: 100%;
  max-width: 600px;

  @media (min-width: 880px) {
    margin: 0 0 0 5%;
  }
`

export const Header = styled.h4`
  color: #003366;
  font-family: monospace;
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 10px 0;
`

export const CheckList = styled.ul`
  font-weight: bold;
  list-style: none;
  margin: 0 0 20px 0;
  padding: 0;
`

export const CheckListItem = styled.li`
  &:before {
    content: "*";
    margin: 0 1% 0 0;
  }
`

export const CreateQuizForm = styled.form`
  display: flex;
  flex-direction: column;
`

export const CreateQuizName = styled(Input)`
  border: 2px solid #003366 !important;
  color: #000 !important;
  font-size: 20px !important;
  margin: 0 0 20px 0;
  padding: 10px !important;
`

export const CreateQuizBtns = styled(Button)`
  font-family: monospace;
  font-size: 20px !important;
  font-weight: bold !important;
  margin: 0 0 20px 0;
`
