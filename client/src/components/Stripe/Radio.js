import React from 'react'
import { func, number, string } from 'prop-types'
import { Col, Row } from 'reactstrap'

const Radio = props => {
  const { name, onClick, price, type, value, labelValue } = props

  return (
    <Row>
      <Col>
        <input
          data-price={price}
          name={name}
          onClick={onClick}
          type={type}
          value={value}
        />
        <label
          className='lead'
          htmlFor={value}
        >
          {labelValue}
        </label>
      </Col>
    </Row>
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
