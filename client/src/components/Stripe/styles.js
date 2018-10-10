import { Button, Input, Label } from 'reactstrap'
import styled from 'styled-components'

export const ButtonStyled = styled(Button)`
  border: 2px solid #010101 !important;
`

export const InputStyled = styled(Input)`
  @media (min-width: 578px) {
    margin-left: -6px !important;
  }

  @media (min-width: 818px) {
    margin-left: 20px !important
  }
`

export const LabelStyled = styled(Label)`
  @media (min-width: 578px) {
    margin-left: 14px;
  }

  @media (min-width: 818px) {
    margin-left: 44px !important
  }
`
