import { Button, Input } from 'reactstrap'
import styled from 'styled-components'

export const EditQuizContainer = styled.div`
  flex: 1
  margin: 0 auto;
  width: 100%;
  max-width: 600px;

  @media (min-width: 818px) {
    margin: 0 0 0 3rem;
  }
`

export const Header = styled.h4`
  color: #003366;
  font-family: monospace;
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 1rem 0;
`

export const CheckList = styled.ul`
  list-style: none;
  margin: 0 0 3rem 0;
  padding: 0;
`

export const CheckListItem = styled.li`
  &:before {
    content: "✔";
    margin: 0 0.5rem 0 0;
  }
`

export const EditQuizForm = styled.form`
  display: flex;
  flex-direction: column;
`

export const EditQuizName = styled(Input)`
  border: 2px solid #003366 !important;
  font-family: monospace;
  font-size: 20px !important;
  margin-bottom: 0.5rem;
  padding: 20px 10px !important;
`

export const EditQuizBtns = styled(Button)`
  font-family: monospace;
  font-size: 20px !important;
  font-weight: bold !important;
  margin: 0 0 1rem 0;
`