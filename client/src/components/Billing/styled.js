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
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 576px) {
    max-width: 400px !important;
  }

  @media (min-width: 818px) {
    margin-left: 3rem !important;
  }
`
