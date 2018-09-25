import React, { Component } from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

class Stripe extends Component {
  getStripeToken = token => {
    const apiURI = process.env.NODE_ENV !== 'production' ? 'http://localhost:8000/api/payments/' : '/api/payments/'

    const request = {
      method: 'POST',
      url: apiURI,
      data: token
    }

    // TODO: figure out what to do when this request returns
    axios(request)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  render () {
    return (
      /**
       * this is a component brought in by react-stripe-checkout
       * this component takes a lot of possible attributes but this is all that
       * is needed for now. If we need more options make sure to check the docs
       * at https://github.com/azmenak/react-stripe-checkout
       *
       * TODO: dynamically set the currency attribute depending on the users
       *       location
       */
      <StripeCheckout
        amount={500}
        currency='USD'
        name='Quizzer'
        token={this.getStripeToken}
        stripeKey='pk_test_6pRNASCoBOKtIshFeQd4XMUh'
      />
    )
  }
}

export default Stripe
