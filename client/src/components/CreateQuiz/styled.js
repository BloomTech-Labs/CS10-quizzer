import { Button, Input } from 'reactstrap'
import styled from 'styled-components'

export const ContainerStyled = styled.div`
  flex: 1
  margin: 0 auto;
  width: 100%;
  max-width: 600px;

  @media (min-width: 818px) {
    margin: 0 0 0 3rem;
  }
`

export const HeaderStyled = styled.h4`
  color: #003366;
  font-family: monospace;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 1rem;
`

export const ChecklistStyled = styled.ul`
  list-style: none;
  margin-bottom: 3rem;
  padding: 0;
`

export const CheclistItemStyled = styled.li`
  &:before {
    content: "✔";
    margin-right: 0.5rem;
  }
`

export const InputStyled = styled(Input)`
  border: 2px solid #003366 !important;
  font-family: monospace;
  font-size: 20px !important;
  margin-bottom: 0.5rem;
  padding: 20px 10px !important;
`

export const AddQuizBtn = styled(Button)`
  font-family: monospace;
  font-size: 20px !important;
  font-weight: bold !important;
  margin-bottom: 1rem;
`
