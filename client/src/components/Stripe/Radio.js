import React from 'react'
import { func, number, string } from 'prop-types'
import { Col, Row, Input, Label } from 'reactstrap'

import { InputStyled, LabelStyled } from './styles'

const Radio = props => {
  const { name, onClick, price, type, value, labelValue } = props

  return (
    <React.Fragment>
      <Col>
        <InputStyled
          data-price={price}
          name={name}
          onClick={onClick}
          type={type}
          value={value}
        />
      </Col>

      <Col className='mb-3'>
        <LabelStyled
          htmlFor={value}
        >
          {labelValue}
        </LabelStyled>
      </Col>
    </React.Fragment>
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
