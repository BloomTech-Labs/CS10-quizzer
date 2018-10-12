import React from 'react'
import { func, number, string } from 'prop-types'
import { Col, Row, Input, Label } from 'reactstrap'

import { InputStyled, LabelStyled } from './styles'

import styled from 'styled-components'

const InputWrapperStyled = styled(Col)`
  @media (min-width: 576px) {
    margin-left: 0;
  }
`

const LabelWrapperStyled = styled(InputWrapperStyled)`
  margin-bottom: 1rem;
`

const Radio = props => {
  const { name, onClick, price, type, value, labelValue } = props

  return (
    <Col>
      <InputStyled
        data-price={price}
        name={name}
        onClick={onClick}
        type={type}
        value={value}
      />

      <LabelStyled
        htmlFor={value}
      >
        {labelValue}
      </LabelStyled>
    </Col>
  )
}

Radio.propTypes = {
  labelValue: string.isRequired,
  name: string.isRequired,
  onClick: func.isRequired,
  price: number.isRequired,
  type: string.isRequired,
  value: string.isRequired
}

export default Radio
