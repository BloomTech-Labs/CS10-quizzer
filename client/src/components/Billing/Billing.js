import React, { Component } from 'react'
import axios from 'axios'
import { Form } from 'reactstrap'

import Stripe from '../Stripe/Stripe'

import { BillingContainerStyled, ColStyled } from './styled'

class Billing extends Component {
  unsubscribe = async () => {
    const apiURI = process.env.NODE_ENV !== 'production' ? 'http://localhost:8000/' : 'https://quizzercs10.herokuapp.com/'
    const token = localStorage.getItem('token')
    const req = {
      method: 'POST',
      url: `${apiURI}api/payments/unsubscribe`,
      data: token
    }

    try {
      await axios(req)
    } catch (err) {
      console.log(err)
    }
  }

  render () {
    return (
      <BillingContainerStyled className='billing_container'>
        <ColStyled
          className='col-12 col-sm-8 col-sm-offset-2 billing_container__form_wrapper'
        >
          <h1
            className='mb-5'
            style={{
              fontSize: '1.5rem',
              textAlign: 'center'
            }}
          >
            Add Billing Statement
          </h1>

          {/**
            * this is a component brought in by react-stripe-checkout
            * this component takes a lot of possible attributes but this is all that
            * is needed for now. If we need more options make sure to check the docs
            * at https://github.com/azmenak/react-stripe-checkout
            *
            * TODO: dynamically set the currency attribute depending on the users
            *       location
            */}
          <Form onSubmit={e => e.preventDefault()}>
            <Stripe />
          </Form>
        </ColStyled>
      </BillingContainerStyled>
    )
  }
}

export default Billing
