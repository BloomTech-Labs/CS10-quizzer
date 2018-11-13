import { Button, Input } from 'reactstrap'
import styled from 'styled-components'

export const ChoiceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

export const ChoiceRadio = styled(Input)`
  margin: 12px 0 0 0 !important;

  &:after {
    margin: 0 !important;
  }
`

export const ChoiceText = styled(Input)`
  margin: 0 0 20px 5%;
`

export const EnableOrDisable = styled(Button)`
  font-family: monospace;
  font-size: 15px !important;
  font-weight: bold !important;
  margin: 0 0 20px 5%;
`
