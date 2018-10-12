import React, { Component } from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

import Radio from './Radio'
import { Button, FormGroup } from 'reactstrap'

import { ButtonStyled } from './styles'

class Stripe extends Component {
  state = {
    subscriptionType: '',
    subscriptionAmount: null
  }

  // setSubscriptionType
  setSubscriptionType = e => {
    const { value: subscriptionType } = e.target
    const subscriptionAmount = Number(e.target.attributes['data-price'].value)

    this.setState({
      subscriptionType,
      subscriptionAmount
    })
  }

  // getStripeToken
  getStripeToken = token => {
    const { subscriptionType } = this.state

    let apiURI = process.env.NODE_ENV !== 'production' ? 'http://localhost:8000/api/payments/' : '/api/payments/'
    apiURI += subscriptionType === 'premium_subscription' ? 'premium' : 'basic'

    const request = {
      method: 'POST',
      url: apiURI,
      data: { token, jwt: localStorage.getItem('token') }
    }

    // TODO: figure out what to do when this request returns
    axios(request)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  // render
  render () {
    return (
      <FormGroup>
        <Radio
          price={999}
          labelValue='1 Year Subscription - $9.99'
          name='subscription'
          onClick={this.setSubscriptionType}
          value='base_subscription'
          type='radio'
        />

        <Radio
          price={2999}
          labelValue='1 Year Premium Subscription - $29.99'
          name='subscription'
          onClick={this.setSubscriptionType}
          value='premium_subscription'
          type='radio'
        />
        {/**
        * this is a component brought in by react-stripe-checkout
        * this component takes a lot of possible attributes but this is all that
        * is needed for now. If we need more options make sure to check the docs
        * at https://github.com/azmenak/react-stripe-checkout
        *
        * TODO: dynamically set the currency attribute depending on the users
        *       location
        */}

        <FormGroup
          className='d-flex flex-wrap flex-column flex-sm-row justify-content-center justify-content-sm-between'
        >
          <StripeCheckout
            amount={this.state.subscriptionAmount}
            currency='USD'
            name='Quizzer'
            token={this.getStripeToken}
            stripeKey='pk_test_sm2QijqfOE0vqBK0c7W0CYGV'
          >
            <Button
              className='btn-info mx-auto mb-4 mb-sm-0 d-block w-100'
              style={{ border: '2px solid #008495' }}
            >
              Pay With Card
            </Button>
          </StripeCheckout>

          <ButtonStyled
            className='btn-light'
            onClick={this.unsubscribe}
          >
            Cancel Subscription
          </ButtonStyled>
        </FormGroup>
      </FormGroup>
    )
  }
}

export default Stripe
