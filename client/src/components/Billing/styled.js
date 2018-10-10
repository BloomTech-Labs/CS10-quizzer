import { Row, Col } from 'reactstrap'
import styled from 'styled-components'

export const BillingContainerStyled = styled(Row)`
  width: 100%;

  @media (min-width: 818px) {
    flex: 1;
    width: auto;
  }
`

export const ColStyled = styled(Col)`
  @media (min-width: 818px) {
    max-width: 473px !important;
}
`
